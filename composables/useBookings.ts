import { ref } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Booking, Message } from '~/types'
import { sendBookingNotification, transformBookingForEmail } from '~/utils/emailNotifications'
import dayjs from 'dayjs'

// Ajouter le type pour la validation des disponibilités
export interface BookingAvailabilityValidation {
  is_available: boolean
  has_booking_conflict: boolean
  has_availability_conflict: boolean
  conflicting_bookings: Array<{
    id: string
    start_date: string
    end_date: string
    status: string
  }>
  missing_availabilities: Array<{
    missing_start: string
    missing_end: string
    suggestion: string
  }>
  message: string
}

export const useBookings = () => {
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const bookings = ref<Booking[]>([])
  const booking = ref<Booking | null>(null)
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const isUpdating = ref(false) // Ajout pour les actions spécifiques
  const error = ref<string | null>(null)

  // Valider la disponibilité avant création de booking
  const validateBookingAvailability = async (
    vehicleId: string,
    startDate: string,
    endDate: string,
    excludeBookingId?: string
  ): Promise<{ success: boolean; validation?: BookingAvailabilityValidation; error?: string }> => {
    try {
      const { data, error: rpcError } = await supabase.rpc('validate_booking_availability', {
        p_vehicle_id: vehicleId,
        p_start_date: startDate,
        p_end_date: endDate,
        p_exclude_booking_id: excludeBookingId || null
      })

      if (rpcError) throw rpcError

      return { success: true, validation: data as BookingAvailabilityValidation }
    } catch (err) {
      console.error('Erreur lors de la validation de disponibilité:', err)
      return { success: false, error: (err as Error).message }
    }
  }

  // Récupérer TOUTES les réservations (pour les admins) avec pagination et filtres
  // eslint-disable-next-line complexity
  const fetchAllBookings = async (
    page: number = 1,
    limit: number = 10,
    filters?: {
      status?: string
      searchTerm?: string
      period?: string
    }
  ) => {
    isLoading.value = true
    error.value = null

    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      let query = supabase.from('bookings').select(
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
        `,
        { count: 'exact' }
      )

      // Appliquer les filtres
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      // Filtrage par période
      if (filters?.period) {
        const now = dayjs()

        if (filters.period === 'today') {
          query = query
            .gte('start_date', now.startOf('day').toISOString())
            .lt('start_date', now.endOf('day').toISOString())
        } else if (filters.period === 'week') {
          const weekStart = now.startOf('week')
          const weekEnd = now.endOf('week')
          query = query
            .gte('start_date', weekStart.toISOString())
            .lt('start_date', weekEnd.toISOString())
        } else if (filters.period === 'month') {
          const monthStart = now.startOf('month')
          const monthEnd = now.endOf('month')
          query = query
            .gte('start_date', monthStart.toISOString())
            .lt('start_date', monthEnd.toISOString())
        } else if (filters.period === 'past') {
          query = query.lt('end_date', now.startOf('day').toISOString())
        }
      }

      // Filtrage par recherche textuelle (côté serveur pour certains champs)
      if (filters?.searchTerm) {
        const searchTerm = `%${filters.searchTerm}%`
        query = query.or(
          `vehicle.make.ilike.${searchTerm},vehicle.model.ilike.${searchTerm},renter.first_name.ilike.${searchTerm},renter.last_name.ilike.${searchTerm},renter.email.ilike.${searchTerm}`
        )
      }

      query = query.range(from, to).order('created_at', { ascending: false })

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        console.error('Erreur Supabase fetchAllBookings:', fetchError)
        throw fetchError
      }

      return { bookings: data as Booking[], error: null, totalCount: count }
    } catch (err) {
      error.value = (err as Error).message
      return { bookings: [], error: error.value, totalCount: 0 }
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer les réservations où l'utilisateur est le locataire avec pagination
  const fetchMyRenterBookings = async (
    renterId: string,
    statuses: string[],
    page: number,
    limit: number
  ) => {
    isLoading.value = true
    error.value = null

    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      const {
        data,
        error: fetchError,
        count
      } = await supabase
        .from('bookings')
        .select(
          `
          *,
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(id, first_name, last_name, avatar_url, phone, address),
            vehicle_photos(file_path, is_primary)
          )
        `,
          { count: 'exact' }
        )
        .eq('renter_id', renterId)
        .in('status', statuses)
        .range(from, to)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      return { bookings: data, error: null, totalCount: count }
    } catch (err) {
      error.value = (err as Error).message
      return { bookings: [], error: error.value, totalCount: 0 }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupère le nombre total de réservations pour un locataire, groupées par statut.
   * @param renterId L'ID du locataire
   */
  const getRenterBookingsCounts = async (renterId: string) => {
    try {
      const statusMap: Record<string, string[]> = {
        pending: ['pending', 'owner_approved', 'confirmed', 'active'],
        completed: ['completed'],
        cancelled: ['cancelled']
      }

      const countsPromises = Object.keys(statusMap).map(async key => {
        const { count, error } = await supabase
          .from('bookings')
          .select('id', { count: 'exact', head: true })
          .eq('renter_id', renterId)
          .in('status', statusMap[key])

        if (error) {
          console.error(`Erreur lors du comptage pour le statut ${key}:`, error)
          return { [key]: 0 }
        }
        return { [key]: count || 0 }
      })

      const countsArray = await Promise.all(countsPromises)
      const counts = countsArray.reduce((acc, current) => ({ ...acc, ...current }), {})

      return { counts, error: null }
    } catch (e) {
      const err = e as Error
      console.error(
        'Exception lors de la récupération des comptes de réservations du locataire:',
        err.message
      )
      return { counts: null, error: err.message }
    }
  }

  /**
   * Récupère les réservations pour les véhicules d'un propriétaire spécifique avec pagination et filtres.
   * @param ownerId L'ID du propriétaire
   * @param statuses Les statuts des réservations à récupérer
   * @param page La page actuelle pour la pagination
   * @param limit Le nombre d'éléments par page
   */
  const fetchMyOwnerBookings = async (
    ownerId: string,
    statuses: string[],
    page: number,
    limit: number
  ) => {
    isLoading.value = true
    error.value = null

    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      const {
        data,
        error: fetchError,
        count
      } = await supabase
        .from('bookings')
        .select(
          `
          *,
          renter:profiles!renter_id(id, first_name, last_name, avatar_url, phone, address, city, postal_code),
          vehicle:vehicles!inner(
            *,
            owner:profiles!owner_id(id, first_name, last_name, avatar_url),
            vehicle_photos(file_path, is_primary)
          )
        `,
          { count: 'exact' } // Pour obtenir le total
        )
        .eq('vehicle.owner_id', ownerId)
        .in('status', statuses) // Filtrer par les statuts fournis
        .range(from, to) // Appliquer la pagination
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }
      return { bookings: data, error: null, totalCount: count }
    } catch (e) {
      const err = e as Error
      console.error(
        'Exception lors de la récupération des réservations du propriétaire:',
        err.message
      )
      error.value = err.message
      return { bookings: [], error: err.message, totalCount: 0 }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupère le nombre total de réservations pour un propriétaire, groupées par statut.
   * @param ownerId L'ID du propriétaire
   */
  const getOwnerBookingsCounts = async (ownerId: string) => {
    try {
      // 1. Récupérer les IDs des véhicules du propriétaire
      const { data: vehicles, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('id')
        .eq('owner_id', ownerId)

      if (vehiclesError) throw vehiclesError
      if (!vehicles || vehicles.length === 0) {
        return {
          counts: { pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
          error: null
        }
      }

      const vehicleIds = vehicles.map(v => v.id)

      // 2. Compter les réservations basées sur ces IDs de véhicules
      const statusMap: Record<string, string[]> = {
        pending: ['pending'],
        confirmed: ['owner_approved', 'confirmed', 'active', 'pending_completion'],
        completed: ['completed'],
        cancelled: ['cancelled']
      }

      const countsPromises = Object.keys(statusMap).map(async key => {
        const { count, error } = await supabase
          .from('bookings')
          .select('', { count: 'exact', head: true })
          .in('vehicle_id', vehicleIds) // <-- Utilise vehicle_id au lieu de owner_id
          .in('status', statusMap[key])

        if (error) {
          console.error(`Erreur lors du comptage pour le statut ${key}:`, error)
          return { [key]: 0 }
        }
        return { [key]: count || 0 }
      })

      const countsArray = await Promise.all(countsPromises)
      const counts = countsArray.reduce((acc, current) => ({ ...acc, ...current }), {})

      return { counts, error: null }
    } catch (e) {
      const err = e as Error
      console.error(
        'Exception lors de la récupération des comptes de réservations du propriétaire:',
        err.message
      )
      return { counts: null, error: err.message }
    }
  }

  // Récupérer une réservation par ID
  const fetchBookingById = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(
          `
          *,
          renter:profiles!renter_id(*),
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(*),
            vehicle_photos(file_path, is_primary)
          )
        `
        )
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      booking.value = data as Booking
      return { booking: booking.value }
    } catch (err) {
      error.value = (err as Error).message
      booking.value = null
      return { booking: null, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Créer une nouvelle réservation
  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: createError } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select(
          `
          *,
          renter:profiles!renter_id(*),
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(*),
            vehicle_photos(file_path, is_primary)
          )
        `
        )
        .single()

      if (createError) throw createError

      booking.value = data as Booking

      // Ajouter à la liste des réservations si elle existe déjà
      if (bookings.value.length > 0) {
        bookings.value = [data as Booking, ...bookings.value]
      }

      // Envoyer les notifications email
      try {
        const emailData = transformBookingForEmail(data as Booking)
        await sendBookingNotification('booking_created', emailData)
      } catch (emailError) {
        console.error("Erreur lors de l'envoi des emails de notification:", emailError)
        // On ne fait pas échouer la création de réservation si l'email échoue
      }

      return { success: true, booking: booking.value }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Mettre à jour le statut d'une réservation
  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    isUpdating.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        const updatedBooking = data as Booking
        booking.value = updatedBooking

        // Mettre à jour dans la liste si elle existe
        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }
      }

      return { success: true, booking: data as Booking }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  /**
   * Marque une réservation comme "terminée" par le locataire.
   * @param bookingId L'ID de la réservation à finaliser.
   * @returns Un objet indiquant le succès ou l'échec de l'opération.
   */
  const completeBooking = async (bookingId: string) => {
    isUpdating.value = true
    error.value = null
    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('id', bookingId)
        .select()
        .single()

      if (updateError) throw updateError

      // Optionnel : Mettre à jour la réservation locale si elle est chargée
      if (booking.value && booking.value.id === bookingId) {
        booking.value.status = 'completed'
      }

      return { success: true, booking: data }
    } catch (err) {
      error.value = `Erreur lors de la finalisation de la réservation: ${(err as Error).message}`
      console.error(error.value)
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  // Étape 1 (Propriétaire) : Approuver et définir l'acompte
  const setBookingDeposit = async (id: string, totalAmount: number, numberOfDays: number) => {
    isUpdating.value = true
    error.value = null
    const depositAmount = numberOfDays * 5000 // nombre de jours * 5000 Ar

    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'owner_approved',
          owner_approved_at: new Date().toISOString(),
          deposit_amount: depositAmount,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(
          `
          *,
          renter:profiles!renter_id(*),
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(*),
            vehicle_photos(file_path, is_primary)
          )
        `
        )
        .single()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        const updatedBooking = data as Booking
        booking.value = updatedBooking
        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }

        // Envoyer les notifications email
        try {
          const emailData = transformBookingForEmail(updatedBooking)
          await sendBookingNotification('booking_approved', emailData)
        } catch (emailError) {
          console.error("Erreur lors de l'envoi des emails d'approbation:", emailError)
          // On ne fait pas échouer l'approbation si l'email échoue
        }
      }

      return { success: true, booking: data as Booking }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  // Étape 2 (Locataire) : Marquer l'acompte comme payé avec référence
  const payDepositWithReference = async (id: string, paymentReference: string) => {
    isUpdating.value = true // Utiliser isUpdating pour cette action
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({
          is_deposit_paid: true,
          payment_reference: paymentReference,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(
          `
          *,
          renter:profiles!renter_id(*),
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(*),
            vehicle_photos(file_path, is_primary)
          )
        `
        )
        .single()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        const updatedBooking = data as Booking
        booking.value = updatedBooking
        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }

        // Envoyer une notification à l'admin UNIQUEMENT
        try {
          const emailData = transformBookingForEmail(updatedBooking)
          await sendBookingNotification('deposit_submitted_for_admin_validation', emailData)
        } catch (emailError) {
          console.error("Erreur lors de l'envoi de l'email à l'admin:", emailError)
        }
      }

      return { success: true, booking: data as Booking }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  // Étape 3 (Admin) : Confirmer la réservation
  const confirmBookingByAdmin = async (id: string, adminNotes?: string) => {
    isUpdating.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'active', // Le statut passe directement à 'active'
          admin_approved_at: new Date().toISOString(),
          admin_notes: adminNotes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(
          `
          *,
          renter:profiles!renter_id(*),
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(*),
            vehicle_photos(file_path, is_primary)
          )
        `
        )
        .single()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        const updatedBooking = data as Booking
        booking.value = updatedBooking
        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }

        // Envoyer les notifications de confirmation finale
        try {
          const emailData = transformBookingForEmail(updatedBooking)
          await sendBookingNotification('booking_confirmed_and_active', emailData)
        } catch (emailError) {
          console.error("Erreur lors de l'envoi des emails de confirmation finale:", emailError)
        }
      }

      return { success: true, booking: data as Booking }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  // Annuler une réservation avec raison
  const cancelBooking = async (id: string, cancelledBy: string, reason?: string) => {
    isUpdating.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_by: cancelledBy,
          cancellation_reason: reason || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(
          `
          *,
          renter:profiles!renter_id(*),
          vehicle:vehicles(
            *,
            owner:profiles!owner_id(*),
            vehicle_photos(file_path, is_primary)
          )
        `
        )
        .single()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        const updatedBooking = data as Booking
        booking.value = updatedBooking

        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }

        // Envoyer systématiquement une notification d'annulation
        try {
          const emailData = transformBookingForEmail(updatedBooking)
          // Utiliser le nouvel événement 'booking_cancelled'
          await sendBookingNotification('booking_cancelled', emailData)
        } catch (emailError) {
          console.error("Erreur lors de l'envoi des emails d'annulation:", emailError)
          // On ne fait pas échouer l'annulation si l'email échoue
        }
      }

      return { success: true, booking: data as Booking }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  // Récupérer les messages d'une réservation
  const fetchBookingMessages = async (bookingId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: messagesError } = await supabase
        .from('messages')
        .select(
          `
          *,
          sender:profiles!sender_id(first_name, last_name, avatar_url)
        `
        )
        .eq('booking_id', bookingId)
        .order('created_at', { ascending: true })

      if (messagesError) throw messagesError

      messages.value = data as Message[]
      return { messages: messages.value }
    } catch (err) {
      error.value = (err as Error).message
      messages.value = []
      return { messages: [], error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Marquer un message comme lu
  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)

      if (updateError) throw updateError

      // Mettre à jour l'état local
      messages.value = messages.value.map(m => (m.id === messageId ? { ...m, is_read: true } : m))

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    }
  }

  // Compter les messages non lus
  const countUnreadMessages = async (userId: string) => {
    try {
      const { count, error: countError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', userId)
        .eq('is_read', false)

      if (countError) throw countError

      return { count: count || 0 }
    } catch (err) {
      error.value = (err as Error).message
      return { count: 0, error: error.value }
    }
  }

  // Revertir une réservation à l'état 'pending'
  const revertBookingToPending = async (id: string) => {
    isUpdating.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'pending',
          owner_approved_at: null,
          admin_approved_at: null,
          is_deposit_paid: false,
          owner_notes: null,
          admin_notes: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        const updatedBooking = data as Booking
        booking.value = updatedBooking
        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
          bookings.value[index] = updatedBooking
        }
      }

      return { success: true, booking: data as Booking }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isUpdating.value = false
    }
  }

  // Revertir une réservation à l'état 'owner_approved'
  const revertBookingToOwnerApproved = async (id: string) => {
    return await updateBookingStatus(id, 'owner_approved')
  }

  const fetchUserBookingsCount = async (userId: string): Promise<number> => {
    if (!userId) return 0

    try {
      // Pour éviter les complexités des filtres .or() avec RLS sur des tables jointes,
      // nous faisons deux appels simples et les additionnons. C'est plus fiable.

      // NOTE: a implementer plus tard
      // // 1. Compter les réservations en tant que locataire
      // const { count: renterCount, error: renterError } = await supabase
      //   .from('bookings')
      //   .select('id', { count: 'exact', head: true })
      //   .eq('renter_id', userId)

      // if (renterError) {
      //   console.error('Erreur lors du comptage (locataire):', renterError)
      //   return 0 // ou gérer l'erreur différemment
      // }

      // 2. Compter les réservations en tant que propriétaire
      const { count: ownerCount, error: ownerError } = await supabase
        .from('bookings')
        .select('id, vehicle:vehicles!inner(owner_id)', { count: 'exact', head: true })
        .eq('vehicle.owner_id', userId)

      if (ownerError) {
        console.error('Erreur lors du comptage (propriétaire):', ownerError)
        return 0 // ou gérer l'erreur différemment
      }

      return ownerCount || 0
    } catch (e) {
      console.error("Exception lors du comptage des réservations de l'utilisateur:", e)
      return 0
    }
  }

  const requestNewPaymentReference = async () => {
    isUpdating.value = true
    error.value = null
    try {
      if (!booking.value) throw new Error('Aucune réservation chargée.')

      const emailData = transformBookingForEmail(booking.value)
      await sendBookingNotification('request_new_payment_reference', emailData)

      return { success: true }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Une erreur inconnue est survenue.'
      error.value = errorMessage
      return { success: false, error: errorMessage }
    } finally {
      isUpdating.value = false
    }
  }

  // Récupérer les réservations d'un véhicule spécifique
  const fetchVehicleBookings = async (vehicleId: string) => {
    isLoading.value = true
    error.value = null

    try {
      // Utiliser la vue publique pour récupérer les dates de réservation
      // Cette approche fonctionne même pour les utilisateurs non connectés
      const { data, error: fetchError } = await supabase
        .from('public_vehicle_booking_dates')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('start_date', { ascending: true })

      if (fetchError) throw fetchError

      // Transformer les données pour correspondre au format Booking attendu
      const transformedBookings = (data || []).map(booking => ({
        id: `booking-${booking.start_date}-${booking.end_date}`, // ID fictif pour le calendrier
        vehicle_id: booking.vehicle_id,
        start_date: booking.start_date,
        end_date: booking.end_date,
        status: booking.status
      }))

      return { success: true, data: transformedBookings as unknown as Booking[] }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value, data: [] }
    } finally {
      isLoading.value = false
    }
  }

  return {
    bookings,
    booking,
    messages,
    isLoading,
    isUpdating,
    error,
    fetchAllBookings,
    fetchMyRenterBookings,
    getRenterBookingsCounts,
    fetchMyOwnerBookings,
    getOwnerBookingsCounts,
    fetchBookingById,
    createBooking,
    updateBookingStatus,
    completeBooking,
    setBookingDeposit,
    payDepositWithReference,
    confirmBookingByAdmin,
    cancelBooking,
    revertBookingToPending,
    revertBookingToOwnerApproved,
    fetchBookingMessages,
    markMessageAsRead,
    countUnreadMessages,
    validateBookingAvailability,
    fetchUserBookingsCount,
    requestNewPaymentReference,
    fetchVehicleBookings
  }
}
