import dayjs from 'dayjs'
import type { Availability, Booking, Profile } from '~/types'

/**
 * Composable pour la validation des réservations de véhicules
 * Factorisation de la logique de validation commune
 */
export const useVehicleBookingValidation = () => {
  /**
   * Vérifier si une disponibilité a des réservations actives qui chevauchent
   */
  const hasActiveBookings = (availability: Availability, bookings: Booking[]) => {
    return bookings.some(booking => {
      const bookingStart = dayjs(booking.start_date)
      const bookingEnd = dayjs(booking.end_date)
      const availStart = dayjs(availability.start_date)
      const availEnd = dayjs(availability.end_date)

      // Vérifier si la réservation chevauche avec la disponibilité
      return bookingStart.isSameOrBefore(availEnd) && bookingEnd.isSameOrAfter(availStart)
    })
  }

  /**
   * Vérifier si le profil utilisateur est complet pour effectuer une réservation
   */
  const isProfileComplete = (profile: Profile | null) => {
    if (!profile) return false

    const requiredFields: (keyof Profile)[] = [
      'first_name',
      'last_name',
      'phone',
      'address',
      'postal_code',
      'cin_number'
    ]

    return requiredFields.every(field => {
      const value = profile[field]
      return value !== null && value !== undefined && String(value).trim() !== ''
    })
  }

  /**
   * Valider les dates d'une période de réservation/indisponibilité
   */
  const validateDateRange = (startDate: string, endDate: string) => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const today = dayjs().startOf('day')

    // Vérifier que les dates sont valides
    if (!start.isValid() || !end.isValid()) {
      return { isValid: false, error: 'Dates invalides' }
    }

    // Vérifier que la date de fin est après la date de début
    if (end.isSameOrBefore(start)) {
      return { isValid: false, error: 'La date de fin doit être postérieure à la date de début' }
    }

    // Vérifier que les dates ne sont pas dans le passé
    if (start.isBefore(today)) {
      return { isValid: false, error: 'La date de début ne peut pas être dans le passé' }
    }

    return { isValid: true, error: null }
  }

  /**
   * Vérifier si une période peut être ajoutée sans conflit avec les indisponibilités existantes
   */
  const canAddPeriodWithoutConflict = (
    startDate: string,
    endDate: string,
    existingAvailabilities: Availability[],
    excludeId?: string
  ) => {
    const newStart = dayjs(startDate)
    const newEnd = dayjs(endDate)

    return !existingAvailabilities.some(availability => {
      // Exclure l'élément en cours de modification
      if (excludeId && availability.id === excludeId) {
        return false
      }

      const existingStart = dayjs(availability.start_date)
      const existingEnd = dayjs(availability.end_date)

      // Vérifier s'il y a chevauchement
      return newStart.isSameOrBefore(existingEnd) && newEnd.isSameOrAfter(existingStart)
    })
  }

  /**
   * Calculer le prix total d'une réservation
   */
  const calculateTotalPrice = (
    startDate: Date | string,
    endDate: Date | string,
    pricePerDay: number
  ) => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const numberOfDays = end.diff(start, 'day') + 1
    return numberOfDays * pricePerDay
  }

  /**
   * Vérifier si une période de réservation est valide pour un véhicule
   */
  const validateBookingPeriod = (
    startDate: string,
    endDate: string,
    availabilities: Availability[],
    bookings: Booking[]
  ) => {
    // Validation des dates
    const dateValidation = validateDateRange(startDate, endDate)
    if (!dateValidation.isValid) {
      return { isValid: false, error: dateValidation.error }
    }

    // Vérifier qu'il n'y a pas de conflit avec les indisponibilités
    if (!canAddPeriodWithoutConflict(startDate, endDate, availabilities)) {
      return { isValid: false, error: "Cette période chevauche une période d'indisponibilité" }
    }

    // Vérifier qu'il n'y a pas de conflit avec les réservations existantes
    const newStart = dayjs(startDate)
    const newEnd = dayjs(endDate)

    const hasBookingConflict = bookings.some(booking => {
      const bookingStart = dayjs(booking.start_date)
      const bookingEnd = dayjs(booking.end_date)
      return newStart.isSameOrBefore(bookingEnd) && newEnd.isSameOrAfter(bookingStart)
    })

    if (hasBookingConflict) {
      return { isValid: false, error: 'Cette période chevauche une réservation existante' }
    }

    return { isValid: true, error: null }
  }

  /**
   * Obtenir les réservations qui chevauchent avec une période donnée
   */
  const getConflictingBookings = (startDate: string, endDate: string, bookings: Booking[]) => {
    const periodStart = dayjs(startDate)
    const periodEnd = dayjs(endDate)

    return bookings.filter(booking => {
      const bookingStart = dayjs(booking.start_date)
      const bookingEnd = dayjs(booking.end_date)
      return periodStart.isSameOrBefore(bookingEnd) && periodEnd.isSameOrAfter(bookingStart)
    })
  }

  /**
   * Vérifier si une période peut être supprimée (pas de réservations actives)
   */
  const canDeletePeriod = (availability: Availability, bookings: Booking[]) => {
    const conflictingBookings = getConflictingBookings(
      availability.start_date,
      availability.end_date,
      bookings
    )
    return conflictingBookings.length === 0
  }

  return {
    // Validation du profil
    isProfileComplete,

    // Validation des périodes
    validateDateRange,
    validateBookingPeriod,
    canAddPeriodWithoutConflict,
    canDeletePeriod,

    // Gestion des conflits
    hasActiveBookings,
    getConflictingBookings,

    // Calculs
    calculateTotalPrice
  }
}
