<!-- Page de gestion des DEMANDES DE RESERVATION pour le propriétaire -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Demandes de réservation</h1>

    <!-- Tabs pour les différentes catégories de réservations -->
    <div role="tablist" class="tabs tabs-bordered mb-6">
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active': activeTab === 'pending' }"
        @click="changeTab('pending')"
      >
        En attente
        <div v-if="pendingCount > 0" class="badge badge-warning ml-2 text-base-100">
          {{ pendingCount }}
        </div>
      </a>
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active': activeTab === 'confirmed' }"
        @click="changeTab('confirmed')"
      >
        Confirmées
        <div v-if="confirmedCount > 0" class="badge badge-info ml-2">{{ confirmedCount }}</div>
      </a>
      <a
        role="tab"
        class="tab"
        :class="{ 'tab-active': activeTab === 'completed' }"
        @click="changeTab('completed')"
      >
        Terminées
        <div v-if="completedCount > 0" class="badge badge-success ml-2">
          {{ completedCount }}
        </div>
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
        <Icon name="material-symbols:error-outline" class="h-6 w-6" />
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Aucune réservation -->
    <div v-else-if="bookings.length === 0" class="card bg-base-100 shadow-lg">
      <div class="card-body text-center py-12">
        <h2 class="text-2xl font-semibold mb-4">Aucune demande de réservation</h2>
        <p>Vous n'avez aucune demande de réservation {{ getEmptyStateText }}.</p>
      </div>
    </div>

    <!-- Liste des réservations -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <BookingsRequestCard
          v-for="booking in bookings"
          :key="booking.id"
          :booking="booking"
          @approve="promptApprove"
          @refuse="promptRefuse"
        />
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

    <!-- Modal de confirmation -->
    <UiConfirmationModal
      :visible="confirmationModal.show"
      :title="confirmationModal.title"
      :message="confirmationModal.message"
      :action-type="confirmationModal.action"
      :loading="isUpdating"
      @confirm="handleConfirm"
      @cancel="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
  import { useBookings } from '~/composables/useBookings'
  import { usePagination } from '~/composables/usePagination'
  import { useAuthStore } from '~/stores/auth'
  import type { Booking } from '~/types'

  definePageMeta({
    middleware: 'auth'
  })

  const { fetchMyOwnerBookings, getOwnerBookingsCounts, updateBookingStatus, setBookingDeposit } =
    useBookings()
  const { currentPage, pageSize, totalItems, totalPages, goToPage, changePageSize } = usePagination(
    {
      pageSize: 5
    }
  )

  const authStore = useAuthStore()
  const user = computed(() => authStore.user)

  const bookings = ref<Booking[]>([])
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  const isUpdating = ref(false)
  const activeTab = ref('pending')

  // Refs pour les compteurs
  const pendingCount = ref(0)
  const confirmedCount = ref(0)
  const completedCount = ref(0)
  const cancelledCount = ref(0)

  const confirmationModal = ref({
    show: false,
    title: '',
    message: '',
    bookingId: '',
    action: '' as 'approve' | 'refuse'
  })

  const statusMap: Record<string, string[]> = {
    pending: ['pending'],
    confirmed: ['owner_approved', 'confirmed', 'active', 'pending_completion'],
    completed: ['completed'],
    cancelled: ['cancelled']
  }

  const getEmptyStateText = computed(() => {
    switch (activeTab.value) {
      case 'pending':
        return 'en attente'
      case 'confirmed':
        return 'confirmée'
      case 'completed':
        return 'terminée'
      case 'cancelled':
        return 'annulée'
      default:
        return ''
    }
  })

  const loadCounts = async () => {
    if (!user.value) return
    const { counts, error: countError } = await getOwnerBookingsCounts(user.value.id)
    if (countError) {
      console.error('Erreur lors de la récupération des totaux:', countError)
      return
    }
    if (counts) {
      pendingCount.value = counts.pending
      confirmedCount.value = counts.confirmed
      completedCount.value = counts.completed
      cancelledCount.value = counts.cancelled
    }
  }

  const loadOwnerBookings = async () => {
    if (!user.value) return
    isLoading.value = true
    const statusesToFetch = statusMap[activeTab.value]

    const {
      bookings: data,
      error: fetchError,
      totalCount
    } = await fetchMyOwnerBookings(
      user.value.id,
      statusesToFetch,
      currentPage.value,
      pageSize.value
    )

    if (fetchError) {
      error.value = 'Erreur lors de la récupération des demandes.'
      bookings.value = []
      totalItems.value = 0
    } else {
      bookings.value = data as Booking[]
      totalItems.value = totalCount || 0
      error.value = null
    }
    isLoading.value = false
  }

  const changeTab = (tab: string) => {
    if (activeTab.value === tab) return
    activeTab.value = tab

    // Si on est déjà sur la page 1, le watcher ne se déclenchera pas,
    // donc on doit appeler le chargement manuellement.
    if (currentPage.value === 1) {
      loadOwnerBookings()
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
  watch(currentPage, loadOwnerBookings)
  watch(pageSize, loadOwnerBookings)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  const promptApprove = (bookingId: string) => {
    const booking = bookings.value.find(b => b.id === bookingId)
    if (!booking) return
    confirmationModal.value = {
      show: true,
      title: 'Approuver la demande',
      message: `Confirmer la demande pour le véhicule ${booking.vehicle?.make} du ${formatDate(
        booking.start_date
      )} au ${formatDate(booking.end_date)} ?`,
      bookingId,
      action: 'approve'
    }
  }

  const promptRefuse = (bookingId: string) => {
    confirmationModal.value = {
      show: true,
      title: 'Refuser la demande',
      message: 'Êtes-vous sûr de vouloir refuser cette demande ? Cette action est irréversible.',
      bookingId,
      action: 'refuse'
    }
  }

  const handleConfirm = async () => {
    const { bookingId, action } = confirmationModal.value
    if (!bookingId) return

    isUpdating.value = true
    let success = false

    if (action === 'approve') {
      const booking = bookings.value.find(b => b.id === bookingId)
      if (booking) {
        const result = await setBookingDeposit(booking.id, booking.total_price)
        success = result.success
      }
    } else if (action === 'refuse') {
      const result = await updateBookingStatus(bookingId, 'cancelled')
      success = result.success
    }

    if (success) {
      // Recharger les données et les compteurs pour refléter le changement
      await Promise.all([loadOwnerBookings(), loadCounts()])
    }

    closeModal()
    isUpdating.value = false
  }

  const closeModal = () => {
    confirmationModal.value = { ...confirmationModal.value, show: false }
  }

  onMounted(() => {
    loadOwnerBookings()
    loadCounts()
  })
</script>
