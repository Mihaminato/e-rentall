<template>
  <div class="flex items-center p-4 mb-6">
    <div class="avatar">
      <div class="w-12 rounded-full">
        <img :src="adminAvatar" :alt="adminName" />
      </div>
    </div>
    <div class="ml-3">
      <p class="font-semibold">{{ adminName }}</p>
      <p class="text-sm text-base-content/70">{{ adminEmail }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth'

  const authStore = useAuthStore()

  // Computed properties pour les données admin
  const adminName = computed(() => {
    if (authStore.profile) {
      return `${authStore.profile.first_name} ${authStore.profile.last_name}`.trim()
    }
    return 'Admin'
  })

  const adminEmail = computed(() => {
    return authStore.profile?.email || authStore.user?.email || 'admin@example.com'
  })

  const adminAvatar = computed(() => {
    return (
      authStore.profile?.avatar_url ||
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
    )
  })
</script>
