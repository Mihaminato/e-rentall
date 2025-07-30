<!-- Page de gestion des réservations de l'utilisateur -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Mes locations</h1>

    <!-- Tabs pour les différentes catégories de réservations -->
    <div role="tablist" class="tabs tabs-bordered mb-6">
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active': activeTab === 'pending' }"
        @click="changeTab('pending')"
      >
        En cours
        <div v-if="pendingCount > 0" class="badge badge-info ml-2">{{ pendingCount }}</div>
      </a>
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active': activeTab === 'completed' }"
        @click="changeTab('completed')"
      >
        Passées
        <div v-if="completedCount > 0" class="badge badge-success ml-2">{{ completedCount }}</div>
      </a>
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active': activeTab === 'cancelled' }"
        @click="changeTab('cancelled')"
      >
        Annulées
        <div v-if="cancelledCount > 0" class="badge badge-error ml-2">{{ cancelledCount }}</div>
      </a>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex justify-center my-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="error" class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Aucune réservation -->
    <div v-else-if="bookings.length === 0" class="card bg-base-100 shadow-lg">
      <div class="card-body text-center py-12">
        <h2 class="text-2xl font-semibold mb-4">Aucune réservation {{ getEmptyStateText }}</h2>
        <p class="mb-4">{{ getEmptyStateMessage }}</p>
        <NuxtLink to="/vehicles" class="btn btn-primary mx-auto">Rechercher des véhicules</NuxtLink>
      </div>
    </div>

    <!-- Liste des réservations -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="card bg-base-100 shadow-lg overflow-hidden group"
        >
          <figure class="relative h-48">
            <img
              :src="
                getPrimaryPhotoUrl(booking.vehicle) || 'https://placehold.co/400x300?text=Véhicule'
              "
              :alt="`${booking.vehicle?.make} ${booking.vehicle?.model}`"
              class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute top-2 right-2 badge" :class="getStatusBadgeClass(booking.status)">
              {{ getStatusLabel(booking.status) }}
            </div>
          </figure>
          <div class="card-body p-4 flex flex-col justify-between">
            <div>
              <!-- Price and Title -->
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h2 class="card-title text-base font-bold truncate">
                    {{ booking.vehicle?.make }} {{ booking.vehicle?.model }}
                  </h2>
                  <p class="text-sm text-base-content/70">{{ booking.vehicle?.year }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-base-content/70">Prix total</p>
                  <p class="font-bold text-xl text-primary">
                    {{ formatPrice(booking.total_price) }}
                  </p>
                </div>
              </div>

              <!-- Specs -->
              <div class="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-base-content/80">
                <div class="flex items-center gap-1">
                  <Icon name="material-symbols:settings-outline" class="h-4 w-4" />
                  <span>{{ booking.vehicle?.transmission }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="material-symbols:person-4-outline" class="h-4 w-4" />
                  <span>{{ booking.vehicle?.seats }} sièges</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="material-symbols:local-gas-station-outline" class="h-4 w-4" />
                  <span>{{ booking.vehicle?.fuel_type }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-3 text-sm">
              <div class="divider my-2"></div>
              <!-- Period -->
              <div class="flex items-center gap-2">
                <div>
                  <p class="text-xs text-base-content/70 mb-2">Période de location</p>
                  <p>
                    <span class="font-semibold">{{ formatDate(booking.start_date) }}</span> au
                    <span class="font-semibold">{{ formatDate(booking.end_date) }}</span>
                  </p>
                </div>
              </div>
              <!-- Owner -->
              <div v-if="booking.vehicle?.owner">
                <p class="text-xs text-base-content/70">Propriétaire</p>
                <p class="text-sm font-medium flex items-center flex-wrap gap-x-2 gap-y-1">
                  <span class="inline-flex items-center gap-1">
                    <Icon name="mdi:account" class="h-4 w-4" />
                    <span
                      >{{ booking.vehicle.owner.first_name }}
                      {{ booking.vehicle.owner.last_name }}</span
                    >
                  </span>
                  <span
                    v-if="booking.vehicle.owner.phone"
                    class="inline-flex items-center gap-1 font-normal text-base-content/80"
                  >
                    <span>-</span>
                  </span>
                  <span
                    v-if="booking.vehicle.owner.address"
                    class="inline-flex items-center gap-1 font-normal text-base-content/80"
                  >
                    <span>-</span>
                    <Icon name="mdi:map-marker" class="h-4 w-4" />
                    <span class="truncate">{{ booking.vehicle.owner.address }}</span>
                  </span>
                </p>
              </div>
            </div>

            <div class="card-actions justify-end mt-4">
              <NuxtLink :to="`/bookings/${booking.id}`" class="btn btn-primary btn-sm">
                Gérer la réservation
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <UiPagination
          :current-page="currentPage"
          :total-items="totalItems"
          :page-size="pageSize"
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useBookings } from '~/composables/useBookings'
  import { usePagination } from '~/composables/usePagination'
  import { useAuthStore } from '~/stores/auth'
  import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from '~/types'
  import type { Booking, Vehicle } from '~/types'
  import type { SupabaseClient } from '@supabase/supabase-js'

  // Protection de la route
  definePageMeta({
    middleware: 'auth'
  })

  // Composables
  const { fetchMyRenterBookings, getRenterBookingsCounts, isLoading } = useBookings()
  const { currentPage, pageSize, totalItems, totalPages, goToPage, changePageSize } = usePagination(
    {
      pageSize: 5
    }
  )
  const authStore = useAuthStore()
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const user = computed(() => authStore.user)

  // États réactifs
  const activeTab = ref('pending')
  const bookings = ref<Booking[]>([])
  const error = ref<string | null>(null)

  // Refs pour les compteurs
  const pendingCount = ref(0)
  const completedCount = ref(0)
  const cancelledCount = ref(0)

  const statusMap: Record<string, string[]> = {
    pending: ['pending', 'owner_approved', 'confirmed', 'active'],
    completed: ['completed'],
    cancelled: ['cancelled']
  }

  // Texte affiché quand il n'y a pas de réservation
  const getEmptyStateText = computed(() => {
    switch (activeTab.value) {
      case 'pending':
        return 'en cours'
      case 'completed':
        return 'passée'
      case 'cancelled':
        return 'annulée'
      default:
        return ''
    }
  })

  const getEmptyStateMessage = computed(() => {
    switch (activeTab.value) {
      case 'pending':
        return 'Réservez un véhicule pour planifier votre prochain voyage.'
      case 'completed':
        return "Vous n'avez pas encore effectué de location."
      case 'cancelled':
        return "Vous n'avez pas de réservation annulée."
      default:
        return ''
    }
  })

  const loadCounts = async () => {
    if (!user.value) return
    const { counts, error: countError } = await getRenterBookingsCounts(user.value.id)
    if (countError) {
      console.error('Erreur lors de la récupération des totaux:', countError)
      return
    }
    if (counts) {
      pendingCount.value = counts.pending
      completedCount.value = counts.completed
      cancelledCount.value = counts.cancelled
    }
  }

  // Charger les réservations de l'utilisateur depuis Supabase
  const loadUserBookings = async () => {
    if (!user.value) return
    const statusesToFetch = statusMap[activeTab.value]

    const {
      bookings: data,
      error: fetchError,
      totalCount
    } = await fetchMyRenterBookings(
      user.value.id,
      statusesToFetch,
      currentPage.value,
      pageSize.value
    )

    if (fetchError) {
      error.value = 'Erreur lors de la récupération des réservations.'
      bookings.value = []
      totalItems.value = 0
    } else {
      bookings.value = data as Booking[]
      totalItems.value = totalCount || 0
      error.value = null
    }
  }

  const changeTab = (tab: string) => {
    if (activeTab.value === tab) return
    activeTab.value = tab

    // Si on est déjà sur la page 1, le watcher ne se déclenchera pas,
    // donc on doit appeler le chargement manuellement.
    if (currentPage.value === 1) {
      loadUserBookings()
    } else {
      // Utiliser la méthode du composable pour changer de page
      goToPage(1)
    }
  }

  // Gestionnaires d'événements pour la pagination
  const handlePageChange = (page: number) => {
    goToPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    changePageSize(size)
  }

  // Watcher simple pour la pagination
  watch(currentPage, loadUserBookings)
  watch(pageSize, loadUserBookings)

  // Formattage de la date pour l'affichage
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  // Formattage des prix en Ariary
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }

  // Obtenir l'URL de la photo primaire
  const getPrimaryPhotoUrl = (vehicle?: Vehicle) => {
    if (!vehicle?.vehicle_photos?.length) {
      return vehicle?.image_url || null
    }
    const primary = vehicle.vehicle_photos.find(p => p.is_primary)
    const photo = primary || vehicle.vehicle_photos[0]

    if (photo?.file_path) {
      const { data } = supabase.storage.from('cars').getPublicUrl(photo.file_path)
      return data.publicUrl
    }
    return null
  }

  // Obtenir la classe CSS pour le badge de statut
  const getStatusBadgeClass = (status: string) => {
    const statusColors = BOOKING_STATUS_COLORS[status as keyof typeof BOOKING_STATUS_COLORS]
    return statusColors || 'badge-ghost'
  }

  // Obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    const statusLabel = BOOKING_STATUS_LABELS[status as keyof typeof BOOKING_STATUS_LABELS]
    return statusLabel || status
  }

  // Charger les données au montage
  onMounted(() => {
    loadUserBookings()
    loadCounts()
  })

  // Recharger les données quand l'utilisateur change
  watch(user, async newUser => {
    if (newUser) {
      loadUserBookings()
      loadCounts()
    } else {
      bookings.value = []
    }
  })
</script>
