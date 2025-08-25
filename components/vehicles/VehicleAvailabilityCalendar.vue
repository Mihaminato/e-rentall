<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title">Disponibilités</h2>
      </div>

      <!-- Calendrier des disponibilités -->
      <UiCalendar
        :marked-dates="unavailableDates"
        :selected-dates="selectedDatesForCalendar"
        :booked-dates="bookedDatesForCalendar"
        :initial-date="initialCalendarDate"
        :show-legend="true"
        :legend-items="legendItems"
        marker-color-class="bg-orange-500"
        @day-click="handleCalendarDayClick"
        @month-change="handleMonthChange"
      />

      <!-- Réservation rapide pour les visiteurs -->
      <div
        v-if="!isOwner && selectedStartDate && !selectedEndDate"
        class="mt-4 p-3 bg-primary/10 rounded-lg"
      >
        <div class="flex items-center gap-2 text-sm">
          <Icon name="mdi:information" class="w-4 h-4 text-primary" />
          <span>Sélectionnez la date de fin pour voir le prix total</span>
        </div>
      </div>

      <!-- Période sélectionnée -->
      <div v-if="selectedStartDate && selectedEndDate" class="mt-4 p-3 bg-base-200 rounded-lg">
        <h4 class="font-semibold mb-2">Période sélectionnée</h4>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span>Début :</span>
            <span class="font-medium">{{ formatDate(selectedStartDate) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Fin :</span>
            <span class="font-medium">{{ formatDate(selectedEndDate) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Durée :</span>
            <span class="font-medium"
              >{{ numberOfDays }} jour{{ numberOfDays > 1 ? 's' : '' }}</span
            >
          </div>
          <div v-if="!isOwner" class="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total :</span>
            <span class="text-primary">{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>

        <!-- Bouton de réservation pour les visiteurs -->

        <!-- Alerte si le profil n'est pas complet -->
        <UiProfileVerificationCard
          v-if="!isProfileCompleteComputed"
          class="m-2"
          text="Veuillez vous inscrire ou compléter toutes vos informations personnelles (CIN, Date de délivrance CIN) avant de reserver."
        />
        <button
          v-if="!isOwner && isProfileCompleteComputed"
          class="btn btn-primary btn-block mt-3"
          @click="openBookingModal"
        >
          <Icon name="mdi:calendar-check" class="w-4 h-4" />
          Réserver cette période
        </button>

        <!-- Bouton pour effacer la sélection -->
        <button class="btn btn-outline btn-block mt-2" @click="clearSelection()">
          <Icon name="mdi:close" class="w-4 h-4" />
          Effacer la sélection
        </button>
      </div>
    </div>

    <!-- Modal de réservation -->
    <VehiclesBookingModal
      ref="bookingModalRef"
      :vehicle="vehicle"
      :initial-start-date="
        selectedStartDate ? dayjs(selectedStartDate).format('YYYY-MM-DD') : undefined
      "
      :initial-end-date="selectedEndDate ? dayjs(selectedEndDate).format('YYYY-MM-DD') : undefined"
      @booking-created="handleBookingCreated"
      @validation-error="handleValidationError"
    />
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import type { Vehicle, Booking, Availability } from '~/types'
  import type { CalendarDay } from '~/composables/useCalendarSelection'

  // --- Store et composables ---
  const authStore = useAuthStore()
  const profile = computed(() => authStore.profile)
  const { fetchVehicleBookings } = useBookings()

  // Composables factorisés
  const { formatDate, formatPrice, getInitialCalendarDate, getStandardLegendItems } =
    useCalendarDates()
  const { selectedStartDate, selectedEndDate, numberOfDays, handleDayClick, clearSelection } =
    useCalendarSelection()
  const { isProfileComplete, calculateTotalPrice } = useVehicleBookingValidation()

  interface Props {
    availabilities: Availability[]
    pricePerDay: number
    isOwner?: boolean
    vehicle?: Vehicle | null
  }

  const props = withDefaults(defineProps<Props>(), {
    isOwner: false,
    vehicle: null
  })

  const emit = defineEmits<{
    'manage-availability': []
    reserve: [{ startDate: string; endDate: string; totalPrice: number }]
    'booking-created': [booking: Booking]
  }>()

  // Références
  const bookingModalRef = ref()

  // État des réservations
  const vehicleBookings = ref<Booking[]>([])

  // Utilisation du composable pour les données du calendrier
  const availabilitiesRef = ref<Availability[]>(props.availabilities)
  const vehicleBookingsRef = ref<Booking[]>(vehicleBookings.value)

  // Synchroniser les refs avec les données
  watch(
    () => props.availabilities,
    (newAvailabilities: Availability[]) => {
      availabilitiesRef.value = newAvailabilities
    }
  )

  watch(
    () => vehicleBookings.value,
    (newBookings: Booking[]) => {
      vehicleBookingsRef.value = newBookings
    }
  )

  const {
    markedDates: unavailableDates,
    bookedDatesForCalendar,
    selectedDatesForCalendar
  } = useCalendarData({
    availabilities: availabilitiesRef,
    bookings: vehicleBookingsRef,
    selectedStartDate,
    selectedEndDate
  })

  // Date d'initialisation du calendrier
  const initialCalendarDate = computed(() => {
    return getInitialCalendarDate(props.availabilities)
  })

  // Légende du calendrier
  const legendItems = computed(() => {
    return getStandardLegendItems()
  })

  // Prix total calculé
  const totalPrice = computed(() => {
    if (!selectedStartDate.value || !selectedEndDate.value) return 0
    return calculateTotalPrice(selectedStartDate.value, selectedEndDate.value, props.pricePerDay)
  })

  // Validation du profil utilisateur
  const isProfileCompleteComputed = computed(() => {
    return isProfileComplete(profile.value)
  })

  // Gérer le clic sur un jour du calendrier
  const handleCalendarDayClick = (day: CalendarDay) => {
    handleDayClick(day, {
      bookings: vehicleBookings.value,
      unavailabilities: props.availabilities
    })
  }

  // Gérer le changement de mois
  const handleMonthChange = (date: Date) => {
    // Émettre l'événement si nécessaire pour des analytics
    console.log('Mois changé:', dayjs(date).format('MMMM YYYY'))
  }

  // Charger les réservations du véhicule (pour tous)
  const loadVehicleBookings = async (vehicleId: string) => {
    const { success, data } = await fetchVehicleBookings(vehicleId)
    if (success) {
      vehicleBookings.value = data
    }
  }

  // Watcher pour charger les réservations quand le véhicule change
  watch(
    () => props.vehicle?.id,
    async newVehicleId => {
      if (newVehicleId) {
        await loadVehicleBookings(newVehicleId)
      } else {
        vehicleBookings.value = []
      }
    },
    { immediate: true }
  )

  // Ouvrir la modal de réservation
  const openBookingModal = () => {
    bookingModalRef.value?.openModal()
  }

  // Gérer la création de réservation réussie
  const handleBookingCreated = (booking: Booking) => {
    emit('booking-created', booking)
    // Effacer la sélection après réservation
    clearSelection()
  }

  // Gérer les erreurs de validation
  const handleValidationError = (error: string) => {
    console.error('Erreur de validation:', error)
    // Vous pourriez afficher un toast ou une notification ici
  }
</script>
