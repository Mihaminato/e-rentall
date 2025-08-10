<template>
  <footer class="bg-primary text-neutral-content">
    <div class="container mx-auto py-4 px-4 md:px-8">
      <div class="flex flex-wrap justify-center md:justify-between items-center gap-4">
        <NuxtLink to="/" class="text-lg font-bold">E-rentall</NuxtLink>

        <div class="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          <!-- <NuxtLink to="/about" class="link link-hover text-sm">À propos</NuxtLink> -->
          <NuxtLink to="/how-it-works" class="link link-hover text-sm">Comment ça marche</NuxtLink>
          <NuxtLink to="/terms" class="link link-hover text-sm">Conditions d'utilisation</NuxtLink>
          <NuxtLink to="/privacy" class="link link-hover text-sm"
            >Politique de confidentialité</NuxtLink
          >
        </div>

        <p class="text-xs opacity-70">© 2025 - E-rentall - Tous droits réservés</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  // Pas besoin de logique particulière dans le footer
</script>
