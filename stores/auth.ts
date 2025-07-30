import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Profile } from '~/types'

/**
 * Store utilisateur avec Composition API de Pinia
 * Ce store est dédié UNIQUEMENT à la gestion d'état, pas aux appels API
 * Toute la logique métier est dans le composable useAuth
 *
 */
export const useAuthStore = defineStore(
  'auth',
  // eslint-disable-next-line max-lines-per-function
  () => {
    // État de l'utilisateur et de l'authentification
    const user = ref<User | null>(null)
    const profile = ref<Profile | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const notification = ref<{
      type: 'info' | 'success' | 'warning' | 'error'
      message: string
    } | null>(null)

    // Getters calculés
    const isLoggedIn = computed(() => !!user.value)
    const isAdmin = computed(() => !!profile.value?.is_admin)

    // Actions - uniquement pour modifier l'état
    const setUser = (newUser: User | null) => {
      user.value = newUser
    }

    const setProfile = (newProfile: Profile | null) => {
      profile.value = newProfile
    }

    const setLoading = (status: boolean) => {
      loading.value = status
    }

    const setError = (newError: string | null) => {
      error.value = newError
    }

    const setNotification = (
      newNotification: { type: 'info' | 'success' | 'warning' | 'error'; message: string } | null
    ) => {
      notification.value = newNotification
    }

    // Action pour réinitialiser l'état (logout, etc.)
    const resetState = async () => {
      user.value = null
      profile.value = null
      loading.value = false
      error.value = null
      notification.value = null
      await navigateTo('/')
    }

    // Exposer l'état et les méthodes
    return {
      // État - Les refs sont automatiquement déwrapées dans les composants Vue et middleware
      user,
      profile,
      loading,
      error,
      notification,

      // Getters - Automatiquement déwrapés également
      isLoggedIn,
      isAdmin,

      // Actions pour modifier l'état
      setUser,
      setProfile,
      setLoading,
      setError,
      setNotification,
      resetState
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies()
    }
  }
)
