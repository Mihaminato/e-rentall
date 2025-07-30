<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header / Navigation -->
    <NavHeader />

    <!-- Contenu principal avec padding pour compenser la navbar fixe -->
    <main class="flex-grow pt-16 md:pt-20">
      <slot></slot>
    </main>

    <!-- Footer -->
    <NavFooter />
  </div>
</template>

<script setup lang="ts"></script>
