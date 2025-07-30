<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img :src="userAvatar" :alt="userName" />
      </div>
    </label>
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content mt-2 z-50 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li class="menu-title">{{ userName }}</li>
      <li>
        <NuxtLink to="/profile">
          <Icon name="mdi:account" class="w-4 h-4" />
          Profil
        </NuxtLink>
      </li>
      <div class="divider my-1"></div>
      <li>
        <a href="/" @click.prevent="goHome">
          <Icon name="mdi:arrow-left" class="w-4 h-4" />
          Retour au site
        </a>
      </li>
      <div class="divider"></div>
      <li>
        <button :disabled="loading" @click="handleLogout">
          <Icon name="mdi:logout" class="w-4 h-4" />
          {{ loading ? 'Déconnexion...' : 'Déconnexion' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/stores/auth'
  import { useAuth } from '~/composables/useAuth'

  const authStore = useAuthStore()
  const { logout } = useAuth()
  const router = useRouter()
  const loading = ref(false)

  // Computed properties pour l'utilisateur
  const userName = computed(() => {
    if (authStore.profile) {
      return `${authStore.profile.first_name} ${authStore.profile.last_name}`.trim()
    }
    return 'Admin'
  })

  const userAvatar = computed(() => {
    return (
      authStore.profile?.avatar_url ||
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
    )
  })

  // Fonction de déconnexion
  const handleLogout = async () => {
    loading.value = true
    try {
      await logout()
    } catch (err) {
      console.error('Erreur déconnexion', err)
    } finally {
      loading.value = false
    }
  }

  const goHome = async () => {
    await navigateTo('/')
  }
</script>
