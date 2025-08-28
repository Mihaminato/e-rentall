<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <!-- 
      On utilise flexbox pour structurer le modal :
      - En-tête fixe
      - Contenu qui grandit et défile (flex-grow)
      - Pied de page fixe
      max-h-[90vh] empêche le modal de devenir trop grand sur les écrans de bureau.
    -->
    <div class="modal-box flex max-h-[90vh] flex-col p-0">
      <!-- En-tête (non défilable) -->
      <div class="flex-shrink-0 p-6 pb-4">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">✕</button>
        </form>
        <h3 class="text-xl font-bold">
          <Icon name="mdi:calendar-check" class="mr-2 inline h-5 w-5" />
          Réserver ce véhicule
        </h3>
      </div>

      <!-- Contenu principal défilable -->
      <div class="flex-grow overflow-y-auto px-6">
        <!-- Informations du véhicule -->
        <div class="card bg-base-200 mb-6">
          <div class="card-body p-4">
            <div class="flex gap-3">
              <div>
                <h4 class="text-lg font-semibold">{{ vehicle?.make }} {{ vehicle?.model }}</h4>
                <!-- flex-wrap est conservé pour la réactivité des badges sur mobile -->
                <div class="mt-1 flex flex-wrap gap-2">
                  <div class="badge badge-outline badge-sm">{{ vehicle?.year }}</div>
                  <div class="badge badge-outline badge-sm">{{ vehicle?.transmission }}</div>
                  <div class="badge badge-outline badge-sm">
                    <Icon name="mdi:user-group" class="inline h-4 w-4" />
                    {{ vehicle?.seats }}
                  </div>
                  <div class="badge badge-outline badge-sm">
                    {{ vehicle?.price_per_day }} Ar/jour
                  </div>
                  <div class="badge badge-outline badge-sm">{{ vehicle?.vehicle_type }}</div>
                </div>
                <p class="text-sm text-base-content/70 mt-1">{{ vehicle?.province }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulaire de réservation -->
        <div class="space-y-4">
          <!-- Période sélectionnée -->
          <div class="grid grid-cols-2 gap-4">
            <UiFormInput
              v-model="formData.startDate"
              label="Date de début"
              type="date"
              :min="getTodayDate()"
              required
            />
            <UiFormInput
              v-model="formData.endDate"
              label="Date de fin"
              type="date"
              :min="formData.startDate || getTodayDate()"
              required
            />
          </div>

          <!-- Destination -->
          <UiFormInput
            v-model="formData.destination"
            label="Destination / Lieu d'utilisation"
            placeholder="Ex: Analamahitsy, Morondava, Excursion..."
            required
          />

          <!-- Type de location -->
          <UiFormSelect
            v-model="formData.locationType"
            label="Type de location"
            :options="locationTypeOptions"
            required
          />

          <!-- Nombre de personnes -->
          <UiFormInput
            v-model.number="formData.numberOfPeople"
            label="Nombre de passagers"
            type="number"
            :max="vehicle?.seats - 1"
            min="1"
            required
            :error="formErrors.numberOfPeople"
          >
            <template #alt> Maximum {{ vehicle?.seats - 1}} places pour ce véhicule </template>
          </UiFormInput>

          <!-- Commentaires  -->
          <UiFormField label="Description de votre reservation">
            <p class="text-sm text-base-content/70 mt-1">Point de départ, Heure de départ, Etat de la route, Autres demandes specifiques...</p>
            <textarea
              v-model="formData.comments"
              placeholder="Point de départ, Heure de départ, Etat de la route, autres demandes specifiques..."
              class="textarea textarea-bordered w-full focus-within:border-primary focus-within:outline-none"
              rows="3"
              required
            ></textarea>
          </UiFormField>
        </div>

        <!-- Récapitulatif -->
        <div v-if="isFormValid" class="card bg-primary/10 border-primary/20 mt-6 border">
          <div class="card-body p-4">
            <h4 class="mb-3 text-lg font-semibold">
              <Icon name="mdi:clipboard-text" class="mr-2 inline h-5 w-5" />
              Récapitulatif de votre réservation
            </h4>

            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <strong>Période :</strong><br />
                Du {{ formatDate(formData.startDate) }}<br />
                Au {{ formatDate(formData.endDate) }}
              </div>
              <div>
                <strong>Durée :</strong><br />
                {{ duration }} jour{{ duration > 1 ? 's' : '' }}
              </div>
              <div>
                <strong>Destination :</strong><br />
                {{ formData.destination }}
              </div>
              <div>
                <strong>Type :</strong><br />
                {{ getLocationTypeLabel(formData.locationType) }}
              </div>
              <div>
                <strong>Personnes :</strong><br />
                {{ formData.numberOfPeople }} / {{ vehicle?.seats - 1}} places
              </div>
              <div>
                <strong>Prix par jour :</strong><br />
                {{ formatPrice(vehicle?.price_per_day || 0) }}
              </div>
            </div>

            <div class="divider my-3"></div>

            <div class="flex items-center justify-between text-lg font-bold">
              <span>Prix total :</span>
              <span class="text-primary">{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pied de page (non défilable) -->
      <div class="flex-shrink-0 p-4 mt-4">
        <!-- Messages d'erreur -->
        <div v-if="validationError" class="alert alert-error mb-3">
          <Icon name="mdi:alert-circle" class="h-5 w-5" />
          <span>{{ validationError }}</span>
        </div>

        <!-- Actions -->
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <form method="dialog" class="w-full sm:w-auto">
            <button class="btn btn-ghost w-full sm:w-auto" :disabled="isLoading">Annuler</button>
          </form>
          <button
            type="button"
            class="btn btn-primary w-full sm:w-auto"
            :disabled="!isFormValid || isLoading || validationError.length > 0"
            @click="handleSubmit"
          >
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <Icon v-else name="mdi:check" class="h-4 w-4" />
            {{ isLoading ? 'Création...' : 'Confirmer la réservation' }}
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { useBookings } from '~/composables/useBookings'
  import type { Vehicle, Booking } from '~/types'
  import { useAuthStore } from '~/stores/auth'

  interface Props {
    vehicle: Vehicle | null
    initialStartDate?: string
    initialEndDate?: string
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    bookingCreated: [booking: Booking]
    validationError: [error: string]
  }>()

  // Composables
  const { createBooking, validateBookingAvailability, isLoading } = useBookings()
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)

  // Refs
  const modalRef = ref<HTMLDialogElement>()
  const formErrors = ref({
    numberOfPeople: ''
  })

  // État du formulaire
  const formData = ref({
    startDate: props.initialStartDate || '',
    endDate: props.initialEndDate || '',
    destination: '',
    locationType: '',
    numberOfPeople: 1,
    comments: ''
  })

  // État de validation
  const validationError = ref('')

  // Computed
  const duration = computed(() => {
    return calculateDurationInDays(formData.value.startDate, formData.value.endDate)
  })

  const totalPrice = computed(() => {
    if (!props.vehicle?.price_per_day || duration.value === 0) return 0
    return duration.value * props.vehicle.price_per_day
  })

  const isFormValid = computed(() => {
    return (
      formData.value.startDate &&
      formData.value.endDate &&
      formData.value.destination.trim() &&
      formData.value.locationType &&
      formData.value.numberOfPeople > 0 &&
      formData.value.numberOfPeople <= (props.vehicle?.seats || 0) - 1 &&
      formData.value.comments.trim() &&
      duration.value > 0
    )
  })

  // Watchers pour validation en temps réel
  watch([() => formData.value.startDate, () => formData.value.endDate], async () => {
    validationError.value = ''

    if (formData.value.startDate && formData.value.endDate && props.vehicle) {
      const validation = await validateBookingAvailability(
        props.vehicle.id,
        formData.value.startDate,
        formData.value.endDate
      )

      if (validation.success && validation.validation && !validation.validation.is_available) {
        validationError.value = validation.validation.message
      }
    }
  })

  watch(
    () => formData.value.numberOfPeople,
    newValue => {
      if (props.vehicle && newValue > props.vehicle.seats - 1) {
        formErrors.value.numberOfPeople = `Le maximum est de ${props.vehicle.seats - 1} personnes.`
      } else {
        formErrors.value.numberOfPeople = ''
      }
    }
  )

  // Méthodes
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }

  const getLocationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      tourisme: 'Tourisme / Loisir',
      professionnel: 'Professionnel',
      transport: 'Transport de personnes',
      demenagement: 'Déménagement',
      mariage: 'Mariage / Événement',
      urgence: 'Urgence médicale',
      autre: 'Autre'
    }
    return labels[type] || type
  }

  const locationTypeOptions = [
    { value: '', label: 'Sélectionnez un type' },
    { value: 'tourisme', label: 'Tourisme / Loisir' },
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'transport', label: 'Transport de personnes' },
    { value: 'demenagement', label: 'Déménagement' },
    { value: 'mariage', label: 'Mariage / Événement' },
    { value: 'urgence', label: 'Urgence médicale' },
    { value: 'autre', label: 'Autre' }
  ]

  const handleSubmit = async () => {
    if (!isFormValid.value || !props.vehicle || !user.value) return

    try {
      // Valider une dernière fois
      const validation = await validateBookingAvailability(
        props.vehicle.id,
        formData.value.startDate,
        formData.value.endDate
      )

      if (!validation.success || !validation.validation?.is_available) {
        validationError.value = validation.validation?.message || 'Période non disponible'
        emit('validationError', validationError.value)
        return
      }

      // Créer la réservation
      const bookingData = {
        vehicle_id: props.vehicle.id,
        renter_id: user.value.id,
        start_date: formData.value.startDate,
        end_date: formData.value.endDate,
        total_price: totalPrice.value,
        status: 'pending' as const,
        // Stocker les informations additionnelles dans owner_notes temporairement
        // (on pourrait créer une table séparée pour ces détails)
        owner_notes: JSON.stringify({
          destination: formData.value.destination,
          locationType: formData.value.locationType,
          numberOfPeople: formData.value.numberOfPeople,
          comments: formData.value.comments
        })
      }

      const result = await createBooking(bookingData)

      if (result.success && result.booking) {
        emit('bookingCreated', result.booking)
        modalRef.value?.close()

        // Réinitialiser le formulaire
        formData.value = {
          startDate: '',
          endDate: '',
          destination: '',
          locationType: '',
          numberOfPeople: 1,
          comments: ''
        }
      } else {
        validationError.value = result.error || 'Erreur lors de la création de la réservation'
        emit('validationError', validationError.value)
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      validationError.value = "Une erreur inattendue s'est produite"
      emit('validationError', validationError.value)
    }
  }

  // Méthodes exposées
  const openModal = () => {
    modalRef.value?.showModal()
  }

  const closeModal = () => {
    modalRef.value?.close()
  }

  // Mettre à jour les dates initiales si les props changent
  watch([() => props.initialStartDate, () => props.initialEndDate], () => {
    if (props.initialStartDate) formData.value.startDate = props.initialStartDate
    if (props.initialEndDate) formData.value.endDate = props.initialEndDate
  })

  defineExpose({
    openModal,
    closeModal
  })
</script>
