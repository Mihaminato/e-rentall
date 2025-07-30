import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(to => {
  // Utilisation du store Pinia
  const authStore = useAuthStore()

  // Si non connecté et la route n'est pas déjà une route d'auth
  if (!authStore.isLoggedIn && !to.path.includes('/auth/')) {
    return navigateTo('/auth/login')
  }

  // Si déjà connecté et essaie d'accéder à des pages d'auth
  if (authStore.isLoggedIn && to.path.includes('/auth/')) {
    return navigateTo('/profile')
  }
})
