import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  // Utilisation du store Pinia
  const authStore = useAuthStore()

  // Vérification combinée : authentification ET droits admin
  if (!authStore.isLoggedIn || !authStore.isAdmin) {
    // Si non connecté -> redirection vers login
    if (!authStore.isLoggedIn) {
      return navigateTo('/auth/login')
    }

    // Si connecté mais pas admin -> erreur 403
    throw createError({
      statusCode: 403,
      statusMessage: 'Accès interdit - Droits administrateur requis'
    })
  }
})
