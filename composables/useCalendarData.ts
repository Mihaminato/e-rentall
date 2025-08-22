import type { Availability, Booking } from '~/types'
import { useCalendarDates } from './useCalendarDates'
import { useCalendarSelection } from './useCalendarSelection'

/**
 * Composable pour gérer les données du calendrier
 * Combine les fonctionnalités de dates et de sélection pour fournir
 * les données formatées nécessaires au composant Calendar
 */
export const useCalendarData = (
  options: {
    availabilities: Ref<Availability[]>
    bookings: Ref<Booking[]>
    selectedStartDate?: Ref<Date | null>
    selectedEndDate?: Ref<Date | null>
  } = {} as any
) => {
  const { availabilities, bookings, selectedStartDate, selectedEndDate } = options

  const {
    convertUnavailabilitiesToMarkedDates,
    convertBookingsToCalendarDates,
    convertSelectionToCalendarDates,
    getInitialCalendarDate,
    getStandardLegendItems
  } = useCalendarDates()

  /**
   * Dates marquées (indisponibilités) pour le calendrier
   */
  const markedDates = computed(() => {
    if (!availabilities?.value) return []
    return convertUnavailabilitiesToMarkedDates(availabilities.value)
  })

  /**
   * Dates réservées formatées pour le calendrier
   */
  const bookedDatesForCalendar = computed(() => {
    if (!bookings?.value) return []
    return convertBookingsToCalendarDates(bookings.value)
  })

  /**
   * Dates sélectionnées formatées pour le calendrier
   */
  const selectedDatesForCalendar = computed(() => {
    if (!selectedStartDate?.value) return []
    return convertSelectionToCalendarDates(selectedStartDate.value, selectedEndDate?.value || null)
  })

  /**
   * Date d'initialisation du calendrier
   */
  const initialCalendarDate = computed(() => {
    if (!availabilities?.value) return new Date()
    return getInitialCalendarDate(availabilities.value)
  })

  /**
   * Éléments de légende du calendrier
   */
  const legendItems = computed(() => {
    return getStandardLegendItems()
  })

  /**
   * Dates indisponibles (pour filtrage futur uniquement)
   */
  const unavailableDates = computed(() => {
    if (!availabilities?.value) return []
    return convertUnavailabilitiesToMarkedDates(
      availabilities.value.filter(availability => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return new Date(availability.end_date) >= today
      })
    )
  })

  return {
    // Données pour le calendrier
    markedDates,
    bookedDatesForCalendar,
    selectedDatesForCalendar,
    unavailableDates,

    // Configuration du calendrier
    initialCalendarDate,
    legendItems
  }
}
