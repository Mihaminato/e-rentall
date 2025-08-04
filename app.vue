<template>
  <!-- Barre de chargement configurée pour le test : plus visible -->
  <NuxtLoadingIndicator color="#e2725b" :height="3" :throttle="0" />
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiPwaNotifications />
</template>
