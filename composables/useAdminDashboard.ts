import { ref } from 'vue'
import { useNuxtApp } from '#app'
import type { PostgrestError, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js'
import type { UserToVerify, Booking, Vehicle } from '~/types'

export function useAdminDashboard() {
  const supabase = useNuxtApp().$supabase as SupabaseClient
  let realtimeChannel: RealtimeChannel | undefined

  type Stat = {
    count: number
  }

  const stats = ref<{
    users: Stat | null
    vehicles: Stat | null
    bookings: Stat | null
    usersToVerify: Stat | null
  }>({
    users: null,
    vehicles: null,
    bookings: null,
    usersToVerify: null
  })

  // États généraux
  const loading = ref(false)
  const error = ref<PostgrestError | null>(null)

  // États pour les utilisateurs à vérifier
  const loadingVerify = ref(false)

  // États pour les réservations récentes
  const loadingBookings = ref(false)
  const recentBookings = ref<Booking[]>([])
  const bookingsPage = ref(0)
  const bookingsPageSize = 10 // Nombre de réservations à charger à la fois
  const allBookingsLoaded = ref(false)

  // États pour les véhicules récents
  const loadingVehicles = ref(false)
  const recentVehicles = ref<Vehicle[]>([])
  const vehiclesPage = ref(0)
  const vehiclesPageSize = 10 // Nombre de véhicules à charger à la fois
  const allVehiclesLoaded = ref(false)

  const fetchCount = async (tableName: string): Promise<number> => {
    const { count, error: fetchError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })

    if (fetchError) {
      console.error(`Error fetching count for ${tableName}:`, fetchError)
      throw fetchError
    }
    return count ?? 0
  }

  const getStats = async () => {
    loading.value = true
    error.value = null
    try {
      const [usersCount, vehiclesCount, bookingsCount, usersToVerifyCount] = await Promise.all([
        fetchCount('profiles'),
        fetchCount('vehicles'),
        fetchCount('bookings'),
        getTotalUsersToVerify()
      ])

      stats.value = {
        users: { count: usersCount },
        vehicles: { count: vehiclesCount },
        bookings: { count: bookingsCount },
        usersToVerify: { count: usersToVerifyCount }
      }
    } catch (e) {
      error.value = e as PostgrestError
      stats.value = { users: null, vehicles: null, bookings: null, usersToVerify: null }
    } finally {
      loading.value = false
    }
  }

  const getTotalUsersToVerify = async (): Promise<number> => {
    try {
      const { data, error: rpcError } = await supabase.rpc('get_total_users_to_verify')
      if (rpcError) throw rpcError
      return data || 0
    } catch (e) {
      console.error('Erreur lors du comptage des utilisateurs à vérifier:', e)
      return 0
    }
  }

  const fetchUsersToVerify = async (
    page: number,
    pageSize: number
  ): Promise<{ data: UserToVerify[]; count: number }> => {
    loadingVerify.value = true
    error.value = null
    try {
      const { data, error: rpcError } = await supabase.rpc('get_users_to_verify', {
        page_number: page,
        page_size: pageSize
      })
      if (rpcError) throw rpcError
      const totalCount = await getTotalUsersToVerify()
      return { data: data || [], count: totalCount }
    } catch (e) {
      error.value = e as PostgrestError
      return { data: [], count: 0 }
    } finally {
      loadingVerify.value = false
    }
  }

  // --- NOUVELLE LOGIQUE POUR LES RÉSERVATIONS ---

  const fetchRecentBookings = async () => {
    if (loadingBookings.value || allBookingsLoaded.value) return

    loadingBookings.value = true
    error.value = null

    try {
      const from = bookingsPage.value * bookingsPageSize
      const to = from + bookingsPageSize - 1

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(
          `
          *,
          vehicle:vehicles!inner(
            id,
            make,
            model,
            year,
            price_per_day,
            vehicle_photos(file_path, is_primary),
            owner:profiles!owner_id(
              id,
              first_name,
              last_name,
              email,
              phone,
              address,
              avatar_url
            )
          ),
          renter:profiles!renter_id(
            id,
            first_name,
            last_name,
            email,
            avatar_url
          )
        `
        )
        .order('created_at', { ascending: false })
        .range(from, to)

      if (fetchError) throw fetchError

      if (data && data.length > 0) {
        recentBookings.value.push(...(data as Booking[]))
        bookingsPage.value++
      }

      if (!data || data.length < bookingsPageSize) {
        allBookingsLoaded.value = true
      }
    } catch (e) {
      error.value = e as PostgrestError
    } finally {
      loadingBookings.value = false
    }
  }

  const listenToBookingChanges = () => {
    if (realtimeChannel) return

    realtimeChannel = supabase
      .channel('public:bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, payload => {
        const updatedBooking = payload.new as Booking
        const index = recentBookings.value.findIndex(b => b.id === updatedBooking.id)

        if (payload.eventType === 'INSERT') {
          // Ajouter en haut de la liste seulement si pas déjà présent
          if (index === -1) {
            recentBookings.value.unshift(updatedBooking)
          }
        } else if (payload.eventType === 'UPDATE') {
          if (index !== -1) {
            recentBookings.value[index] = { ...recentBookings.value[index], ...updatedBooking }
          }
        } else if (payload.eventType === 'DELETE') {
          const oldBooking = payload.old as Booking
          const deleteIndex = recentBookings.value.findIndex(b => b.id === oldBooking.id)
          if (deleteIndex !== -1) {
            recentBookings.value.splice(deleteIndex, 1)
          }
        }
      })
      .subscribe()
  }

  const unsubscribeFromBookingChanges = () => {
    if (realtimeChannel) {
      supabase.removeChannel(realtimeChannel)
      realtimeChannel = undefined
    }
  }

  // --- NOUVELLE LOGIQUE POUR LES VÉHICULES ---
  let vehicleRealtimeChannel: RealtimeChannel | undefined

  const fetchRecentVehicles = async () => {
    if (loadingVehicles.value || allVehiclesLoaded.value) return

    loadingVehicles.value = true
    error.value = null

    try {
      const from = vehiclesPage.value * vehiclesPageSize
      const to = from + vehiclesPageSize - 1

      // On utilise une requête similaire à celle de useVehicles
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select(
          `
          *,
          vehicle_photos(file_path, is_primary),
          owner:profiles!owner_id(id, first_name, last_name, email, avatar_url)
        `
        )
        .order('created_at', { ascending: false })
        .range(from, to)

      if (fetchError) throw fetchError

      if (data && data.length > 0) {
        recentVehicles.value.push(...(data as Vehicle[]))
        vehiclesPage.value++
      }

      if (!data || data.length < vehiclesPageSize) {
        allVehiclesLoaded.value = true
      }
    } catch (e) {
      error.value = e as PostgrestError
    } finally {
      loadingVehicles.value = false
    }
  }

  const listenToVehicleChanges = () => {
    if (vehicleRealtimeChannel) return

    vehicleRealtimeChannel = supabase
      .channel('public:vehicles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, payload => {
        // Pour les véhicules, nous avons besoin des jointures (photos, propriétaire).
        // Le payload seul n'est pas suffisant. On rafraîchit simplement.
        // C'est moins optimisé mais plus simple et fiable.
        recentVehicles.value = []
        vehiclesPage.value = 0
        allVehiclesLoaded.value = false
        fetchRecentVehicles()
        getStats() // Mettre à jour les stats globales
      })
      .subscribe()
  }

  const unsubscribeFromVehicleChanges = () => {
    if (vehicleRealtimeChannel) {
      supabase.removeChannel(vehicleRealtimeChannel)
      vehicleRealtimeChannel = undefined
    }
  }

  return {
    stats,
    loading,
    error,
    getStats,
    // Utilisateurs
    loadingVerify,
    fetchUsersToVerify,
    getTotalUsersToVerify,
    // Réservations
    loadingBookings,
    recentBookings,
    allBookingsLoaded,
    fetchRecentBookings,
    listenToBookingChanges,
    unsubscribeFromBookingChanges,
    // Véhicules
    loadingVehicles,
    recentVehicles,
    allVehiclesLoaded,
    fetchRecentVehicles,
    listenToVehicleChanges,
    unsubscribeFromVehicleChanges
  }
}
