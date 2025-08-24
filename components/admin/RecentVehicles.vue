<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title">Véhicules Récemment Ajoutés</h2>
        <span
          v-if="loadingVehicles && recentVehicles.length === 0"
          class="loading loading-sm loading-spinner"
        ></span>
      </div>

      <div v-if="recentVehicles.length > 0" ref="scrollComponent" class="overflow-x-auto h-96">
        <AdminVehiclesTable :vehicles="recentVehicles" @view-vehicle="viewVehicle" />
        <div v-if="loadingVehicles" class="text-center p-4">
          <span class="loading loading-sm loading-spinner"></span>
        </div>
      </div>

      <div v-if="recentVehicles.length === 0 && !loadingVehicles" class="text-center py-10">
        <p class="text-lg">Aucun véhicule trouvé.</p>
      </div>
    </div>

    <AdminVehicleDetailsModal
      v-model="isModalOpen"
      :vehicle="selectedVehicle"
      @vehicle-updated="refetchOnUpdate"
    />
  </div>
</template>

<script setup lang="ts">
  import { useInfiniteScroll } from '@vueuse/core'
  import { useAdminDashboard } from '~/composables/useAdminDashboard'
  import AdminVehiclesTable from '~/components/admin/VehiclesTable.vue'
  import AdminVehicleDetailsModal from '~/components/admin/VehicleDetailsModal.vue'
  import type { Vehicle } from '~/types'

  const {
    recentVehicles,
    loadingVehicles,
    allVehiclesLoaded,
    fetchRecentVehicles,
    listenToVehicleChanges,
    unsubscribeFromVehicleChanges,
    resetVehiclesPagination
  } = useAdminDashboard()

  const scrollComponent = ref<HTMLElement | null>(null)
  const isModalOpen = ref(false)
  const selectedVehicle = ref<Vehicle | null>(null)

  const viewVehicle = (vehicle: Vehicle) => {
    selectedVehicle.value = vehicle
    isModalOpen.value = true
  }

  // Fonction pour rafraîchir la liste si une mise à jour a lieu dans la modale
  const refetchOnUpdate = async () => {
    // Réinitialiser complètement la pagination et recharger
    resetVehiclesPagination()
    await fetchRecentVehicles()
  }

  useInfiniteScroll(
    scrollComponent,
    async () => {
      await fetchRecentVehicles()
    },
    { distance: 10, canLoadMore: () => !loadingVehicles.value && !allVehiclesLoaded.value }
  )

  onMounted(() => {
    if (recentVehicles.value.length === 0) {
      fetchRecentVehicles()
    }
    listenToVehicleChanges()
  })

  onUnmounted(() => {
    unsubscribeFromVehicleChanges()
  })
</script>
