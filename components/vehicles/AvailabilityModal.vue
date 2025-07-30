<template>
  <div>
    <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box max-w-4xl">
        <!-- En-tête avec croix pour fermer -->
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ vehicle ? `Disponibilités: ${vehicle.make} ${vehicle.model}` : 'Disponibilités' }}
          </h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </form>
        </div>

        <div class="divider my-2"></div>

        <!-- Chargement -->
        <div v-if="isLoading" class="py-4 flex items-center justify-center">
          <div class="loading loading-spinner loading-md"></div>
        </div>

        <!-- Contenu principal -->
        <div v-else class="py-2">
          <!-- Section d'ajout/modification (en premier) -->
          <div class="mb-6">
            <h4 class="font-semibold text-gray-700 mb-4">
              {{
                editingAvailabilityId
                  ? 'Modifier la période'
                  : 'Ajouter une période de disponibilité'
              }}
            </h4>

            <form
              id="availability-form"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
              @submit.prevent="
                editingAvailabilityId ? handleUpdateAvailability() : handleAddNewAvailability()
              "
            >
              <UiFormField label="Date de début" required>
                <input
                  v-model="newAvailability.start_date"
                  type="date"
                  class="input input-bordered w-full focus:outline-none"
                  :min="todayFormatted"
                  required
                  autocomplete="off"
                />
              </UiFormField>

              <UiFormField label="Date de fin" required>
                <input
                  v-model="newAvailability.end_date"
                  type="date"
                  class="input input-bordered w-full focus:outline-none"
                  :min="newAvailability.start_date || todayFormatted"
                  required
                  autocomplete="off"
                />
              </UiFormField>

              <!-- Message d'erreur -->
              <div v-if="error" class="md:col-span-2">
                <div class="alert alert-error">
                  <Icon name="mdi:alert-circle" class="w-5 h-5" />
                  <span>{{ error }}</span>
                </div>
              </div>

              <div class="md:col-span-2 flex justify-between">
                <!-- Bouton supprimer à gauche -->
                <button
                  v-if="editingAvailabilityId"
                  type="button"
                  class="btn btn-error btn-outline"
                  :disabled="isSubmitting || isDeleting === true"
                  @click="confirmDelete"
                >
                  <Icon v-if="isDeleting" name="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
                  <Icon v-else name="mdi:delete" class="w-4 h-4 mr-2" />
                  Supprimer
                </button>
                <div v-else></div>

                <!-- Boutons principaux à droite -->
                <div class="flex space-x-2">
                  <button
                    v-if="editingAvailabilityId"
                    type="button"
                    class="btn btn-outline"
                    @click="resetForm"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="
                      isSubmitting || !newAvailability.start_date || !newAvailability.end_date
                    "
                  >
                    <Icon
                      v-if="isSubmitting"
                      name="mdi:loading"
                      class="w-4 h-4 mr-2 animate-spin"
                    />
                    {{ editingAvailabilityId ? 'Modifier' : 'Ajouter' }}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Calendrier des disponibilités -->
          <div class="mt-6">
            <h4 class="font-semibold mb-4 text-gray-700">Calendrier des disponibilités</h4>

            <UiCalendar
              :marked-dates="markedDates"
              :selected-dates="selectedDates"
              :show-legend="true"
              :legend-items="legendItems"
              :disable-other-months="true"
              @day-click="handleCalendarDayClick"
            />

            <!-- État vide -->
            <div v-if="availabilities.length === 0" class="text-center p-8 text-gray-500">
              <Icon name="mdi:calendar-blank" class="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p class="text-lg font-medium mb-2">Aucune période de disponibilité</p>
              <p class="text-sm">Ajoutez votre première période ci-dessus pour commencer</p>
            </div>
          </div>
        </div>
      </div>
    </dialog>

    <!-- Modal de confirmation pour suppression -->
    <UiConfirmationModal
      modal-id="confirm-delete-availability"
      title="Supprimer la période"
      message="Êtes-vous sûr de vouloir supprimer cette période de disponibilité ? Cette action ne peut pas être annulée."
      :loading="isDeleting"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { useAvailabilities } from '~/composables/useAvailabilities'
  import { useBookings } from '~/composables/useBookings'
  import type { Vehicle, Availability, Booking } from '~/types'

  const props = defineProps<{
    modalId: string
    vehicle: Vehicle | null
  }>()

  const emit = defineEmits(['update'])

  // Composables
  const {
    availabilities,
    isLoading,
    fetchVehicleAvailabilities,
    addAvailability,
    deleteAvailability,
    isPeriodAvailable,
    updateAvailability
  } = useAvailabilities()

  const { fetchVehicleBookings } = useBookings()

  // État local
  const error = ref<string | null>(null)
  const isSubmitting = ref(false)
  const isDeleting = ref(false)
  const editingAvailabilityId = ref<string | null>(null)
  const vehicleBookings = ref<Booking[]>([])

  // Nouvelle disponibilité à ajouter
  const newAvailability = ref({
    start_date: '',
    end_date: ''
  })

  // Date du jour formatée pour l'attribut min des inputs date
  const todayFormatted = computed(() => {
    return dayjs().format('YYYY-MM-DD')
  })

  // Ajouter une nouvelle période de disponibilité
  const handleAddNewAvailability = async () => {
    if (!props.vehicle) return
    error.value = null
    isSubmitting.value = true

    try {
      // Vérifier que la date de fin est après la date de début avec Day.js
      const startDate = dayjs(newAvailability.value.start_date)
      const endDate = dayjs(newAvailability.value.end_date)

      if (endDate.isBefore(startDate)) {
        error.value = 'La date de fin doit être après la date de début'
        return
      }

      // Vérifier si la période ne chevauche pas une disponibilité existante
      if (!isPeriodAvailable(newAvailability.value.start_date, newAvailability.value.end_date)) {
        error.value = 'Cette période chevauche une disponibilité existante'
        return
      }

      const result = await addAvailability({
        vehicle_id: props.vehicle.id,
        start_date: newAvailability.value.start_date,
        end_date: newAvailability.value.end_date
      })

      if (result.success) {
        // Réinitialiser le formulaire
        newAvailability.value = {
          start_date: '',
          end_date: ''
        }
        error.value = null

        // Émettre un événement pour informer le parent
        emit('update')
      } else {
        error.value = "Erreur lors de l'ajout de la disponibilité"
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de la disponibilité:", err)
      error.value = 'Une erreur est survenue'
    } finally {
      isSubmitting.value = false
    }
  }

  // Confirmer la suppression d'une disponibilité
  //   const confirmDelete = (availability: Availability) => {
  //     if (!availability || !availability.id) return

  //     if (
  //       confirm(
  //         `Supprimer la période du ${formatDate(availability.start_date)} au ${formatDate(
  //           availability.end_date
  //         )} ?`
  //       )
  //     ) {
  //       deleteAvailabilityItem(availability.id)
  //     }
  //   }

  const updateAvailabilityItem = async (availability: Availability) => {
    if (!availability || !availability.id) return

    // Pré-remplir le formulaire avec les valeurs de la disponibilité sélectionnée
    newAvailability.value = {
      start_date: availability.start_date,
      end_date: availability.end_date
    }

    // Passer en mode modification
    editingAvailabilityId.value = availability.id
  }

  // Charger les disponibilités et réservations quand le véhicule change
  watch(
    () => props.vehicle,
    async newVehicle => {
      if (newVehicle?.id) {
        error.value = null
        await Promise.all([
          fetchVehicleAvailabilities(newVehicle.id),
          loadVehicleBookings(newVehicle.id)
        ])
      } else {
        availabilities.value = []
        vehicleBookings.value = []
      }
    },
    { immediate: true }
  )

  // Charger les réservations du véhicule
  const loadVehicleBookings = async (vehicleId: string) => {
    const { success, data } = await fetchVehicleBookings(vehicleId)
    if (success) {
      vehicleBookings.value = data
    }
  }

  // Réinitialiser le formulaire et les erreurs quand le modal s'ouvre
  watch(
    () => props.vehicle,
    () => {
      resetForm()
    }
  )

  // Réinitialiser le formulaire
  const resetForm = () => {
    newAvailability.value = {
      start_date: '',
      end_date: ''
    }
    editingAvailabilityId.value = null
    error.value = null
  }

  // Valider les dates d'une disponibilité avec Day.js
  const validateDates = (startDate: string, endDate: string) => {
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    if (end.isSameOrBefore(start)) {
      error.value = 'La date de fin doit être postérieure à la date de début'
      return false
    }
    return true
  }

  // Vérifier le chevauchement des périodes avec Day.js
  const validateNonOverlap = (startDate: string, endDate: string, excludeId: string) => {
    const isAvailable = isPeriodAvailable(startDate, endDate, excludeId)
    if (!isAvailable) {
      error.value = 'Cette période chevauche une autre période existante'
      return false
    }
    return true
  }

  // Mettre à jour une disponibilité existante
  const handleUpdateAvailability = async () => {
    if (
      !props.vehicle ||
      !editingAvailabilityId.value ||
      !newAvailability.value.start_date ||
      !newAvailability.value.end_date
    )
      return

    error.value = null
    isSubmitting.value = true

    try {
      // Valider les dates avec Day.js
      if (!validateDates(newAvailability.value.start_date, newAvailability.value.end_date)) {
        isSubmitting.value = false
        return
      }

      // Vérifier le chevauchement
      if (
        !validateNonOverlap(
          newAvailability.value.start_date,
          newAvailability.value.end_date,
          editingAvailabilityId.value
        )
      ) {
        isSubmitting.value = false
        return
      }

      // Mettre à jour la disponibilité
      const result = await updateAvailability(editingAvailabilityId.value, {
        vehicle_id: props.vehicle.id,
        start_date: newAvailability.value.start_date,
        end_date: newAvailability.value.end_date
      })

      if (result.success) {
        // Rafraîchir les disponibilités
        if (props.vehicle?.id) {
          await fetchVehicleAvailabilities(props.vehicle.id)
        }

        // Réinitialiser le formulaire
        resetForm()

        // Émettre un événement pour informer le parent
        emit('update')
      } else {
        error.value = 'Erreur lors de la mise à jour de la disponibilité'
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la disponibilité:', err)
      error.value = 'Une erreur est survenue'
    } finally {
      isSubmitting.value = false
    }
  }

  // Vérifier si une date est dans une période avec Day.js
  const isDateInPeriod = (date: Date, startDate: string, endDate: string): boolean => {
    const checkDate = dayjs(date).startOf('day')
    const start = dayjs(startDate).startOf('day')
    const end = dayjs(endDate).startOf('day')

    return checkDate.isBetween(start, end, null, '[]')
  }

  // Dates marquées pour le calendrier avec Day.js (disponibilités)
  const markedDates = computed(() => {
    const dates: Date[] = []
    availabilities.value.forEach(availability => {
      const start = dayjs(availability.start_date).startOf('day')
      const end = dayjs(availability.end_date).startOf('day')

      // Ajouter toutes les dates entre start et end avec Day.js
      let currentDate = start
      while (currentDate.isSameOrBefore(end)) {
        dates.push(currentDate.toDate())
        currentDate = currentDate.add(1, 'day')
      }
    })
    return dates
  })

  // Dates sélectionnées pour le calendrier (réservations)
  const selectedDates = computed(() => {
    const dates: Array<{ date: Date; type: 'start' | 'middle' | 'end' }> = []

    vehicleBookings.value.forEach(booking => {
      const start = dayjs(booking.start_date).startOf('day')
      const end = dayjs(booking.end_date).startOf('day')

      // Ajouter toutes les dates entre start et end
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
  })

  // Items de la légende
  const legendItems = [
    { label: 'Disponible', color: 'bg-green-500' },
    { label: 'Réservée', color: 'bg-primary/70' },
    { label: 'Ajouter/modifier', color: 'bg-gray-200' }
  ]

  // Obtenir les disponibilités pour un jour donné
  const getDayAvailabilities = (date: Date) => {
    return availabilities.value.filter(availability => {
      return isDateInPeriod(date, availability.start_date, availability.end_date)
    })
  }

  // Vérifier si une date est réservée
  const isDateBooked = (date: Date) => {
    return vehicleBookings.value.some(booking => {
      return isDateInPeriod(date, booking.start_date, booking.end_date)
    })
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

  // Ouvrir le modal de confirmation de suppression
  const confirmDelete = () => {
    if (!editingAvailabilityId.value) return

    // Ouvrir le modal de confirmation
    const modal = document.getElementById('confirm-delete-availability') as HTMLDialogElement
    if (modal) {
      modal.showModal()
    }
  }

  // Confirmer la suppression depuis le modal
  const handleConfirmDelete = async () => {
    await deleteCurrentAvailability()
    // Fermer le modal
    const modal = document.getElementById('confirm-delete-availability') as HTMLDialogElement
    if (modal) {
      modal.close()
    }
  }

  // Annuler la suppression
  const handleCancelDelete = () => {
    // Fermer le modal
    const modal = document.getElementById('confirm-delete-availability') as HTMLDialogElement
    if (modal) {
      modal.close()
    }
  }

  // Vérifier si une disponibilité a des réservations actives
  const hasActiveBookings = (availability: Availability) => {
    return vehicleBookings.value.some(booking => {
      const bookingStart = dayjs(booking.start_date)
      const bookingEnd = dayjs(booking.end_date)
      const availStart = dayjs(availability.start_date)
      const availEnd = dayjs(availability.end_date)

      // Vérifier si la réservation chevauche avec la disponibilité
      return bookingStart.isSameOrBefore(availEnd) && bookingEnd.isSameOrAfter(availStart)
    })
  }

  // Supprimer la disponibilité actuellement en édition
  const deleteCurrentAvailability = async () => {
    if (!editingAvailabilityId.value) return

    // Vérifier s'il y a des réservations actives
    const currentAvailability = availabilities.value.find(a => a.id === editingAvailabilityId.value)
    if (currentAvailability && hasActiveBookings(currentAvailability)) {
      error.value =
        'Impossible de supprimer cette disponibilité car elle contient des réservations actives'
      return
    }

    isDeleting.value = true
    try {
      const result = await deleteAvailability(editingAvailabilityId.value)
      if (result.success) {
        // Rafraîchir les données
        if (props.vehicle?.id) {
          await fetchVehicleAvailabilities(props.vehicle.id)
        }
        emit('update')

        // Réinitialiser le formulaire
        resetForm()
      } else {
        error.value = 'Erreur lors de la suppression de la disponibilité'
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      error.value = 'Une erreur est survenue lors de la suppression'
    } finally {
      isDeleting.value = false
    }
  }

  // Gérer le clic sur un jour du calendrier depuis le composant Calendar
  const handleCalendarDayClick = (day: CalendarDay) => {
    const dayAvailabilities = getDayAvailabilities(day.fullDate)
    const isBooked = isDateBooked(day.fullDate)

    // Ne pas permettre la modification si la date est réservée
    if (isBooked) {
      error.value = 'Impossible de modifier une période qui contient des réservations actives'
      return
    }

    if (dayAvailabilities.length > 0) {
      // Si le jour a une disponibilité, la modifier
      const availability = dayAvailabilities[0]
      if (availability) {
        // Vérifier si cette disponibilité a des réservations
        if (hasActiveBookings(availability)) {
          error.value =
            'Impossible de modifier cette disponibilité car elle contient des réservations actives'
          return
        }
        updateAvailabilityItem(availability)
      }
    } else {
      // Si le jour n'a pas de disponibilité, créer une nouvelle avec Day.js
      const dateStr = dayjs(day.fullDate).format('YYYY-MM-DD')

      newAvailability.value = {
        start_date: dateStr,
        end_date: dateStr
      }
      editingAvailabilityId.value = null
      error.value = null

      // Optionnel : faire défiler vers le formulaire sur mobile
      const form = document.getElementById('availability-form')
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
</script>
