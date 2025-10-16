<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Composant Toast pour les notifications   -->
    <UiToast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
      @close="toast.visible = false"
    />

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="alert alert-error shadow-lg">
      <div>
        <Icon name="mdi:alert-circle" class="w-6 h-6" />
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Contenu principal -->
    <div v-else-if="booking" class="max-w-6xl mx-auto">
      <!-- Header avec statut -->
      <div class="card bg-base-100 shadow-lg mb-6">
        <div class="card-body">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <div class="flex items-center gap-2">
                <!-- Bouton Retour -->
                <button class="btn btn-ghost" @click="$router.back()">
                  <Icon name="mdi:arrow-left" class="w-5 h-5" />
                </button>
                <h1 class="text-3xl font-bold">Détails de la réservation</h1>
              </div>
              <div class="flex items-center gap-2 text-base-content/70 ml-15">
                <span class="font-mono badge badge-outline">#{{ booking.id.slice(0, 8) }}</span>
                <span>·</span>
                <span>Créée le {{ formatDate(booking.created_at) }}</span>
              </div>
            </div>
            <div class="sm:text-right">
              <div
                class="badge badge-lg text-white text-sm font-semibold"
                :class="getStatusColor(booking.status)"
              >
                {{ getStatusLabel(booking.status) }}
              </div>
              <div class="text-sm text-base-content/70 mt-1">
                {{ formatPrice(booking.total_price) }}
              </div>
            </div>
          </div>

          <!-- Workflow d'approbation -->
          <div class="mt-6">
            <div class="steps steps-vertical sm:steps-horizontal w-full">
              <div
                class="step"
                :class="{
                  'step-primary': getCurrentStep() >= 1,
                  'step-error': booking.status === 'cancelled'
                }"
              >
                Demande
              </div>
              <div
                class="step"
                :class="{
                  'step-primary': getCurrentStep() >= 2,
                  'step-error': booking.status === 'cancelled'
                }"
              >
                Approbation Prop.
              </div>
              <div
                class="step"
                :class="{
                  'step-primary': getCurrentStep() >= 3,
                  'step-error': booking.status === 'cancelled'
                }"
              >
                Confirmation Admin
              </div>
              <div
                class="step"
                :class="{
                  'step-primary': getCurrentStep() >= 4,
                  'step-error opa': booking.status === 'cancelled'
                }"
              >
                Confirmé
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Informations du véhicule -->
        <div class="lg:col-span-2">
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h2 class="card-title mb-4">
                <Icon name="mdi:car" class="w-5 h-5" />
                Véhicule
              </h2>

              <div class="flex gap-4">
                <div class="avatar">
                  <div class="w-20 h-20 rounded-xl">
                    <img
                      :src="primaryPhotoUrl || 'https://placehold.co/200x200?text=Véhicule'"
                      :alt="`${booking.vehicle?.make} ${booking.vehicle?.model}`"
                    />
                  </div>
                </div>

                <div class="flex-1">
                  <h3 class="text-xl font-bold">
                    {{ booking.vehicle?.make }} {{ booking.vehicle?.model }}
                  </h3>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <div class="badge badge-outline">{{ booking.vehicle?.year }}</div>
                    <div class="badge badge-outline">{{ booking.vehicle?.transmission }}</div>
                    <div class="badge badge-outline">{{ booking.vehicle?.fuel_type }}</div>
                    <div class="badge badge-outline">{{ booking.vehicle?.seats }} places</div>
                  </div>
                  <div class="relative">
                    <div
                      class="overflow-hidden transition-all duration-300 ease-in-out sm:max-h-none"
                      :class="[isDescriptionExpanded ? 'max-h-screen' : 'max-h-14']"
                    >
                      <p class="mt-2 text-base-content/70">
                        {{ booking.vehicle?.description }}
                      </p>
                    </div>
                    <button
                      class="btn btn-link btn-xs p-0 sm:hidden"
                      @click="isDescriptionExpanded = !isDescriptionExpanded"
                    >
                      {{ isDescriptionExpanded ? 'Voir moins' : 'Voir plus' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Détails de la réservation -->
              <div class="divider"></div>
              <h3 class="text-lg font-semibold mb-3">Détails de la réservation</h3>

              <BookingsBookingDetailsGrid :booking="booking" />

              <BookingsRenterRequestDetails :booking="booking" />

              <!-- Notes -->
              <div v-if="ownerNoteText || booking.admin_notes" class="mt-4">
                <div class="divider"></div>
                <div v-if="ownerNoteText" class="mb-3">
                  <strong>Notes du propriétaire :</strong>
                  <p class="bg-base-200 p-3 rounded-lg mt-1">{{ ownerNoteText }}</p>
                </div>
                <div v-if="booking.admin_notes" class="mb-3">
                  <strong>Notes de l'admin :</strong>
                  <p class="bg-base-200 p-3 rounded-lg mt-1">{{ booking.admin_notes }}</p>
                </div>
              </div>

              <!-- Raison d'annulation -->
              <div
                v-if="booking.status === 'cancelled' && booking.cancellation_reason"
                class="mt-4"
              >
                <div class="divider"></div>
                <div class="alert alert-warning">
                  <Icon name="mdi:alert-circle" class="w-5 h-5" />
                  <div>
                    <strong>Raison de l'annulation :</strong>
                    <p class="mt-1">{{ booking.cancellation_reason }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profils utilisateurs -->
        <div class="space-y-6">
          <!-- Action : Terminer la réservation (pour le locataire) -->
          <div
            v-if="userRole === 'owner' && (booking.status as any) === 'pending_completion'"
            class="card bg-success text-success-content shadow-lg"
          >
            <div class="card-body">
              <h2 class="card-title">
                <Icon name="mdi:flag-checkered" class="w-6 h-6" />
                Terminer la réservation
              </h2>
              <p>
                Confirmez que vous avez bien restitué le véhicule pour finaliser cette location.
              </p>
              <div class="card-actions justify-end mt-4">
                <button
                  class="btn btn-neutral"
                  :disabled="isUpdating"
                  @click="handleCompleteBooking"
                >
                  <span v-if="isUpdating" class="loading loading-spinner"></span>
                  Confirmer et terminer
                </button>
              </div>
            </div>
          </div>

          <!-- Section Paiement acompte (pour le locataire) -->
          <div
            v-if="
              (userRole === 'renter' || userRole === 'admin') &&
              booking.status === 'owner_approved' &&
              !booking.is_deposit_paid
            "
            class="card bg-success text-success-content shadow-lg"
          >
            <div class="card-body">
              <h2 class="card-title">
                <Icon name="mdi:cash-check" class="w-6 h-6" />
                Paiement de l'acompte
              </h2>
              <p>
                Votre réservation a été approuvée par le propriétaire. Pour la confirmer
                définitivement, veuillez régler l'acompte.
              </p>
              <div class="my-2 text-center">
                <p class="text-lg">Montant de l'acompte :</p>
                <p class="text-3xl font-bold">{{ formatPrice(booking.deposit_amount || 0) }}</p>
                <p class="text-sm opacity-80">
                  (Soit nombre de jours {{ numberOfDays }} * 5000 Ar)
                </p>
              </div>
              <div class="card-actions justify-end">
                <button class="btn" :disabled="isLoading" @click="openDepositModal">
                  Payer l'acompte
                </button>
              </div>
            </div>
          </div>

          <!-- Section Attente de confirmation (pour le locataire) -->
          <div
            v-if="
              (userRole === 'renter' || userRole === 'admin') &&
              booking.status === 'owner_approved' &&
              booking.is_deposit_paid
            "
            class="card bg-info text-info-content shadow-lg"
          >
            <div class="card-body">
              <h2 class="card-title">
                <Icon name="mdi:clock-time-three-outline" class="w-6 h-6" />
                Vérification en cours
              </h2>
              <p>
                Merci ! Nous avons bien reçu votre soumission de paiement. L'administrateur va
                vérifier la transaction et confirmera votre réservation sous peu.
              </p>
              <p class="text-sm opacity-90 mt-4">
                En cas d'erreur ou sur demande de l'administrateur, vous pouvez soumettre une
                nouvelle référence de paiement.
              </p>
              <div class="card-actions justify-end mt-2">
                <button class="btn btn-sm" @click="openDepositModal">
                  <Icon name="mdi:pencil" class="w-4 h-4" />
                  Modifier la référence
                </button>
              </div>
            </div>
          </div>

          <!-- Profil du loueur (pour propriétaire et admin) -->
          <div v-if="userRole !== 'renter' && booking.renter">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="mdi:account" class="w-6 h-6" />
              Locataire
            </h2>
            <ProfileCard
              :first-name="booking.renter.first_name"
              :last-name="booking.renter.last_name"
              :email="booking.renter.email"
              :profile-image-url="booking.renter.avatar_url"
              :is-verified="booking.renter.is_verified"
              :phone="booking.renter.phone"
              :address="booking.renter.address"
              :city="booking.renter.city"
              :postal-code="booking.renter.postal_code"
              :public-view="true"
              :is-admin="isAdmin"
              :member-since="formatDate(booking.renter.created_at)"
            />
          </div>

          <!-- Profil du propriétaire (pour loueur et admin) -->
          <div v-if="userRole !== 'owner' && booking.vehicle?.owner">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="mdi:account-tie" class="w-6 h-6" />
              Propriétaire
            </h2>
            <ProfileCard
              :first-name="booking.vehicle.owner.first_name"
              :last-name="booking.vehicle.owner.last_name"
              :email="booking.vehicle.owner.email"
              :profile-image-url="booking.vehicle.owner.avatar_url"
              :is-verified="booking.vehicle.owner.is_verified"
              :phone="booking.vehicle.owner.phone"
              :address="booking.vehicle.owner.address"
              :city="booking.vehicle.owner.city"
              :postal-code="booking.vehicle.owner.postal_code"
              :public-view="true"
              :is-admin="isAdmin"
              :member-since="formatDate(booking.vehicle.owner.created_at)"
            />
          </div>

          <!-- Actions selon le rôle -->
          <div class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h2 class="card-title mb-4">
                <Icon name="mdi:cog" class="w-5 h-5" />
                Actions
              </h2>

              <div class="space-y-3">
                <!-- Actions pour le propriétaire -->
                <div v-if="userRole === 'owner' && booking.status === 'pending'">
                  <button
                    class="btn btn-success btn-block"
                    :disabled="isUpdating"
                    @click="approveBooking"
                  >
                    <span v-if="isUpdating" class="loading loading-spinner"></span>
                    <Icon v-else name="mdi:check" class="w-4 h-4" />
                    <span v-if="!isUpdating">Approuver le locataire</span>
                  </button>
                </div>
                <div
                  v-if="
                    userRole === 'owner' &&
                    (booking.status === 'owner_approved' || booking.status === 'active')
                  "
                >
                  <button
                    class="btn btn-warning btn-block btn-outline"
                    :disabled="
                      isUpdating ||
                      ['active', 'owner_approved', 'confirmed'].includes(booking.status)
                    "
                    @click="handleRevertToPending"
                  >
                    <span v-if="isUpdating" class="loading loading-spinner"></span>
                    <Icon v-else name="mdi:arrow-left" class="w-4 h-4" />
                    <span v-if="!isUpdating">Annuler l'approbation</span>
                  </button>
                </div>

                <!-- Actions pour l'admin -->
                <div
                  v-if="
                    userRole === 'admin' &&
                    booking.status === 'owner_approved' &&
                    booking.is_deposit_paid
                  "
                  class="flex flex-col gap-2"
                >
                  <button
                    class="btn btn-primary btn-block"
                    :disabled="isUpdating"
                    @click="handleAdminConfirm"
                  >
                    <Icon name="mdi:check-all" class="w-4 h-4" />
                    Confirmer le paiement et la réservation
                  </button>
                  <button
                    class="btn btn-warning btn-block btn-outline"
                    :disabled="isUpdating"
                    @click="handleRequestNewReference"
                  >
                    <Icon name="mdi:email-sync-outline" class="w-4 h-4" />
                    Demander une nouvelle référence
                  </button>
                </div>
                <div v-if="userRole === 'admin'">
                  <button
                    class="btn btn-warning btn-block btn-outline"
                    :disabled="isUpdating || booking.status === 'active'"
                    @click="handleRevertToOwnerApproved"
                  >
                    <Icon name="mdi:arrow-left" class="w-4 h-4" />
                    Revenir à 'Approbation propriétaire'
                  </button>
                </div>

                <!-- Actions communes -->
                <div v-if="canCancel">
                  <button class="btn btn-error btn-block" @click="showCancelModal = true">
                    <Icon name="mdi:cancel" class="w-4 h-4" />
                    Annuler la réservation
                  </button>
                </div>

                <!-- Messages -->
                <!-- <NuxtLink :to="`/messages?booking=${booking.id}`" class="btn btn-outline btn-block">
                  <Icon name="mdi:message" class="w-4 h-4" />
                  Messages
                </NuxtLink> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de paiement de l'acompte (pour le locataire) -->
    <dialog ref="depositModalRef" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Payer l'acompte</h3>
        <div class="py-4">
          <p>
            Veuillez effectuer votre paiement sur le numéro ci-dessous, puis entrez le numéro de
            téléphone de l'envoyeur pour confirmer.
          </p>
          <div class="my-3 p-3 bg-base-200 rounded-lg text-center font-mono text-lg">
            (+261) 38 29 118 97: ERENTAL (M-Vola)
          </div>
        </div>
        <!-- Champ numéro de téléphone avec validation -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Numéro de l'envoyeur</span>
          </label>

          <div class="input-group">
            <span class="input-group-text bg-base-200 text-base-content font-mono">+261</span>
            <input
              v-model="renterPaymentReference"
              type="tel"
              placeholder="34 00 123 45"
              class="input input-bordered w-full focus:outline-none focus:border-primary"
              :class="{ 'input-error': phoneValidationError }"
              maxlength="9"
              @input="validatePhoneNumber"
              @blur="validatePhoneNumber"
            />
          </div>
          <label v-if="phoneValidationError" class="label">
            <span class="label-text-alt text-error">{{ phoneValidationError }}</span>
          </label>
          <label v-else class="label">
            <span class="label-text-alt text-base-content/70"
              >Format: 34 00 123 45 (9 chiffres)</span
            >
          </label>
        </div>
        <div class="modal-action">
          <button
            class="btn btn-primary"
            :disabled="!isPaymentFormValid || isUpdating"
            @click="handlePayDeposit"
          >
            <span v-if="isUpdating" class="loading loading-spinner"></span>
            <Icon v-else name="mdi:cash-check" class="w-4 h-4" />
            <span v-if="!isUpdating">Confirmer le paiement</span>
          </button>
          <button class="btn btn-ghost" autofocus @click="closeDepositModal">Annuler</button>
        </div>
      </div>
    </dialog>

    <!-- Modal d'annulation -->
    <dialog :open="showCancelModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Annuler la réservation</h3>
        <UiFormField label="Raison de l'annulation (optionnel)">
          <textarea
            v-model="cancelReason"
            class="textarea textarea-bordered w-full focus-within:outline-none focus-within:border-primary"
            placeholder="Expliquez pourquoi vous annulez cette réservation..."
            rows="3"
          ></textarea>
        </UiFormField>
        <div class="modal-action">
          <button class="btn btn-error" :disabled="isUpdating" @click="handleCancelBooking">
            <span v-if="isUpdating" class="loading loading-spinner"></span>
            <Icon v-else name="mdi:cancel" class="w-4 h-4" />
            <span v-if="!isUpdating">Confirmer l'annulation</span>
          </button>
          <button class="btn btn-ghost" :disabled="isUpdating" @click="showCancelModal = false">
            Annuler
          </button>
        </div>
      </div>
    </dialog>

    <!-- Modale de confirmation pour la finalisation -->
    <UiConfirmationModal
      :visible="isCompleteModalVisible"
      title="Finaliser la réservation"
      message="Êtes-vous sûr de vouloir marquer cette réservation comme terminée ? Cette action est irréversible."
      confirm-text="Oui, terminer"
      :loading="isUpdating"
      @confirm="executeCompletion"
      @cancel="isCompleteModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from '~/types'
  import type { SupabaseClient } from '@supabase/supabase-js'

  definePageMeta({
    middleware: 'auth'
  })

  // --- Initialisation ---
  const route = useRoute()
  const bookingId = route.params.id as string
  const supabase = useNuxtApp().$supabase as SupabaseClient

  // --- Composables et Stores ---
  const {
    fetchBookingById,
    setBookingDeposit,
    payDepositWithReference,
    confirmBookingByAdmin,
    cancelBooking,
    revertBookingToPending,
    revertBookingToOwnerApproved,
    completeBooking,
    requestNewPaymentReference,
    isLoading,
    isUpdating,
    error,
    booking
  } = useBookings()
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)
  const isAdmin = computed(() => authStore.isAdmin)
  // --- État Local ---
  const isDescriptionExpanded = ref(false)
  const showCancelModal = ref(false)
  const cancelReason = ref('')
  const depositModalRef = ref<HTMLDialogElement | null>(null)
  const renterPaymentReference = ref('')
  const phoneValidationError = ref('')
  const isCompleteModalVisible = ref(false)
  const toast = ref({
    visible: false,
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  })

  const numberOfDays = computed(() => {
    if (!booking.value) return 0
    return calculateDurationInDays(booking.value.start_date, booking.value.end_date)
  })

  // --- Propriétés Calculées ---
  const primaryPhotoUrl = computed(() => {
    if (!booking.value?.vehicle?.vehicle_photos?.length) {
      return booking.value?.vehicle?.image_url || null
    }
    const primary = booking.value.vehicle.vehicle_photos.find(p => p.is_primary)
    const photo = primary || booking.value.vehicle.vehicle_photos[0]
    if (photo?.file_path) {
      const { data } = supabase.storage.from('cars').getPublicUrl(photo.file_path)
      return data.publicUrl
    }
    return null
  })

  const userRole = computed(() => {
    if (!user.value || !booking.value) return 'guest'
    if (authStore.isAdmin) return 'admin'
    if (booking.value.vehicle?.owner_id === user.value.id) return 'owner'
    if (booking.value.renter_id === user.value.id) return 'renter'
    return 'guest'
  })

  const canCancel = computed(() => {
    if (!booking.value) return false
    if (userRole.value === 'admin') return true
    const status = booking.value.status
    const validStatuses = ['pending', 'owner_approved', 'confirmed']
    return validStatuses.includes(status)
  })

  const ownerNoteText = computed(() => {
    if (!booking.value?.owner_notes) return null
    try {
      const details = JSON.parse(booking.value.owner_notes)
      if (typeof details === 'object' && details !== null && 'destination' in details) return null
    } catch (e) {
      return booking.value.owner_notes
    }
    return booking.value.owner_notes
  })

  // Validation du formulaire de paiement
  const isPaymentFormValid = computed(() => {
    return renterPaymentReference.value.trim() && !phoneValidationError.value
  })

  // --- Fonctions d'aide ---
  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    toast.value = { visible: true, message, type }
    setTimeout(() => {
      toast.value.visible = false
    }, 5000)
  }

  const formatDate = (date: string | undefined) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }

  const getStatusLabel = (status: string) =>
    BOOKING_STATUS_LABELS[status as keyof typeof BOOKING_STATUS_LABELS] || status
  const getStatusColor = (status: string) =>
    BOOKING_STATUS_COLORS[status as keyof typeof BOOKING_STATUS_COLORS] || 'badge-ghost'

  // Validation du numéro de téléphone
  const validatePhoneNumber = () => {
    const phoneNumber = renterPaymentReference.value.trim()

    // Vérifier si le champ est vide
    if (!phoneNumber) {
      phoneValidationError.value = 'Le numéro de téléphone est requis'
      return false
    }

    // Supprimer tous les espaces et caractères non numériques
    const cleanNumber = phoneNumber.replace(/\s/g, '').replace(/\D/g, '')

    // Vérifier la longueur exacte (9 chiffres)
    if (cleanNumber.length !== 9) {
      phoneValidationError.value = 'Le numéro doit contenir exactement 9 chiffres'
      return false
    }

    // Vérifier que c'est bien un numéro malgache valide (commence par 3)
    if (!cleanNumber.startsWith('3')) {
      phoneValidationError.value = 'Le numéro doit commencer par 3'
      return false
    }

    // Formater le numéro pour l'affichage
    const formattedNumber = cleanNumber.replace(/(\d{2})(\d{2})(\d{3})(\d{2})/, '$1 $2 $3 $4')
    renterPaymentReference.value = formattedNumber

    // Pas d'erreur
    phoneValidationError.value = ''
    return true
  }

  const getCurrentStep = () => {
    if (!booking.value) return 0
    if (booking.value.status === 'cancelled') return 0

    switch (booking.value.status) {
      case 'pending':
        return 1
      case 'owner_approved':
        return booking.value.is_deposit_paid ? 3 : 2
      case 'confirmed':
      case 'active':
      case 'pending_completion':
      case 'completed':
        return 4
      default:
        return 0
    }
  }

  // --- Actions ---
  const approveBooking = async () => {
    if (!booking.value) return
    const numberOfDays = calculateDurationInDays(booking.value.start_date, booking.value.end_date)
    const result = await setBookingDeposit(
      booking.value.id,
      booking.value.total_price,
      numberOfDays
    )
    if (result.success) await fetchBookingById(bookingId)
  }

  const handleAdminConfirm = async () => {
    if (!booking.value) return
    const result = await confirmBookingByAdmin(booking.value.id)
    if (result.success) {
      showToast('Réservation confirmée et activée avec succès.', 'success')
      await fetchBookingById(bookingId)
    } else {
      showToast('Erreur lors de la confirmation de la réservation.', 'error')
    }
  }

  const openDepositModal = () => {
    renterPaymentReference.value = ''
    depositModalRef.value?.showModal()
  }

  const closeDepositModal = () => depositModalRef.value?.close()

  const handlePayDeposit = async () => {
    if (!booking.value || !renterPaymentReference.value.trim()) return
    const result = await payDepositWithReference(booking.value.id, renterPaymentReference.value)
    if (result.success) {
      closeDepositModal()
      showToast('Votre paiement a été soumis et est en cours de vérification.', 'success')
      await fetchBookingById(bookingId)
    } else {
      showToast('Erreur lors de la soumission du paiement.', 'error')
    }
  }

  const handleCancelBooking = async () => {
    if (!booking.value || !user.value) return
    const result = await cancelBooking(booking.value.id, user.value.id, cancelReason.value)
    if (result.success) {
      showCancelModal.value = false
      cancelReason.value = ''
      await fetchBookingById(bookingId)
    }
  }

  const handleRevertToPending = async () => {
    if (!booking.value) return
    const result = await revertBookingToPending(booking.value.id)
    if (result.success) await fetchBookingById(bookingId)
  }

  const handleRevertToOwnerApproved = async () => {
    if (!booking.value) return
    const result = await revertBookingToOwnerApproved(booking.value.id)
    if (result.success) await fetchBookingById(bookingId)
  }

  const handleRequestNewReference = async () => {
    if (!booking.value) return
    const result = await requestNewPaymentReference()
    if (result.success) {
      showToast('Un e-mail de relance a été envoyé au locataire.', 'success')
    } else {
      showToast(result.error || 'Erreur lors de l_envoi de l_e-mail de relance.', 'error')
    }
  }

  const handleCompleteBooking = () => {
    isCompleteModalVisible.value = true
  }

  const executeCompletion = async () => {
    if (!booking.value) {
      isCompleteModalVisible.value = false
      return
    }
    const { success } = await completeBooking(booking.value.id)
    isCompleteModalVisible.value = false
    if (success) {
      await fetchBookingById(bookingId)
      showToast('Réservation terminée ! La location a été marquée comme finalisée.', 'success')
    } else {
      showToast('Une erreur est survenue lors de la finalisation de la réservation.', 'error')
    }
  }

  // --- Cycle de vie ---
  onMounted(async () => {
    await fetchBookingById(bookingId)
  })
</script>
