<template>
  <!-- Notification d'installation PWA -->
  <div v-if="$pwa?.showInstallPrompt" class="fixed bottom-4 right-4 z-50">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg
            class="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">
            Installer l'application
          </p>
          <p class="mt-1 text-sm text-gray-500">
            Installez E-Rentall sur votre appareil pour un accès rapide
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="$pwa?.install()"
            class="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Installer
          </button>
          <button
            @click="$pwa?.cancelInstall()"
            class="ml-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Notification de mise à jour -->
  <div v-if="$pwa?.needRefresh" class="fixed bottom-4 right-4 z-50">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">
            Nouvelle version disponible
          </p>
          <p class="mt-1 text-sm text-gray-500">
            Une nouvelle version de l'application est disponible
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="$pwa?.updateServiceWorker()"
            class="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Mettre à jour
          </button>
          <button
            @click="$pwa?.cancelPrompt()"
            class="ml-2 text-gray-400 hover:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Notification hors ligne -->
  <div v-if="$pwa?.offlineReady" class="fixed bottom-4 right-4 z-50">
    <div
      class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg
            class="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">
            Prêt pour le mode hors ligne
          </p>
          <p class="mt-1 text-sm text-gray-500">
            L'application peut maintenant fonctionner hors ligne
          </p>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button
            @click="$pwa?.cancelPrompt()"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();

// Masquer automatiquement les notifications après 5 secondes
onMounted(() => {
  if ($pwa?.offlineReady || $pwa?.needRefresh) {
    setTimeout(() => {
      $pwa?.cancelPrompt();
    }, 5000);
  }
});
</script>
