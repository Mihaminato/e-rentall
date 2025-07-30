<template>
  <ul>
    <li v-for="item in navigationItems" :key="item.path">
      <NuxtLink
        :to="item.path"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors duration-200 relative"
        active-class="bg-base-200 text-primary font-semibold active-link"
      >
        <Icon :name="item.icon" class="w-5 h-5" />
        {{ item.label }}
        <span v-if="item.badge" class="badge badge-primary badge-sm ml-auto">
          {{ item.badge }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { AdminNavigationItem } from '~/types/admin'

  // Configuration des éléments de navigation
  const navigationItems: AdminNavigationItem[] = [
    {
      path: '/admin',
      icon: 'mdi:view-dashboard',
      label: 'Aperçu'
    },
    {
      path: '/admin/users',
      icon: 'mdi:account-group',
      label: 'Liste des utilisateurs'
    },
    {
      path: '/admin/vehicles',
      icon: 'mdi:car-multiple',
      label: 'Tous les véhicules'
    },
    {
      path: '/admin/bookings',
      icon: 'mdi:calendar-multiple',
      label: 'Toutes les réservations'
    }
  ]
</script>

<style scoped>
  .active-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    bottom: 20%;
    width: 4px;
    background-color: oklch(var(--p)); /* Utilise la couleur primaire de DaisyUI */
    border-radius: 0 4px 4px 0;
  }
</style>
