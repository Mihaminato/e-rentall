<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between items-center mb-4">
        <h2 class="card-title">Réservations Récentes</h2>
        <span
          v-if="loadingBookings && recentBookings.length === 0"
          class="loading loading-sm loading-spinner"
        ></span>
      </div>

      <!-- Tableau des réservations -->
      <div v-if="recentBookings.length > 0" ref="scrollComponent" class="overflow-x-auto h-96">
        <AdminBookingsTable :bookings="recentBookings" />
        <!-- Ligne de chargement -->
        <div v-if="loadingBookings" class="text-center p-4">
          <span class="loading loading-sm loading-spinner"></span>
        </div>
      </div>

      <!-- État vide -->
      <div v-if="recentBookings.length === 0 && !loadingBookings" class="text-center py-10">
        <p class="text-lg">Aucune réservation pour le moment.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useInfiniteScroll } from '@vueuse/core'
  import { useAdminDashboard } from '~/composables/useAdminDashboard'
  import AdminBookingsTable from '~/components/admin/BookingsTable.vue'

  const {
    recentBookings,
    loadingBookings,
    allBookingsLoaded,
    fetchRecentBookings,
    listenToBookingChanges,
    unsubscribeFromBookingChanges
  } = useAdminDashboard()

  const scrollComponent = ref<HTMLElement | null>(null)

  // --- Défilement infini ---
  useInfiniteScroll(
    scrollComponent,
    async () => {
      await fetchRecentBookings()
    },
    { distance: 10, canLoadMore: () => !loadingBookings.value && !allBookingsLoaded.value }
  )

  // --- Cycle de vie ---
  onMounted(async () => {
    if (recentBookings.value.length === 0) {
      await fetchRecentBookings()
    }
    listenToBookingChanges()
  })

  onUnmounted(() => {
    unsubscribeFromBookingChanges()
  })
</script>
