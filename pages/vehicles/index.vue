<template>
  <div>
    <!-- Message d'information pour les visiteurs non connectés -->
    <div
      v-if="!isLoggedIn && showGuestInfo"
      class="bg-accent/10 border-l-4 border-accent p-4 mb-6"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center">
          <Icon name="mdi:information" class="w-5 h-5 text-accent mr-3" />
          <div class="flex-1">
            <p class="text-sm">
              <strong>Explorez nos véhicules gratuitement !</strong>
              <NuxtLink to="/auth/register" class="link link-accent font-medium"
                >Inscrivez-vous</NuxtLink
              >
              pour pouvoir effectuer des réservations.
            </p>
          </div>
          <button class="btn btn-ghost btn-xs" @click="showGuestInfo = false">
            <Icon name="mdi:close" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Composant de filtres -->
      <VehiclesFiltersSearch
        v-model:filters="searchFilters"
        class="mb-8"
        @apply-filters="searchVehicles"
        @clear-filters="clearAllFilters"
      />

      <!-- État de chargement -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="loading loading-spinner loading-lg text-primary"></div>
        <span class="ml-4 text-lg">Recherche en cours...</span>
      </div>

      <!-- État d'erreur -->
      <div v-else-if="error" class="alert alert-error mb-6">
        <Icon name="mdi:alert-circle" class="w-6 h-6" />
        <span>{{ error }}</span>
      </div>

      <!-- Résultats de recherche -->
      <div v-else class="space-y-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div class="flex items-center gap-3">
              <Icon name="mdi:car-multiple" class="w-6 h-6 text-success" />
              <h2 class="text-2xl font-bold">Véhicules disponibles</h2>
            </div>
            <div class="badge badge-success badge-outline self-start sm:self-center">
              {{ totalVehicles }} trouvé{{ totalVehicles > 1 ? 's' : '' }}
            </div>
          </div>

          <!-- <div class="flex items-center gap-2 self-end sm:self-center">
            <Icon name="mdi:sort" class="w-5 h-5 text-base-content/70" />
            <UiFormSelect
              label=""
              :model-value="sortBy"
              :options="sortOptions"
              class="w-48"
              @update:model-value="sortBy = $event"
            />
          </div> -->
        </div>

        <!-- Liste des véhicules -->
        <div
          v-if="vehicles.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <VehiclesVehicleCard v-for="vehicle in vehicles" :key="vehicle.id" :vehicle="vehicle" />
        </div>

        <!-- Message si aucun véhicule trouvé -->
        <div v-else class="text-center py-12">
          <Icon name="mdi:car-off" class="w-16 h-16 mx-auto text-base-content/30 mb-4" />
          <h3 class="text-xl font-semibold text-base-content/70 mb-2">Aucun véhicule trouvé</h3>
          <p class="text-base-content/50">Essayez de modifier vos critères de recherche</p>
        </div>

        <!-- Pagination -->
        <UiPagination
          class="my-8"
          :current-page="currentPage"
          :total-items="totalVehicles"
          :page-size="pageSize"
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import type { Vehicle, SearchFilters, PaginatedResponse } from '~/types'
  import { useAuthStore } from '~/stores/auth'
  import { storeToRefs } from 'pinia'

  definePageMeta({
    middleware: []
  })

  const route = useRoute()
  const { fetchVehiclesWithPagination, isLoading, error } = useVehicles()

  // Store d'authentification pour vérifier si l'utilisateur est connecté
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  // État pour l'info toast pour les non-connectés
  const showGuestInfo = ref(false)

  // Dates par défaut
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  // Filtres de recherche - les dates sont pré-remplies mais pas appliquées initialement
  const searchFilters = ref<SearchFilters>({
    province: route.query.province?.toString() || '',
    startDate: route.query.start_date?.toString() || today.toISOString().split('T')[0],
    endDate: route.query.end_date?.toString() || tomorrow.toISOString().split('T')[0],
    vehicleType: '',
    transmission: '',
    fuelType: '',
    seats: '',
    maxPrice: '',
    keywords: ''
  })

  // Vérifier si des paramètres de recherche sont présents dans l'URL
  const hasSearchParams = !!(route.query.province || route.query.start_date || route.query.end_date)

  // Filtres réellement appliqués - appliqués automatiquement si présents dans l'URL
  const appliedFilters = ref<SearchFilters>({
    province: route.query.province?.toString() || '',
    startDate: hasSearchParams ? route.query.start_date?.toString() || '' : '',
    endDate: hasSearchParams ? route.query.end_date?.toString() || '' : '',
    vehicleType: '',
    transmission: '',
    fuelType: '',
    seats: '',
    maxPrice: '',
    keywords: ''
  })

  // Options de tri
  // const sortOptions = [
  //   { label: 'Prix croissant', value: 'price_asc' },
  //   { label: 'Prix décroissant', value: 'price_desc' },
  //   { label: 'Nouveautés', value: 'newest' }
  // ]
  const sortBy = ref('price_asc')

  // Données et pagination
  const vehicles = ref<Vehicle[]>([])
  const currentPage = ref(1)
  const pageSize = ref(12)
  const totalVehicles = ref(0)
  const paginationData = ref<PaginatedResponse<Vehicle> | null>(null)

  // Fonction pour charger les véhicules avec Supabase
  const loadVehicles = async () => {
    try {
      // Utiliser les filtres appliqués (pas les filtres de l'interface)
      const result = await fetchVehiclesWithPagination(
        appliedFilters.value,
        sortBy.value,
        currentPage.value,
        pageSize.value
      )

      vehicles.value = result.data
      totalVehicles.value = result.total || 0
      paginationData.value = result
    } catch (err) {
      const errorMessage = (err as Error).message

      // Messages d'erreur spécifiques
      if (errorMessage.includes('Session expirée')) {
        console.warn('Session expirée, actualisation recommandée')
      } else if (errorMessage.includes('Connexion lente')) {
        console.warn('Connexion lente détectée')
      } else {
        console.error('Erreur lors du chargement des véhicules:', err)
      }

      // En cas d'erreur, afficher des données vides plutôt qu'un crash
      vehicles.value = []
      totalVehicles.value = 0
      paginationData.value = null
    }
  }

  // Fonction de recherche avec filtres - copie les filtres de l'interface vers les filtres appliqués
  const searchVehicles = async () => {
    // Appliquer les filtres de recherche
    appliedFilters.value = { ...searchFilters.value }
    currentPage.value = 1 // Reset à la première page lors d'une nouvelle recherche
    await loadVehicles()
  }

  // Fonction pour effacer tous les filtres
  const clearAllFilters = async () => {
    // Remettre les filtres appliqués à vide (pas de filtrage)
    appliedFilters.value = {
      province: '',
      startDate: '',
      endDate: '',
      vehicleType: '',
      transmission: '',
      fuelType: '',
      seats: '',
      maxPrice: '',
      keywords: ''
    }
    currentPage.value = 1 // Reset à la première page
    await loadVehicles()
  }

  // Handlers de pagination
  const handlePageChange = async (page: number) => {
    currentPage.value = page
    await loadVehicles()
  }

  const handlePageSizeChange = async (size: number) => {
    pageSize.value = size
    currentPage.value = 1 // Reset à la première page
    await loadVehicles()
  }

  // Watcher pour recharger quand le tri change
  watch(sortBy, async () => {
    currentPage.value = 1
    await loadVehicles()
  })

  // Charger les véhicules au montage du composant
  onMounted(() => {
    loadVehicles()

    // Afficher le message d'information pour les non-connectés après un délai
    if (!isLoggedIn.value) {
      setTimeout(() => {
        showGuestInfo.value = true
      }, 2000) // Afficher après 2 secondes
    }
  })
</script>
