<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Tableau de bord administrateur</h1>
      <div class="badge badge-accent">Version MVP</div>
    </div>

    <AdminStatCards :stats="stats" :loading="loading" />

    <!-- Utilisateurs à vérifier -->
    <div class="card bg-base-100 shadow-xl mb-8">
      <div class="card-body">
        <h2 class="card-title">Utilisateurs à vérifier ({{ totalUsersToVerify }})</h2>

        <div v-if="initialLoading" class="text-center p-4">
          <span class="loading loading-spinner"></span>
        </div>

        <div v-else-if="error" class="alert alert-error">
          {{ error.message || 'Impossible de charger les utilisateurs.' }}
        </div>

        <div v-else ref="scrollContainer" class="overflow-y-auto max-h-96 pr-2">
          <AdminUsersToVerify
            :users="usersToVerify"
            :loading="loadingMore"
            :all-loaded="!hasMore"
          />
          <div v-if="loadingMore" class="text-center p-4">
            <span class="loading loading-spinner loading-xs"></span>
          </div>
        </div>
      </div>
    </div>

    <AdminRecentBookings class="mb-8" />

    <AdminRecentVehicles class="mb-8" />
  </div>
</template>
<script setup lang="ts">
  import { useAdminDashboard } from '~/composables/useAdminDashboard'
  import AdminStatCards from '~/components/admin/StatCards.vue'
  import AdminRecentBookings from '~/components/admin/RecentBookings.vue'
  import AdminRecentVehicles from '~/components/admin/RecentVehicles.vue'
  import { useInfiniteScroll } from '@vueuse/core'
  import type { UserToVerify } from '~/types'
  import type { RealtimeChannel, PostgrestError, SupabaseClient } from '@supabase/supabase-js'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin']
  })

  const supabase = useNuxtApp().$supabase as SupabaseClient
  const { stats, loading, error, getStats, fetchUsersToVerify, getTotalUsersToVerify } =
    useAdminDashboard()

  // State for infinite scroll
  const usersToVerify = ref<UserToVerify[]>([])
  const currentPage = ref(1)
  const pageSize = ref(5)
  const totalUsersToVerify = ref(0)
  const hasMore = ref(true)
  const loadingMore = ref(false)
  const initialLoading = ref(true)
  const scrollContainer = ref<HTMLElement | null>(null)
  let channel: RealtimeChannel

  const loadMoreUsers = async () => {
    if (!hasMore.value || loadingMore.value) return

    loadingMore.value = true

    try {
      const { data } = await fetchUsersToVerify(currentPage.value, pageSize.value)

      if (data.length > 0) {
        usersToVerify.value.push(...data)
        currentPage.value++

        hasMore.value =
          data.length === pageSize.value && usersToVerify.value.length < totalUsersToVerify.value
      } else {
        hasMore.value = false
      }
    } catch (e) {
      const err = e as PostgrestError
      error.value = err
    } finally {
      loadingMore.value = false
      initialLoading.value = false
    }
  }

  const loadInitialData = async () => {
    initialLoading.value = true
    try {
      totalUsersToVerify.value = await getTotalUsersToVerify()

      await loadMoreUsers()
    } catch (e) {
      const err = e as PostgrestError
      error.value = err
      initialLoading.value = false
    }
  }

  const resetAndLoad = () => {
    usersToVerify.value = []
    currentPage.value = 1
    totalUsersToVerify.value = 0
    hasMore.value = true
    loadInitialData()
  }

  useInfiniteScroll(scrollContainer, loadMoreUsers, { distance: 10 })

  const initSubscriptions = async () => {
    channel = supabase
      .channel('public:documents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'documents' }, () => {
        resetAndLoad()
        getTotalUsersToVerify().then(total => {
          stats.value.usersToVerify = { count: total }
        })
      })
      .subscribe()
  }

  onMounted(() => {
    getStats()
    resetAndLoad()

    initSubscriptions()
  })

  onUnmounted(() => {
    if (channel) {
      supabase.removeChannel(channel)
    }
  })
</script>
