<template>
  <div>
    <dialog :id="modalId" class="modal modal-bottom sm:modal-middle z-[9]">
      <div class="modal-box max-w-4xl">
        <!-- En-tête avec croix pour fermer -->
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">
            {{
              vehicle
                ? `Gestion des indisponibilités: ${vehicle.make} ${vehicle.model}`
                : 'Gestion des indisponibilités'
            }}
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
                  ? "Modifier la période d'indisponibilité"
                  : "Ajouter une période d'indisponibilité"
              }}
            </h4>

            <!-- Message d'avertissement pour la suppression -->
            <div v-if="editingAvailabilityId" class="alert alert-warning mb-4">
              <Icon name="mdi:alert" class="w-5 h-5" />
              <div>
                <h4 class="font-semibold">Attention !</h4>
                <p class="text-sm">
                  Vous pouvez modifier les dates ou supprimer définitivement cette période
                  d'indisponibilité. La suppression rendra votre véhicule disponible sur ces dates.
                </p>
              </div>
            </div>

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
                  @click="deleteCurrentAvailability"
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

            <!-- Affichage de la sélection en cours -->
            <div v-if="selectedStartDate && selectedEndDate" class="alert alert-success mb-4">
              <Icon name="mdi:calendar-check" class="w-5 h-5" />
              <div class="flex-1">
                <span class="text-sm">
                  <strong>Période sélectionnée:</strong>
                  {{ formatDate(selectedStartDate) }} -
                  {{ formatDate(selectedEndDate) }}
                </span>
                <button
                  type="button"
                  class="btn btn-ghost btn-xs ml-2"
                  @click="clearCalendarSelection"
                >
                  <Icon name="mdi:close" class="w-3 h-3" />
                  Effacer
                </button>
              </div>
            </div>

            <UiCalendar
              :marked-dates="markedDates"
              :selected-dates="currentSelectionDates"
              :booked-dates="bookedDatesForCalendar"
              :show-legend="true"
              :legend-items="legendItems"
              :disable-other-months="true"
              @day-click="handleCalendarDayClick"
              @month-change="handleMonthChange"
            />

            <!-- État vide -->
            <div v-if="ownerUnavailabilities.length === 0" class="text-center p-8 text-gray-500">
              <Icon name="mdi:calendar-check" class="w-12 h-12 mx-auto mb-4 text-green-400" />
              <p class="text-lg font-medium mb-2">Véhicule entièrement disponible</p>
              <p class="text-sm">
                Aucune période d'indisponibilité définie. Votre véhicule est disponible tous les
                jours!
              </p>
              <p class="text-xs mt-2 text-gray-400">
                Ajoutez une période d'indisponibilité ci-dessus si nécessaire
              </p>
            </div>
          </div>

          <!-- Section: Liste des périodes d'indisponibilité -->
          <VehiclesUnavailabilityList
            :unavailabilities="ownerUnavailabilities"
            :has-active-bookings-for-availability="hasActiveBookingsForAvailability"
            @edit="updateAvailabilityItem"
            @delete="confirmDeleteAvailability"
          />
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import type { CalendarDay } from '~/composables/useCalendarSelection'
  import type { Vehicle, Availability, Booking } from '~/types'

  // Composables factorisés
  const { formatDate, getTodayFormatted } = useCalendarDates()
  const {
    selectedStartDate,
    selectedEndDate,
    selectionError,
    _selectedStartDate,
    _selectedEndDate,
    handleDayClick,
    clearSelection,
    getDateUnavailabilities
  } = useCalendarSelection()
  const { validateDateRange, canAddPeriodWithoutConflict, hasActiveBookings } =
    useVehicleBookingValidation()

  const props = defineProps<{
    modalId: string
    vehicle: Vehicle | null
  }>()

  const emit = defineEmits(['update'])

  // Composables
  const {
    availabilities,
    isLoading,
    fetchVehicleUnavailabilities,
    addAvailability,
    deleteAvailability,
    updateAvailability
  } = useAvailabilities()

  const { fetchVehicleBookings } = useBookings()
  // Utilisation du composable pour les données du calendrier
  const availabilitiesRef = computed(() => availabilities.value)
  const vehicleBookingsRef = computed(() => vehicleBookings.value)

  const {
    markedDates,
    bookedDatesForCalendar,
    selectedDatesForCalendar: currentSelectionDates,
    legendItems
  } = useCalendarData({
    availabilities: availabilitiesRef,
    bookings: vehicleBookingsRef,
    selectedStartDate,
    selectedEndDate
  })

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
    return getTodayFormatted()
  })

  // Synchronisation bidirectionnelle entre inputs et sélection calendrier
  // Quand la sélection calendrier change, mettre à jour les inputs
  watch([selectedStartDate, selectedEndDate], ([newStart, newEnd]) => {
    if (newStart) {
      newAvailability.value.start_date = dayjs(newStart).format('YYYY-MM-DD')
    }
    if (newEnd) {
      newAvailability.value.end_date = dayjs(newEnd).format('YYYY-MM-DD')
    }
  })

  // Quand les inputs changent, mettre à jour la sélection calendrier
  watch(
    () => newAvailability.value.start_date,
    newStartDate => {
      if (newStartDate && dayjs(newStartDate).isValid()) {
        _selectedStartDate.value = dayjs(newStartDate).toDate()
      } else {
        _selectedStartDate.value = null
      }
    }
  )

  watch(
    () => newAvailability.value.end_date,
    newEndDate => {
      if (newEndDate && dayjs(newEndDate).isValid()) {
        _selectedEndDate.value = dayjs(newEndDate).toDate()
      } else {
        _selectedEndDate.value = null
      }
    }
  )

  // Ajouter une nouvelle période de disponibilité
  const handleAddNewAvailability = async () => {
    if (!props.vehicle) return
    error.value = null
    isSubmitting.value = true

    try {
      // Validation des dates
      const dateValidation = validateDateRange(
        newAvailability.value.start_date,
        newAvailability.value.end_date
      )
      if (!dateValidation.isValid) {
        error.value = dateValidation.error
        return
      }

      // Vérifier si la période ne chevauche pas une indisponibilité existante
      if (
        !canAddPeriodWithoutConflict(
          newAvailability.value.start_date,
          newAvailability.value.end_date,
          availabilities.value
        )
      ) {
        error.value = 'Cette période chevauche une indisponibilité existante'
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
        error.value = "Erreur lors de l'ajout de l'indisponibilité"
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'indisponibilité:", err)
      error.value = 'Une erreur est survenue'
    } finally {
      isSubmitting.value = false
    }
  }

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
          fetchVehicleUnavailabilities(newVehicle.id, true),
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
    clearSelection()
    error.value = null
  }

  // Effacer seulement la sélection calendrier
  const clearCalendarSelection = () => {
    clearSelection()
    error.value = null
  }

  // Validation des dates et chevauchements
  const validateDatesAndOverlap = (startDate: string, endDate: string, excludeId?: string) => {
    const dateValidation = validateDateRange(startDate, endDate)
    if (!dateValidation.isValid) {
      error.value = dateValidation.error
      return false
    }

    if (!canAddPeriodWithoutConflict(startDate, endDate, availabilities.value, excludeId)) {
      error.value = "Cette période chevauche une autre période d'indisponibilité existante"
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
      // Valider les dates et chevauchements
      if (
        !validateDatesAndOverlap(
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
        // Rafraîchir les disponibilités (futures uniquement)
        if (props.vehicle?.id) {
          await fetchVehicleUnavailabilities(props.vehicle.id, true)
        }

        // Réinitialiser le formulaire
        resetForm()

        // Émettre un événement pour informer le parent
        emit('update')
      } else {
        error.value = "Erreur lors de la mise à jour de l'indisponibilité"
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'indisponibilité:", err)
      error.value = 'Une erreur est survenue'
    } finally {
      isSubmitting.value = false
    }
  }

  // Computed pour filtrer les indisponibilités du propriétaire uniquement (pas les réservations)
  const ownerUnavailabilities = computed(() => {
    // Les availabilities contiennent déjà uniquement les indisponibilités définies par le propriétaire
    // (pas les réservations qui sont gérées séparément dans vehicleBookings)
    return availabilities.value
  })

  // Obtenir les indisponibilités pour un jour donné
  const getDayUnavailabilities = (date: Date) => {
    return getDateUnavailabilities(date, availabilities.value)
  }

  // Préparer la suppression depuis la liste (pré-remplit le formulaire)
  const confirmDeleteAvailability = (availability: Availability) => {
    if (!availability.id) return

    // Vérifier s'il y a des réservations actives
    if (hasActiveBookingsForAvailability(availability)) {
      error.value =
        'Impossible de supprimer cette indisponibilité car elle contient des réservations actives'
      return
    }

    // Pré-remplir le formulaire avec les données de l'indisponibilité à supprimer
    newAvailability.value = {
      start_date: availability.start_date,
      end_date: availability.end_date
    }

    // Passer en mode suppression
    editingAvailabilityId.value = availability.id

    // Effacer toute erreur précédente
    error.value = null
  }

  // Vérifier si une disponibilité a des réservations actives
  const hasActiveBookingsForAvailability = (availability: Availability) => {
    return hasActiveBookings(availability, vehicleBookings.value)
  }

  // Supprimer la disponibilité actuellement en édition
  const deleteCurrentAvailability = async () => {
    if (!editingAvailabilityId.value) return

    // Vérifier s'il y a des réservations actives
    const currentAvailability = availabilities.value.find(a => a.id === editingAvailabilityId.value)
    if (currentAvailability && hasActiveBookingsForAvailability(currentAvailability)) {
      error.value =
        'Impossible de supprimer cette indisponibilité car elle contient des réservations actives'
      return
    }

    isDeleting.value = true
    try {
      const result = await deleteAvailability(editingAvailabilityId.value)
      if (result.success) {
        // Rafraîchir les données (futures uniquement)
        if (props.vehicle?.id) {
          await fetchVehicleUnavailabilities(props.vehicle.id, true)
        }
        emit('update')

        // Réinitialiser le formulaire
        resetForm()
      } else {
        error.value = "Erreur lors de la suppression de l'indisponibilité"
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      error.value = 'Une erreur est survenue lors de la suppression'
    } finally {
      isDeleting.value = false
    }
  }

  // Gérer le changement de mois dans le calendrier
  const handleMonthChange = async (_newDate: Date) => {
    // Recharger les réservations pour le nouveau mois affiché
    if (props.vehicle?.id) {
      await loadVehicleBookings(props.vehicle.id)
    }
  }

  // Gérer le clic sur un jour du calendrier
  const handleCalendarDayClick = (day: CalendarDay) => {
    // Validation personnalisée pour les indisponibilités existantes
    const customValidation = (date: Date) => {
      // Si on clique sur une indisponibilité existante, la modifier
      const dayUnavailabilities = getDayUnavailabilities(date)
      if (dayUnavailabilities.length > 0) {
        const unavailability = dayUnavailabilities[0]
        if (unavailability && !hasActiveBookingsForAvailability(unavailability)) {
          updateAvailabilityItem(unavailability)
          return false // Arrêter le processus de sélection normal
        }
      }
      return true // Continuer le processus de sélection normal
    }

    // Utiliser le composable de sélection avec validation personnalisée
    handleDayClick(day, {
      bookings: vehicleBookings.value,
      unavailabilities: availabilities.value,
      allowPastDates: false,
      customValidation,
      onDateSelected: (_start, _end) => {
        // Synchroniser avec les erreurs locales si nécessaire
        if (selectionError.value) {
          error.value = selectionError.value
        }
      }
    })
  }
</script>
