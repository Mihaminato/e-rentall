<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title">Disponibilités</h2>
        <button v-if="isOwner" class="btn btn-primary btn-sm" @click="$emit('manage-availability')">
          <Icon name="mdi:pencil" class="w-4 h-4" />
          Gérer
        </button>
      </div>

      <!-- Calendrier des disponibilités -->
      <UiCalendar
        :marked-dates="availableDates"
        :selected-dates="selectedDatesForCalendar"
        :initial-date="firstAvailabilityDate"
        :show-legend="true"
        :legend-items="legendItems"
        marker-color-class="bg-success"
        @day-click="handleDayClick"
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
          v-if="!isProfileComplete"
          class="m-2"
          text="Veuillez compléter toutes vos informations personnelles avant de pouvoir ajouter des documents. (CIN, Date de délivrance CIN)"
        />
        <button
          v-if="!isOwner && isProfileComplete"
          class="btn btn-primary btn-block mt-3"
          @click="openBookingModal"
        >
          <Icon name="mdi:calendar-check" class="w-4 h-4" />
          Réserver cette période
        </button>

        <!-- Bouton pour effacer la sélection -->
        <button class="btn btn-outline btn-block mt-2" @click="clearSelection">
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
  import isBetween from 'dayjs/plugin/isBetween'
  import type { Vehicle, Booking, Profile } from '~/types'

  dayjs.extend(isBetween)

  // --- Store et composables ---
  const authStore = useAuthStore()
  const profile = computed(() => authStore.profile)

  interface Availability {
    id: string
    start_date: string
    end_date: string
  }

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

  // État de sélection
  const selectedStartDate = ref<Date | null>(null)
  const selectedEndDate = ref<Date | null>(null)

  // Dates disponibles calculées
  const availableDates = computed(() => {
    const dates: Date[] = []

    props.availabilities.forEach(availability => {
      const start = dayjs(availability.start_date)
      const end = dayjs(availability.end_date)

      let current = start
      while (current.isSameOrBefore(end, 'day')) {
        dates.push(current.toDate())
        current = current.add(1, 'day')
      }
    })

    return dates
  })

  // Dates sélectionnées avec leurs types pour l'affichage
  const selectedDatesForCalendar = computed(() => {
    const dates: { date: Date; type: 'start' | 'middle' | 'end' }[] = []

    if (!selectedStartDate.value) return dates

    // Date de début
    dates.push({ date: selectedStartDate.value, type: 'start' })

    // Si on a aussi une date de fin
    if (selectedEndDate.value) {
      // Date de fin
      dates.push({ date: selectedEndDate.value, type: 'end' })

      // Dates du milieu
      let current = dayjs(selectedStartDate.value).add(1, 'day')
      const end = dayjs(selectedEndDate.value)

      while (current.isBefore(end, 'day')) {
        dates.push({ date: current.toDate(), type: 'middle' })
        current = current.add(1, 'day')
      }
    }

    return dates
  })

  // Première date de disponibilité pour initialiser le calendrier
  const firstAvailabilityDate = computed(() => {
    if (props.availabilities.length === 0) return null

    // Trouver la première date de disponibilité (la plus proche de maintenant)
    const sortedAvailabilities = [...props.availabilities].sort(
      (a, b) => dayjs(a.start_date).valueOf() - dayjs(b.start_date).valueOf()
    )

    const firstAvailability = sortedAvailabilities[0]
    return firstAvailability ? dayjs(firstAvailability.start_date).toDate() : null
  })

  // Légende du calendrier
  const legendItems = computed(() => [
    { label: 'Disponible', color: 'bg-success' },
    { label: 'Sélectionné', color: 'bg-primary' }
  ])

  // Calculer le nombre de jours sélectionnés
  const numberOfDays = computed(() => {
    if (!selectedStartDate.value || !selectedEndDate.value) return 0
    return dayjs(selectedEndDate.value).diff(dayjs(selectedStartDate.value), 'day') + 1
  })

  // Prix total calculé
  const totalPrice = computed(() => {
    return numberOfDays.value * props.pricePerDay
  })

  //Verifier que tous les information sont valide
  // --- Validation ---
  const isProfileComplete = computed(() => {
    if (!profile.value) return false
    const requiredFields: (keyof Profile)[] = [
      'first_name',
      'last_name',
      'phone',
      'address',
      'postal_code',
      'phone',
      'cin_number'
    ]
    return requiredFields.every(field => {
      const value = profile.value?.[field]
      return value !== null && value !== undefined && String(value).trim() !== ''
    })
  })

  // Vérifier si une date est disponible
  const isDateAvailable = (date: Date) => {
    return availableDates.value.some(availableDate =>
      dayjs(availableDate).isSame(dayjs(date), 'day')
    )
  }

  // Vérifier si une période est entièrement disponible
  const isPeriodAvailable = (start: Date, end: Date) => {
    let current = dayjs(start)
    const endDay = dayjs(end)

    while (current.isSameOrBefore(endDay, 'day')) {
      if (!isDateAvailable(current.toDate())) {
        return false
      }
      current = current.add(1, 'day')
    }

    return true
  }

  // Interface pour les jours du calendrier
  interface CalendarDay {
    date: number
    fullDate: Date
    isCurrentMonth: boolean
    isToday: boolean
    isMarked: boolean
    markerColor?: string
    data?: Record<string, unknown>
  }

  // Gérer le clic sur un jour
  const handleDayClick = (day: CalendarDay) => {
    // Ignorer si le jour n'est pas du mois courant ou n'est pas disponible
    if (!day.isCurrentMonth || !isDateAvailable(day.fullDate)) {
      return
    }

    // Si aucune date de début sélectionnée
    if (!selectedStartDate.value) {
      selectedStartDate.value = day.fullDate
      selectedEndDate.value = null
      return
    }

    // Si seule la date de début est sélectionnée
    if (selectedStartDate.value && !selectedEndDate.value) {
      const clickedDate = dayjs(day.fullDate)
      const startDate = dayjs(selectedStartDate.value)

      // Si on clique avant la date de début, la remplacer
      if (clickedDate.isBefore(startDate, 'day')) {
        selectedStartDate.value = day.fullDate
        return
      }

      // Vérifier si la période est entièrement disponible
      if (isPeriodAvailable(selectedStartDate.value, day.fullDate)) {
        selectedEndDate.value = day.fullDate
      } else {
        // Si la période n'est pas disponible, recommencer la sélection
        selectedStartDate.value = day.fullDate
        selectedEndDate.value = null
      }
      return
    }

    // Si les deux dates sont sélectionnées, recommencer
    selectedStartDate.value = day.fullDate
    selectedEndDate.value = null
  }

  // Gérer le changement de mois
  const handleMonthChange = (date: Date) => {
    // Émettre l'événement si nécessaire pour des analytics
    console.log('Mois changé:', dayjs(date).format('MMMM YYYY'))
  }

  // Effacer la sélection
  const clearSelection = () => {
    selectedStartDate.value = null
    selectedEndDate.value = null
  }

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

  // Formatage des dates
  const formatDate = (date: Date) => {
    return dayjs(date).format('DD/MM/YYYY')
  }

  // Formatage du prix en Ariary
  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price) + ' Ar'
    )
  }
</script>
