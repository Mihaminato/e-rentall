<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des Véhicules</h1>
      <div v-if="!isLoading" class="badge badge-info">
        {{ totalVehicles }} véhicule{{ totalVehicles > 1 ? 's' : '' }}
      </div>
    </div>

    <!-- Filtres -->
    <AdminVehiclesFilters v-model="filters" />

    <!-- Tableau des véhicules -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div v-if="isLoading" class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else-if="error" class="alert alert-error">
          <Icon name="mdi:alert-circle" />
          <span>{{ error }}</span>
        </div>
        <div v-else-if="vehicles.length === 0" class="text-center py-8">
          <Icon name="mdi:car-search" class="text-4xl text-base-content/50 mb-2" />
          <p class="text-base-content/70">Aucun véhicule trouvé</p>
        </div>
        <AdminVehiclesTable
          v-else
          :vehicles="vehicles"
          @view-vehicle="viewVehicle"
          @delete-vehicle="handleDeleteVehicle"
        />

        <!-- Pagination -->
        <div v-if="totalVehicles > pageSize" class="flex justify-center mt-6">
          <UiPagination
            :current-page="currentPage"
            :total-items="totalVehicles"
            :page-size="pageSize"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- Modal de détails du véhicule -->
    <AdminVehicleDetailsModal
      v-model="isModalOpen"
      :vehicle="selectedVehicle"
      @vehicle-updated="fetchData"
    />
  </div>
</template>

<script setup lang="ts">
  import { useVehicles, type AdminFilters } from '~/composables/useVehicles'
  import type { Vehicle } from '~/types'
  import { useDebounceFn } from '@vueuse/core'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })

  const { isLoading, error, fetchAllVehicles, deleteVehicle, fetchVehicleCountByStatus } =
    useVehicles()

  // Data
  const vehicles = ref<Vehicle[]>([])
  const totalVehicles = ref(0)
  const inactiveCount = ref(0)

  // Filtres - L'état est ici, mais l'UI et la logique de reset sont dans le composant enfant
  const filters = ref<AdminFilters>({
    status: '',
    type: '',
    location: '',
    searchTerm: ''
  })

  // Pagination
  const currentPage = ref(1)
  const pageSize = ref(5)

  // Modal
  const isModalOpen = ref(false)
  const selectedVehicle = ref<Vehicle | null>(null)

  // Methods
  const fetchData = async () => {
    const { data, count } = await fetchAllVehicles(currentPage.value, pageSize.value, filters.value)
    const inactive = await fetchVehicleCountByStatus(false)

    vehicles.value = data
    totalVehicles.value = count || 0
    inactiveCount.value = inactive

    // Mettre à jour le véhicule sélectionné s'il est dans la nouvelle liste
    if (selectedVehicle.value) {
      const updatedVehicle = data.find(v => v.id === selectedVehicle.value?.id)
      if (updatedVehicle) {
        selectedVehicle.value = updatedVehicle
      } else {
        // Optionnel: si le véhicule n'est plus dans la page actuelle, fermer la modale
        isModalOpen.value = false
      }
    }
  }

  const debouncedFetchData = useDebounceFn(fetchData, 300)

  const viewVehicle = (vehicle: Vehicle) => {
    selectedVehicle.value = vehicle
    isModalOpen.value = true
  }

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (
      confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.')
    ) {
      await deleteVehicle(vehicleId)
      await fetchData()
    }
  }

  const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchData()
  }

  // Surveiller les filtres pour recharger les données
  watch(
    filters,
    (newFilters, oldFilters) => {
      // Utiliser le debounce seulement pour la recherche textuelle
      if (newFilters.searchTerm !== oldFilters.searchTerm) {
        debouncedFetchData()
      } else {
        currentPage.value = 1
        fetchData()
      }
    },
    { deep: true }
  )

  onMounted(fetchData)
</script>
