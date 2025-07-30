<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <!-- Icône d'erreur animée -->
        <div class="w-24 h-24 mx-auto mb-6 relative">
          <div class="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
          <div class="relative bg-red-500 rounded-full w-24 h-24 flex items-center justify-center">
            <Icon :name="getErrorIcon" class="w-12 h-12 text-white" />
          </div>
        </div>

        <!-- Code d'erreur -->
        <h1 class="text-6xl font-bold text-gray-800 mb-4">
          {{ error.statusCode }}
        </h1>

        <!-- Message d'erreur -->
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">
          {{ getErrorTitle }}
        </h2>

        <p class="text-gray-600 mb-8">
          {{ getErrorMessage }}
        </p>
      </div>

      <!-- Actions -->
      <div class="space-y-4">
        <button @click="handleRetry" class="btn btn-primary w-full gap-2">
          <Icon name="mdi:refresh" class="w-4 h-4" />
          {{ getRetryText }}
        </button>

        <NuxtLink to="/" class="btn btn-outline w-full gap-2">
          <Icon name="mdi:home" class="w-4 h-4" />
          Retour à l'accueil
        </NuxtLink>

        <!-- Bouton de contact pour erreurs graves -->
        <NuxtLink
          v-if="error.statusCode >= 500"
          to="/contact"
          class="btn btn-ghost w-full gap-2 text-sm"
        >
          <Icon name="mdi:email" class="w-4 h-4" />
          Signaler le problème
        </NuxtLink>
      </div>

      <!-- Informations de debug en développement -->
      <div v-if="isDev && error.stack" class="mt-8 p-4 bg-gray-100 rounded-lg text-left">
        <details>
          <summary class="font-medium text-gray-700 cursor-pointer">
            Détails techniques (dev)
          </summary>
          <pre class="mt-2 text-xs text-gray-600 overflow-auto">{{ error.stack }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { navigateTo, useHead } from 'nuxt/app'

  // Props de l'erreur Nuxt
  const props = defineProps<{
    error: {
      statusCode: number
      statusMessage?: string
      message?: string
      stack?: string
    }
  }>()

  // Vérifier si on est en développement
  const isDev = process.env.NODE_ENV === 'development'

  // Icône selon le type d'erreur
  const getErrorIcon = computed(() => {
    switch (props.error.statusCode) {
      case 403:
        return 'mdi:lock'
      case 404:
        return 'mdi:compass-off'
      case 500:
        return 'mdi:server-network-off'
      default:
        return 'mdi:alert-circle'
    }
  })

  // Titre selon le type d'erreur
  const getErrorTitle = computed(() => {
    switch (props.error.statusCode) {
      case 403:
        return 'Accès refusé'
      case 404:
        return 'Page introuvable'
      case 500:
        return 'Erreur serveur'
      default:
        return 'Une erreur est survenue'
    }
  })

  // Message détaillé selon le type d'erreur
  const getErrorMessage = computed(() => {
    switch (props.error.statusCode) {
      case 403:
        return "Vous n'avez pas les droits nécessaires pour accéder à cette page. Connectez-vous avec un compte administrateur."
      case 404:
        return "La page que vous recherchez n'existe pas ou a été déplacée."
      case 500:
        return "Une erreur interne s'est produite. Nos équipes ont été informées."
      default:
        return props.error.message || "Une erreur inattendue s'est produite."
    }
  })

  // Texte du bouton retry selon l'erreur
  const getRetryText = computed(() => {
    switch (props.error.statusCode) {
      case 403:
        return 'Se connecter'
      case 404:
        return 'Actualiser'
      default:
        return 'Réessayer'
    }
  })

  // Gestion du retry
  const handleRetry = async () => {
    switch (props.error.statusCode) {
      case 403:
        // Rediriger vers la page de connexion
        await navigateTo('/auth/login')
        break
      case 404:
        // Actualiser la page
        window.location.reload()
        break
      default:
        // Réessayer en rechargeant
        window.location.reload()
    }
  }

  // SEO
  useHead({
    title: `Erreur ${props.error.statusCode} - VAM Location`,
    meta: [{ name: 'robots', content: 'noindex, nofollow' }]
  })
</script>
