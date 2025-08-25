import dayjs from 'dayjs'
import { ref } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Availability } from '~/types'

export const useAvailabilities = () => {
  const supabase = useNuxtApp().$supabase as SupabaseClient

  // États réactifs
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  // NOUVEAU SYSTÈME: availabilities représente maintenant les INDISPONIBILITÉS
  const availabilities = ref<Availability[]>([])

  /**
   * Récupère toutes les INDISPONIBILITÉS d'un véhicule
   * NOUVEAU SYSTÈME: La table availabilities stocke maintenant les périodes d'indisponibilité
   */
  const fetchVehicleUnavailabilities = async (vehicleId: string, futureOnly = false) => {
    isLoading.value = true
    error.value = null

    try {
      let query = supabase.from('availabilities').select('*').eq('vehicle_id', vehicleId)

      // Filtrer les indisponibilités futures si demandé
      if (futureOnly) {
        const today = new Date().toISOString().split('T')[0]
        query = query.gte('end_date', today)
      }

      const { data, error: supabaseError } = await query.order('start_date', { ascending: true })

      if (supabaseError) throw supabaseError

      availabilities.value = data || []
      return { success: true, data }
    } catch (err) {
      console.error('Erreur lors de la récupération des indisponibilités:', err)
      error.value = 'Erreur lors de la récupération des indisponibilités'
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * RÉTROCOMPATIBILITÉ: Alias pour fetchVehicleUnavailabilities
   * @deprecated Utiliser fetchVehicleUnavailabilities à la place
   */
  const fetchVehicleAvailabilities = fetchVehicleUnavailabilities

  /**
   * Ajoute une nouvelle période d'INDISPONIBILITÉ
   * NOUVEAU SYSTÈME: On ajoute des périodes où le véhicule N'EST PAS disponible
   */
  const addUnavailability = async (
    unavailability: Omit<Availability, 'id' | 'created_at' | 'updated_at'>
  ) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .insert(unavailability)
        .select()
        .single()

      if (supabaseError) throw supabaseError

      // Ajouter la nouvelle indisponibilité à la liste
      if (data) {
        availabilities.value.push(data)
        // Trier les indisponibilités par date de début
        availabilities.value.sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)))
      }

      return { success: true, data }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'indisponibilité:", err)
      error.value = "Erreur lors de l'ajout de l'indisponibilité"
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * RÉTROCOMPATIBILITÉ: Alias pour addUnavailability
   * @deprecated Utiliser addUnavailability à la place
   */
  const addAvailability = addUnavailability

  /**
   * Met à jour une période d'indisponibilité existante
   * NOUVEAU SYSTÈME: Met à jour une période d'indisponibilité
   */
  const updateUnavailability = async (id: string, updates: Partial<Availability>) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (supabaseError) throw supabaseError

      // Mettre à jour l'indisponibilité dans la liste
      if (data) {
        const index = availabilities.value.findIndex(a => a.id === id)
        if (index !== -1) {
          availabilities.value[index] = data
          // Trier les indisponibilités par date de début
          availabilities.value.sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)))
        }
      }

      return { success: true, data }
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'indisponibilité:", err)
      error.value = "Erreur lors de la mise à jour de l'indisponibilité"
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * RÉTROCOMPATIBILITÉ: Alias pour updateUnavailability
   * @deprecated Utiliser updateUnavailability à la place
   */
  const updateAvailability = updateUnavailability

  /**
   * Supprime une période d'indisponibilité
   * NOUVEAU SYSTÈME: Supprime une période d'indisponibilité
   */
  const deleteUnavailability = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { error: supabaseError } = await supabase.from('availabilities').delete().eq('id', id)

      if (supabaseError) throw supabaseError

      // Supprimer l'indisponibilité de la liste
      availabilities.value = availabilities.value.filter(a => a.id !== id)

      return { success: true }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'indisponibilité:", err)
      error.value = "Erreur lors de la suppression de l'indisponibilité"
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * RÉTROCOMPATIBILITÉ: Alias pour deleteUnavailability
   * @deprecated Utiliser deleteUnavailability à la place
   */
  const deleteAvailability = deleteUnavailability

  /**
   * NOUVEAU SYSTÈME: Vérifie si une période peut être ajoutée comme indisponibilité (pas de chevauchement avec d'autres indisponibilités)
   */
  const canAddUnavailabilityPeriod = (
    startDate: Date | string,
    endDate: Date | string,
    excludeId?: string
  ) => {
    const start = dayjs(startDate).startOf('day')
    const end = dayjs(endDate).startOf('day')

    // Vérifier qu'il n'y a pas de chevauchement avec d'autres indisponibilités
    return !availabilities.value.some(unavailability => {
      // Exclure l'indisponibilité en cours de modification
      if (excludeId && unavailability.id === excludeId) return false

      const unavailStart = dayjs(unavailability.start_date).startOf('day')
      const unavailEnd = dayjs(unavailability.end_date).startOf('day')

      // Vérifier le chevauchement des périodes avec Day.js
      return (
        start.isBetween(unavailStart, unavailEnd, null, '[]') || // La date de début est dans une période existante
        end.isBetween(unavailStart, unavailEnd, null, '[]') || // La date de fin est dans une période existante
        (start.isSameOrBefore(unavailStart) && end.isSameOrAfter(unavailEnd)) // La période englobe une période existante
      )
    })
  }

  /**
   * RÉTROCOMPATIBILITÉ: Alias pour canAddUnavailabilityPeriod
   * @deprecated Utiliser canAddUnavailabilityPeriod à la place
   */
  const isPeriodAvailable = canAddUnavailabilityPeriod

  /**
   * NOUVEAU SYSTÈME: Obtient toutes les dates disponibles pour un véhicule dans une période donnée
   * Une date est disponible si elle n'est pas dans une indisponibilité ET pas réservée
   */
  const getAvailableDates = async (vehicleId: string, startDate: string, endDate: string) => {
    try {
      const { data, error: rpcError } = await supabase.rpc('get_vehicle_unavailable_dates', {
        p_vehicle_id: vehicleId,
        p_start_date: startDate,
        p_end_date: endDate
      })

      if (rpcError) throw rpcError

      // Générer toutes les dates dans la période
      const start = dayjs(startDate)
      const end = dayjs(endDate)
      const allDates: string[] = []
      let current = start

      while (current.isSameOrBefore(end)) {
        allDates.push(current.format('YYYY-MM-DD'))
        current = current.add(1, 'day')
      }

      // Filtrer les dates indisponibles
      const unavailableDates = new Set(
        data?.map((item: { unavailable_date: string }) => item.unavailable_date) || []
      )
      const availableDates = allDates.filter(date => !unavailableDates.has(date))

      return { success: true, data: availableDates }
    } catch (err) {
      console.error('Erreur lors de la récupération des dates disponibles:', err)
      return { success: false, error: err }
    }
  }

  /**
   * Récupère toutes les indisponibilités d'un véhicule sans modifier l'état interne
   */
  const fetchAllVehicleUnavailabilities = async (vehicleId: string) => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('start_date', { ascending: true })

      if (supabaseError) throw supabaseError

      return { success: true, data }
    } catch (err) {
      console.error('Erreur lors de la récupération des indisponibilités:', err)
      return { success: false, error: err }
    }
  }

  /**
   * RÉTROCOMPATIBILITÉ: Alias pour fetchAllVehicleUnavailabilities
   * @deprecated Utiliser fetchAllVehicleUnavailabilities à la place
   */
  const fetchAllVehicleAvailabilities = fetchAllVehicleUnavailabilities

  return {
    isLoading,
    error,
    availabilities, // Contient maintenant les INDISPONIBILITÉS

    // NOUVELLES FONCTIONS (système d'indisponibilités)
    fetchVehicleUnavailabilities,
    fetchAllVehicleUnavailabilities,
    addUnavailability,
    updateUnavailability,
    deleteUnavailability,
    canAddUnavailabilityPeriod,
    getAvailableDates,

    // RÉTROCOMPATIBILITÉ (deprecated)
    fetchVehicleAvailabilities,
    fetchAllVehicleAvailabilities,
    addAvailability,
    updateAvailability,
    deleteAvailability,
    isPeriodAvailable
  }
}
