import dayjs from 'dayjs'
import type { Booking, Availability } from '~/types'

/**
 * Interface pour les jours du calendrier
 */
export interface CalendarDay {
  date: number
  fullDate: Date
  isCurrentMonth: boolean
  isToday: boolean
  isMarked: boolean
  markerColor?: string
  data?: Record<string, unknown>
}

/**
 * Composable pour gérer la sélection dans le calendrier
 * Factorisation de la logique de sélection séquentielle
 */
export const useCalendarSelection = () => {
  // État de sélection
  const selectedStartDate = ref<Date | null>(null)
  const selectedEndDate = ref<Date | null>(null)
  const selectionError = ref<string | null>(null)

  /**
   * Calculer le nombre de jours sélectionnés
   */
  const numberOfDays = computed(() => {
    if (!selectedStartDate.value || !selectedEndDate.value) return 0
    return dayjs(selectedEndDate.value).diff(dayjs(selectedStartDate.value), 'day') + 1
  })

  /**
   * Vérifier si une date est réservée
   */
  const isDateBooked = (date: Date, bookings: Booking[]) => {
    return bookings.some(booking => {
      const checkDate = dayjs(date).startOf('day')
      const start = dayjs(booking.start_date).startOf('day')
      const end = dayjs(booking.end_date).startOf('day')
      return checkDate.isBetween(start, end, null, '[]')
    })
  }

  /**
   * Vérifier si une date est indisponible (définie par le propriétaire)
   */
  const isDateUnavailable = (date: Date, unavailabilities: Availability[]) => {
    return unavailabilities.some(unavailability => {
      const checkDate = dayjs(date).startOf('day')
      const start = dayjs(unavailability.start_date).startOf('day')
      const end = dayjs(unavailability.end_date).startOf('day')
      return checkDate.isBetween(start, end, null, '[]')
    })
  }

  /**
   * Vérifier si une date est disponible pour sélection
   */
  const isDateAvailable = (
    date: Date,
    bookings: Booking[] = [],
    unavailabilities: Availability[] = []
  ) => {
    const checkDate = dayjs(date)
    const today = dayjs().startOf('day')

    // Les dates passées ne sont pas disponibles
    if (checkDate.isBefore(today, 'day')) return false

    // Empêcher la sélection des dates réservées
    if (isDateBooked(date, bookings)) return false

    // Empêcher la sélection des dates indisponibles
    if (isDateUnavailable(date, unavailabilities)) return false

    return true
  }

  /**
   * Vérifier si une période est entièrement disponible
   */
  const isPeriodAvailable = (
    start: Date,
    end: Date,
    bookings: Booking[] = [],
    unavailabilities: Availability[] = []
  ) => {
    let current = dayjs(start)
    const endDay = dayjs(end)

    while (current.isSameOrBefore(endDay, 'day')) {
      if (!isDateAvailable(current.toDate(), bookings, unavailabilities)) {
        return false
      }
      current = current.add(1, 'day')
    }

    return true
  }

  /**
   * Vérifier si une période contient des réservations
   */
  const isPeriodBookedBetween = (start: Date, end: Date, bookings: Booking[]) => {
    let current = dayjs(start)
    const endDate = dayjs(end)

    while (current.isSameOrBefore(endDate, 'day')) {
      if (isDateBooked(current.toDate(), bookings)) {
        return true
      }
      current = current.add(1, 'day')
    }
    return false
  }

  /**
   * Gérer le clic sur un jour du calendrier (logique générique)
   */
  const handleDayClick = (
    day: CalendarDay,
    options: {
      bookings?: Booking[]
      unavailabilities?: Availability[]
      onDateSelected?: (startDate: Date | null, endDate: Date | null) => void
      allowPastDates?: boolean
      customValidation?: (date: Date) => boolean | string
    } = {}
  ) => {
    const {
      bookings = [],
      unavailabilities = [],
      onDateSelected,
      allowPastDates = false,
      customValidation
    } = options

    // Ignorer si le jour n'est pas du mois courant
    if (!day.isCurrentMonth) {
      return
    }

    // Validation personnalisée si fournie
    if (customValidation) {
      const validationResult = customValidation(day.fullDate)
      if (typeof validationResult === 'string') {
        selectionError.value = validationResult
        return
      }
      if (validationResult === false) {
        return
      }
    }

    // Vérification de disponibilité standard
    if (!allowPastDates && !isDateAvailable(day.fullDate, bookings, unavailabilities)) {
      if (dayjs(day.fullDate).isBefore(dayjs(), 'day')) {
        selectionError.value = 'Impossible de sélectionner une date passée'
      } else if (isDateBooked(day.fullDate, bookings)) {
        selectionError.value = 'Impossible de sélectionner une date réservée'
      } else if (isDateUnavailable(day.fullDate, unavailabilities)) {
        selectionError.value = 'Cette date est indisponible'
      }
      return
    }

    // Effacer les erreurs précédentes
    selectionError.value = null

    // Logique de sélection séquentielle
    if (!selectedStartDate.value) {
      // Première sélection
      selectedStartDate.value = day.fullDate
      selectedEndDate.value = null
    } else if (selectedStartDate.value && !selectedEndDate.value) {
      // Deuxième sélection
      const clickedDate = dayjs(day.fullDate)
      const startDate = dayjs(selectedStartDate.value)

      // Si on clique avant la date de début, la remplacer
      if (clickedDate.isBefore(startDate, 'day')) {
        selectedStartDate.value = day.fullDate
        return
      }

      // Vérifier si la période est entièrement disponible
      if (isPeriodAvailable(selectedStartDate.value, day.fullDate, bookings, unavailabilities)) {
        selectedEndDate.value = day.fullDate
      } else {
        // Si la période n'est pas disponible, recommencer la sélection
        selectedStartDate.value = day.fullDate
        selectedEndDate.value = null
        selectionError.value = 'La période sélectionnée contient des dates indisponibles'
      }
    } else {
      // Recommencer la sélection
      selectedStartDate.value = day.fullDate
      selectedEndDate.value = null
    }

    // Callback si fourni
    if (onDateSelected) {
      onDateSelected(selectedStartDate.value, selectedEndDate.value)
    }
  }

  /**
   * Effacer la sélection
   */
  const clearSelection = () => {
    selectedStartDate.value = null
    selectedEndDate.value = null
    selectionError.value = null
  }

  /**
   * Définir manuellement les dates sélectionnées
   */
  const setSelection = (startDate: Date | null, endDate: Date | null = null) => {
    selectedStartDate.value = startDate
    selectedEndDate.value = endDate
    selectionError.value = null
  }

  /**
   * Obtenir les indisponibilités qui affectent une date donnée
   */
  const getDateUnavailabilities = (date: Date, unavailabilities: Availability[]) => {
    return unavailabilities.filter(unavailability => {
      const checkDate = dayjs(date).startOf('day')
      const start = dayjs(unavailability.start_date).startOf('day')
      const end = dayjs(unavailability.end_date).startOf('day')
      return checkDate.isBetween(start, end, null, '[]')
    })
  }

  return {
    // État réactif (lecture seule pour l'extérieur)
    selectedStartDate: readonly(selectedStartDate),
    selectedEndDate: readonly(selectedEndDate),
    selectionError: readonly(selectionError),
    numberOfDays,

    // État réactif modifiable (pour les cas spéciaux comme les modals)
    _selectedStartDate: selectedStartDate,
    _selectedEndDate: selectedEndDate,
    _selectionError: selectionError,

    // Méthodes de validation
    isDateBooked,
    isDateUnavailable,
    isDateAvailable,
    isPeriodAvailable,
    isPeriodBookedBetween,

    // Gestion de la sélection
    handleDayClick,
    clearSelection,
    setSelection,

    // Utilitaires
    getDateUnavailabilities
  }
}
