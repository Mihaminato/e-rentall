<template>
  <div class="min-h-screen bg-base-100">
    <!-- Composant Toast pour les notifications -->
    <UiToast
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
      @close="toast.visible = false"
    />

    <!-- Navigation -->
    <div class="container mx-auto px-4 py-6">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <a @click="router.back()" class="link link-hover cursor-pointer">
              <Icon name="mdi:arrow-left" class="w-4 h-4 mr-1" />
              Retour
            </a>
          </li>
          <li v-if="vehicle">{{ vehicle.make }} {{ vehicle.model }}</li>
        </ul>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="container mx-auto px-4">
      <div class="flex justify-center items-center min-h-96">
        <div class="loading loading-spinner loading-lg"></div>
      </div>
    </div>

    <!-- État d'erreur -->
    <div v-else-if="error" class="container mx-auto px-4">
      <div class="alert alert-error">
        <Icon name="mdi:alert-circle" class="w-6 h-6" />
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Contenu principal -->
    <div v-else-if="vehicle" class="container mx-auto px-4 pb-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne principale - Photos et détails -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Galerie photos -->
          <VehiclesVehicleGallery
            :photos="vehiclePhotos"
            :vehicle-name="`${vehicle.make} ${vehicle.model}`"
            :selected-photo-index="selectedPhotoIndex"
            @select-photo="selectedPhotoIndex = $event"
            @open-modal="openImageModal"
          />

          <!-- Titre et bouton d'édition (pour propriétaire) -->
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h1 class="text-3xl font-bold mb-2">
                {{ vehicle.make }} {{ vehicle.model }} {{ vehicle.year }}
              </h1>
              <div class="flex items-center gap-4 text-base-content/70 mb-3">
                <span class="flex items-center gap-1">
                  <Icon name="mdi:map-marker" class="w-4 h-4" />
                  {{ vehicle.province }}
                </span>
              </div>

              <!-- Caractéristiques en badges -->
              <div class="flex flex-wrap gap-2">
                <!-- Transmission -->
                <div class="badge badge-accent badge-lg">
                  <Icon name="mdi:car-shift-pattern" class="w-4 h-4 mr-2" />
                  {{ vehicle.transmission === 'automatic' ? 'Auto' : 'Manuel' }}
                </div>

                <!-- Type de véhicule -->
                <div class="badge badge-accent badge-lg">
                  <Icon name="mdi:car" class="w-4 h-4 mr-2" />
                  {{ vehicle.vehicle_type }}
                </div>

                <!-- Places -->
                <div class="badge badge-accent badge-lg">
                  <Icon name="mdi:account-group" class="w-4 h-4 mr-2" />
                  {{ vehicle.seats }} places
                </div>

                <!-- N° d'immatriculation -->
                <div v-if="vehicle.license_plate" class="badge badge-accent badge-lg">
                  <Icon name="mdi:card-text" class="w-4 h-4 mr-2" />
                  {{ vehicle.license_plate }}
                </div>

                <!-- Carburant (si disponible) -->
                <div v-if="vehicle.fuel_type" class="badge badge-accent badge-lg">
                  <Icon name="mdi:gas-station" class="w-4 h-4 mr-2" />
                  {{ getFuelTypeLabel(vehicle.fuel_type) }}
                </div>

                <!-- Kilométrage (si disponible) -->
                <div v-if="vehicle.mileage" class="badge badge-accent badge-lg">
                  <Icon name="mdi:speedometer" class="w-4 h-4 mr-2" />
                  {{ formatMileage(vehicle.mileage) }}
                </div>

                <!-- Consommation (si disponible) -->
                <div v-if="vehicle.consumption" class="badge badge-accent badge-lg">
                  <Icon name="mdi:gas-station" class="w-4 h-4 mr-2" />
                  {{ vehicle.consumption }} L/100
                </div>
              </div>
            </div>

            <!-- Bouton d'édition et toggle actif (pour propriétaire) -->
            <div v-if="isOwner" class="flex items-center gap-3">
              <!-- Toggle Actif/Inactif -->
              <div class="form-control">
                <label class="flex items-center gap-2 select-none">
                  <span class="text-sm">{{ vehicle.is_active ? 'Actif' : 'Inactif' }}</span>
                  <Icon
                    :name="vehicle.is_active ? 'mdi:check-circle' : 'mdi:close-circle'"
                    :class="vehicle.is_active ? 'text-success' : 'text-error'"
                    class="w-4 h-4"
                  />
                </label>
              </div>

              <!-- Bouton d'édition -->
              <button class="btn btn-outline btn-sm" @click="navigateToEdit">
                <Icon name="mdi:pencil" class="w-4 h-4 mr-1" />
                Modifier
              </button>
            </div>
          </div>

          <!-- Séparateur -->
          <div class="divider my-8"></div>

          <!-- Description -->
          <div v-if="vehicle.description" class="card bg-base-100 shadow-lg">
            <div class="card-body">
              <h2 class="card-title mb-4">Description</h2>

              <!-- Mobile view with "Voir plus/moins" -->
              <div class="lg:hidden">
                <p class="text-base-content/80 leading-relaxed">
                  {{ isDescriptionExpanded ? vehicle.description : truncatedDescription }}
                </p>
                <div v-if="isDescriptionTruncated" class="card-actions justify-end">
                  <button class="btn btn-link btn-sm p-0" @click="toggleDescription">
                    {{ isDescriptionExpanded ? 'Voir moins' : 'Voir plus' }}
                    <Icon
                      :name="isDescriptionExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                      class="w-4 h-4 ml-1"
                    />
                  </button>
                </div>
              </div>

              <!-- Desktop view with full description -->
              <div class="hidden lg:block">
                <p class="text-base-content/80 leading-relaxed">{{ vehicle.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Prix et réservation OU Infos propriétaire -->
        <div class="space-y-6">
          <!-- Gestion du véhicule (pour le propriétaire) -->
          <VehiclesVehicleOwnerStats
            v-if="isOwner"
            :vehicle="vehicle"
            :bookings-count="ownerStats.bookingsCount"
            :bookings-active="ownerStats.bookingsActive"
            :total-revenue="ownerStats.totalRevenue"
            :monthly-revenue="ownerStats.monthlyRevenue"
            :average-rating="ownerStats.averageRating"
            :reviews-count="ownerStats.reviewsCount"
            :last-booking-date="ownerStats.lastBookingDate"
            @edit="navigateToEdit"
            @manage-availability="manageAvailability"
            @view-bookings="viewBookings"
            @edit-photos="editPhotos"
          />

          <!-- Calendrier des  disponibilités -->
          <VehiclesVehicleAvailabilityCalendar
            :availabilities="vehicle.availabilities || []"
            :price-per-day="vehicle.price_per_day"
            :is-owner="isOwner"
            :vehicle="vehicle"
            @manage-availability="manageAvailability"
            @reserve="openBookingModal"
            @booking-created="handleBookingCreated"
          />

          <!-- Informations du propriétaire (pour les visiteurs) -->
          <VehiclesVehicleOwnerInfo v-if="!isOwner && vehicle.owner" :vehicle="vehicle" />
        </div>
      </div>
    </div>

    <!-- Modal pour la galerie photos -->
    <UiImageModal
      :modal-id="`vehicle-gallery-modal-${vehicle?.id}`"
      :images="allPhotoUrls"
      :initial-index="selectedPhotoIndex"
    />

    <!-- Modal de réservation -->
    <VehiclesBookingModal
      ref="bookingModalRef"
      :vehicle="vehicle"
      @booking-created="handleBookingCreated"
      @validation-error="handleValidationError"
    />
  </div>
</template>

<script setup lang="ts">
  import { useVehicles } from '~/composables/useVehicles'
  import { useAuthStore } from '~/stores/auth'
  import type { Booking } from '~/types'
  import { FUEL_TYPE_OPTIONS } from '~/types'
  import type { SupabaseClient } from '@supabase/supabase-js'
  // Composables et stores
  const route = useRoute()
  const router = useRouter()
  const { vehicle, isLoading, error, fetchVehicleById } = useVehicles()
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const { user } = useAuthStore()

  // Données réactives
  const selectedPhotoIndex = ref(0)
  const isDescriptionExpanded = ref(false)
  const DESCRIPTION_TRUNCATE_LENGTH = 200

  // État pour les toasts
  const toast = ref({
    visible: false,
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  })

  // Référence à la modal de réservation
  const bookingModalRef = ref()

  // Computed pour déterminer si l'utilisateur est le propriétaire
  const isOwner = computed(() => {
    if (!vehicle.value || !user) return false
    return vehicle.value.owner_id === user.id
  })

  const truncatedDescription = computed(() => {
    if (!vehicle.value?.description) {
      return ''
    }
    if (vehicle.value.description.length > DESCRIPTION_TRUNCATE_LENGTH) {
      return `${vehicle.value.description.substring(0, DESCRIPTION_TRUNCATE_LENGTH)}...`
    }
    return vehicle.value.description
  })

  const isDescriptionTruncated = computed(() => {
    return (
      vehicle.value?.description && vehicle.value.description.length > DESCRIPTION_TRUNCATE_LENGTH
    )
  })

  const toggleDescription = () => {
    isDescriptionExpanded.value = !isDescriptionExpanded.value
  }

  // Photos du véhicule
  const vehiclePhotos = computed(() => {
    if (!vehicle.value?.vehicle_photos) return []
    return [...vehicle.value.vehicle_photos].sort(
      (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
    )
  })

  // Fonction pour obtenir l'URL publique d'une photo
  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage.from('cars').getPublicUrl(filePath)
    return data.publicUrl
  }

  // Toutes les URLs des photos pour la galerie
  const allPhotoUrls = computed(() => {
    return vehiclePhotos.value.map(photo => getPhotoUrl(photo.file_path))
  })

  // Fonctions utilitaires pour les caractéristiques
  const getFuelTypeLabel = (fuelType: string) => {
    const option = FUEL_TYPE_OPTIONS.find(opt => opt.value === fuelType)
    return option ? option.label : 'N/A'
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km'
  }

  // Statistiques du propriétaire (placeholder pour maintenant)
  const ownerStats = computed(() => ({
    bookingsCount: 0,
    bookingsActive: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    reviewsCount: 0,
    lastBookingDate: ''
  }))

  // Fonctions pour la réservation
  const openBookingModal = (reservationData?: {
    startDate: string
    endDate: string
    totalPrice: number
  }) => {
    if (!user) {
      // Rediriger vers la page de connexion si pas connecté
      showToast('Vous devez être connecté pour faire une réservation', 'warning')
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
      return
    }

    if (isOwner.value) {
      showToast('Vous ne pouvez pas réserver votre propre véhicule', 'warning')
      return
    }

    // Ouvrir la modal
    bookingModalRef.value?.openModal()
  }

  const handleBookingCreated = (booking: Booking) => {
    showToast('Votre réservation a été créée avec succès !', 'success')

    // Rediriger vers la page de détails de la réservation
    setTimeout(() => {
      router.push(`/bookings/${booking.id}`)
    }, 2000)
  }

  const handleValidationError = (error: string) => {
    showToast(error, 'error')
  }

  // Fonctions
  const openImageModal = (index: number) => {
    selectedPhotoIndex.value = index
    const modal = document.getElementById(
      `vehicle-gallery-modal-${vehicle.value?.id}`
    ) as HTMLDialogElement
    if (modal) {
      modal.showModal()
    }
  }

  const navigateToEdit = () => {
    router.push(`/vehicles/my-vehicles?edit=${vehicle.value?.id}`)
  }

  // Fonctions pour les actions du propriétaire
  const manageAvailability = () => {
    router.push(`/vehicles/my-vehicles?edit=${vehicle.value?.id}&tab=availability`)
  }

  const viewBookings = () => {
    router.push('/bookings')
  }

  const editPhotos = () => {
    router.push(`/vehicles/my-vehicles?edit=${vehicle.value?.id}`)
  }

  // Fonction pour afficher un toast avec fermeture automatique
  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    toast.value = {
      visible: true,
      message,
      type
    }

    // Fermeture automatique après 5 secondes
    setTimeout(() => {
      toast.value.visible = false
    }, 5000)
  }

  // Chargement des données
  onMounted(async () => {
    const vehicleId = route.params.id as string
    if (vehicleId) {
      await fetchVehicleById(vehicleId)
    }
  })

  // Meta pour SEO
  useHead({
    title: computed(() =>
      vehicle.value
        ? `${vehicle.value.make} ${vehicle.value.model} - Location de véhicule`
        : 'Détails du véhicule'
    ),
    meta: [
      {
        name: 'description',
        content: computed(() =>
          vehicle.value
            ? `Louez ce ${vehicle.value.make} ${vehicle.value.model} de ${vehicle.value.year} en ${vehicle.value.province} pour ${vehicle.value.price_per_day} Ar/jour`
            : 'Détails du véhicule de location'
        )
      }
    ]
  })
</script>
