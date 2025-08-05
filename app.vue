<template>
  <!-- Barre de chargement configurée pour le test : plus visible -->
  <NuxtLoadingIndicator color="#e2725b" :height="3" :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
    <!-- Stagewise Toolbar - Seulement en mode développement -->
    <!-- <ClientOnly>
      <StagewiseToolbar :config="config" />
    </ClientOnly> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
  // import { StagewiseToolbar, type ToolbarConfig } from '@stagewise/toolbar-vue'

  // const config: ToolbarConfig = {
  //   plugins: []
  // }
</script>
