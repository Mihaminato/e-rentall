import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type { Availability, Booking } from '~/types'

dayjs.extend(isBetween)

/**
 * Composable pour gérer les calculs de dates du calendrier
 * Factorisation du code commun entre VehicleAvailabilityCalendar et AvailabilityModal
 */
export const useCalendarDates = () => {
  /**
   * Formatage des dates pour l'affichage
   */
  const formatDate = (date: Date | string) => {
    return dayjs(date).format('DD/MM/YYYY')
  }

  /**
   * Formatage du prix en Ariary
   */
  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price) + ' Ar'
    )
  }

  /**
   * Vérifier si une date est dans le passé
   */
  const isDateInPast = (date: Date) => {
    return dayjs(date).isBefore(dayjs(), 'day')
  }

  /**
   * Vérifier si une date est dans une période donnée
   */
  const isDateInPeriod = (date: Date, startDate: string, endDate: string): boolean => {
    const checkDate = dayjs(date).startOf('day')
    const start = dayjs(startDate).startOf('day')
    const end = dayjs(endDate).startOf('day')

    return checkDate.isBetween(start, end, null, '[]')
  }

  /**
   * Calculer le nombre de jours entre deux dates
   */
  const getDaysBetween = (startDate: Date | string, endDate: Date | string) => {
    return dayjs(endDate).diff(dayjs(startDate), 'day') + 1
  }

  /**
   * Obtenir le texte de durée formaté
   */
  const getDurationText = (startDate: string, endDate: string) => {
    const days = getDaysBetween(startDate, endDate)
    return days === 1 ? '1 jour' : `${days} jours`
  }

  /**
   * Générer la liste des dates entre deux dates
   */
  const generateDateRange = (startDate: Date | string, endDate: Date | string): Date[] => {
    const dates: Date[] = []
    let current = dayjs(startDate).startOf('day')
    const end = dayjs(endDate).startOf('day')

    while (current.isSameOrBefore(end)) {
      dates.push(current.toDate())
      current = current.add(1, 'day')
    }

    return dates
  }

  /**
   * Convertir les dates d'indisponibilité en dates marquées pour le calendrier
   */
  const convertUnavailabilitiesToMarkedDates = (unavailabilities: Availability[]): Date[] => {
    const dates: Date[] = []
    unavailabilities.forEach(unavailability => {
      const rangeDates = generateDateRange(unavailability.start_date, unavailability.end_date)
      dates.push(...rangeDates)
    })
    return dates
  }

  /**
   * Convertir les réservations en dates avec types pour le calendrier
   */
  const convertBookingsToCalendarDates = (
    bookings: Booking[]
  ): Array<{ date: Date; type: 'start' | 'middle' | 'end' }> => {
    const dates: Array<{ date: Date; type: 'start' | 'middle' | 'end' }> = []

    bookings.forEach(booking => {
      const start = dayjs(booking.start_date).startOf('day')
      const end = dayjs(booking.end_date).startOf('day')

      let currentDate = start
      while (currentDate.isSameOrBefore(end)) {
        let type: 'start' | 'middle' | 'end' = 'middle'

        if (currentDate.isSame(start) && currentDate.isSame(end)) {
          type = 'start' // Réservation d'une seule journée
        } else if (currentDate.isSame(start)) {
          type = 'start'
        } else if (currentDate.isSame(end)) {
          type = 'end'
        }

        dates.push({ date: currentDate.toDate(), type })
        currentDate = currentDate.add(1, 'day')
      }
    })

    return dates
  }

  /**
   * Convertir une sélection (début/fin) en dates avec types pour le calendrier
   */
  const convertSelectionToCalendarDates = (
    startDate: Date | null,
    endDate: Date | null
  ): Array<{ date: Date; type: 'start' | 'middle' | 'end' }> => {
    const dates: Array<{ date: Date; type: 'start' | 'middle' | 'end' }> = []

    if (startDate) {
      dates.push({ date: startDate, type: 'start' })

      if (endDate) {
        dates.push({ date: endDate, type: 'end' })

        // Ajouter les dates du milieu
        let current = dayjs(startDate).add(1, 'day')
        const end = dayjs(endDate)

        while (current.isBefore(end, 'day')) {
          dates.push({ date: current.toDate(), type: 'middle' })
          current = current.add(1, 'day')
        }
      }
    }

    return dates
  }

  /**
   * Obtenir la date d'initialisation du calendrier basée sur les disponibilités
   */
  const getInitialCalendarDate = (availabilities: Availability[]): Date => {
    const today = dayjs().startOf('day')

    if (availabilities.length === 0) {
      return today.toDate()
    }

    // Filtrer uniquement les disponibilités encore valides (fin >= aujourd'hui)
    const futureAvailabilities = [...availabilities]
      .filter(a => dayjs(a.end_date).isSameOrAfter(today, 'day'))
      .sort((a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf())

    if (futureAvailabilities.length === 0) {
      // Toutes les dispos sont dans le passé → afficher le mois actuel
      return today.toDate()
    }

    const firstFuture = futureAvailabilities[0]
    const firstFutureStart = dayjs(firstFuture.start_date)

    // Ne jamais initialiser sur un mois passé
    return firstFutureStart.isBefore(today, 'month') ? today.toDate() : firstFutureStart.toDate()
  }

  /**
   * Obtenir les éléments de légende standard du calendrier
   */
  const getStandardLegendItems = () => [
    { label: 'Disponible', color: 'bg-green-500' },
    { label: 'Indisponible', color: 'bg-orange-500' },
    { label: 'Sélectionné', color: 'bg-blue-400' },
    { label: 'Réservée', color: 'bg-red-500' }
  ]

  /**
   * Obtenir la date formatée pour les inputs HTML (YYYY-MM-DD)
   */
  const getTodayFormatted = () => dayjs().format('YYYY-MM-DD')

  return {
    // Formatage
    formatDate,
    formatPrice,
    getDurationText,
    getTodayFormatted,

    // Validation de dates
    isDateInPast,
    isDateInPeriod,
    getDaysBetween,

    // Génération de plages
    generateDateRange,

    // Conversions pour le calendrier
    convertUnavailabilitiesToMarkedDates,
    convertBookingsToCalendarDates,
    convertSelectionToCalendarDates,

    // Configuration du calendrier
    getInitialCalendarDate,
    getStandardLegendItems
  }
}
