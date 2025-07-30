<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des Réservations</h1>
      <div v-if="!isLoading" class="badge badge-info">
        {{ pagination.totalItems.value }} réservation{{
          pagination.totalItems.value > 1 ? 's' : ''
        }}
      </div>
    </div>

    <!-- Filtres -->
    <AdminBookingsFilters v-model="filters" />

    <!-- Tableau des réservations -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div v-if="isLoading" class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-else-if="error" class="alert alert-error">
          <Icon name="mdi:alert-circle" />
          <span>{{ error }}</span>
        </div>
        <div v-else-if="bookings.length === 0" class="text-center py-8">
          <Icon name="mdi:calendar-search" class="text-4xl text-base-content/50 mb-2" />
          <p class="text-base-content/70">Aucune réservation trouvée</p>
        </div>
        <AdminBookingsTable v-else :bookings="bookings" />

        <!-- Pagination -->
        <div v-if="pagination.totalPages.value > 1" class="flex justify-center mt-6">
          <UiPagination
            :current-page="pagination.currentPage.value"
            :total-items="pagination.totalItems.value"
            :page-size="pagination.pageSize.value"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useBookings } from '~/composables/useBookings'
  import { usePagination } from '~/composables/usePagination'
  import AdminBookingsTable from '~/components/admin/BookingsTable.vue'
  import AdminBookingsFilters, { type BookingFilters } from '~/components/admin/BookingsFilters.vue'
  import type { Booking } from '~/types'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })

  const { fetchAllBookings, isLoading, error } = useBookings()
  const pagination = usePagination({ pageSize: 10 })

  const bookings = ref<Booking[]>([])
  const filters = ref<BookingFilters>({
    searchTerm: '',
    status: '',
    period: ''
  })

  // Charger les réservations avec pagination
  const loadBookings = async () => {
    const { bookings: data, totalCount } = await fetchAllBookings(
      pagination.currentPage.value,
      pagination.pageSize.value,
      filters.value
    )

    bookings.value = data || []
    pagination.totalItems.value = totalCount || 0
  }

  // Gestionnaires d'événements pour la pagination
  const handlePageChange = (page: number) => {
    pagination.goToPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    pagination.changePageSize(size)
  }

  // Watchers pour recharger les données
  watch(
    [() => pagination.currentPage.value, () => pagination.pageSize.value, filters],
    () => {
      loadBookings()
    },
    { deep: true }
  )

  onMounted(loadBookings)
</script>
