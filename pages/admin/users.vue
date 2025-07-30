<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gestion des utilisateurs</h1>
      <div v-if="!isLoading" class="badge badge-info">
        {{ totalUsers }} utilisateur{{ totalUsers > 1 ? 's' : '' }}
      </div>
    </div>

    <!-- Filtres -->
    <AdminUsersFilters v-model="filters" />

    <!-- Tableau des utilisateurs -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div v-if="isLoading" class="flex justify-center py-8">
          <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="error" class="alert alert-error">
          <Icon name="mdi:alert-circle" />
          <span>{{ error }}</span>
        </div>

        <div v-else-if="users.length === 0" class="text-center py-8">
          <Icon name="mdi:account-search" class="text-4xl text-base-content/50 mb-2" />
          <p class="text-base-content/70">Aucun utilisateur trouvé</p>
        </div>

        <AdminUsersTable
          v-else
          :users="users"
          @toggle-verification="handleToggleVerification"
          @toggle-role="handleToggleRole"
        />

        <!-- Pagination -->
        <div v-if="totalUsers > itemsPerPage" class="flex justify-center mt-6">
          <UiPagination
            :current-page="currentPage"
            :total-items="totalUsers"
            :page-size="itemsPerPage"
            @page-change="changePage"
            @page-size-change="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDebounceFn } from '@vueuse/core'
  import { useAdminUsers, type UserFilters } from '~/composables/useAdminUsers'
  import type { Profile } from '~/types'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })

  // Composables
  const { fetchUsers, updateUser } = useAdminUsers()

  // État de la page
  const isLoading = ref(true)
  const isUpdating = ref(false)
  const error = ref<string | null>(null)
  const users = ref<Profile[]>([])
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  // Filtres
  const filters = ref<UserFilters>({
    searchQuery: '',
    status: 'all',
    role: 'all'
  })

  // Fonction de recherche avec debounce
  const debouncedFetch = useDebounceFn(() => {
    currentPage.value = 1
    loadUsers()
  }, 500)

  // Récupération des utilisateurs
  const loadUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data, count } = await fetchUsers(filters.value, currentPage.value, itemsPerPage.value)
      users.value = data
      totalUsers.value = count
    } catch (err) {
      error.value = 'Impossible de charger les utilisateurs.'
    } finally {
      isLoading.value = false
    }
  }

  // Actions
  const handleToggleVerification = async (user: Profile) => {
    if (isUpdating.value) return
    isUpdating.value = true
    const { success } = await updateUser(user.id, { is_verified: !user.is_verified })
    if (success) {
      await loadUsers() // Recharger pour avoir les données à jour
    }
    isUpdating.value = false
  }

  const handleToggleRole = async (user: Profile) => {
    if (isUpdating.value) return
    isUpdating.value = true
    const { success } = await updateUser(user.id, { is_admin: !user.is_admin })
    if (success) {
      await loadUsers()
    }
    isUpdating.value = false
  }

  const changePage = (page: number) => {
    currentPage.value = page
    loadUsers()
  }

  const handlePageSizeChange = (size: number) => {
    itemsPerPage.value = size
    currentPage.value = 1
    loadUsers()
  }

  // Surveiller les filtres pour recharger les données
  watch(
    filters,
    (newFilters, oldFilters) => {
      // Utiliser le debounce seulement pour la recherche textuelle
      if (newFilters.searchQuery !== oldFilters.searchQuery) {
        debouncedFetch()
      } else {
        currentPage.value = 1
        loadUsers()
      }
    },
    { deep: true }
  )

  onMounted(loadUsers)
</script>
