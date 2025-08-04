<template>
  <!-- Barre de chargement configurée pour le test : plus visible -->
  <NuxtLoadingIndicator color="#e2725b" :height="3" :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
