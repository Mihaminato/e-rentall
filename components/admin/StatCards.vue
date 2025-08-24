<template>
  <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Skeleton loaders -->
    <div v-for="i in 4" :key="i" class="card bg-base-200 h-32 animate-pulse">
      <div class="card-body">
        <div class="h-4 bg-base-300 rounded w-1/2"></div>
        <div class="h-8 bg-base-300 rounded w-1/3 mt-2"></div>
      </div>
    </div>
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Users Card -->
    <div
      class="card bg-primary text-primary-content transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg"
    >
      <div class="card-body flex-row items-center">
        <div class="mr-4">
          <Icon name="i-mdi-account-group" class="text-4xl opacity-80" />
        </div>
        <div>
          <h3 class="card-title text-lg">Utilisateurs</h3>
          <p class="text-3xl font-bold">{{ stats.users?.count ?? 0 }}</p>
        </div>
      </div>
    </div>

    <!-- Vehicles Card -->
    <div
      class="card bg-secondary text-secondary-content transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg"
    >
      <div class="card-body flex-row items-center">
        <div class="mr-4">
          <Icon name="i-mdi-car-multiple" class="text-4xl opacity-80" />
        </div>
        <div>
          <h3 class="card-title text-lg">Véhicules</h3>
          <p class="text-3xl font-bold">{{ stats.vehicles?.count ?? 0 }}</p>
        </div>
      </div>
    </div>

    <!-- Bookings Card -->
    <div
      class="card bg-accent text-white transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg"
    >
      <div class="card-body flex-row items-center">
        <div class="mr-4">
          <Icon name="i-mdi-calendar-check" class="text-4xl opacity-80" />
        </div>
        <div>
          <h3 class="card-title text-lg">Réservations</h3>
          <p class="text-3xl font-bold">{{ stats.bookings?.count ?? 0 }}</p>
        </div>
      </div>
    </div>

    <!-- Pending Verification Card -->
    <div
      class="card bg-blue-500 text-white transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg"
    >
      <div class="card-body flex-row items-center">
        <div class="mr-4">
          <Icon name="i-mdi-account-clock" class="text-4xl opacity-80" />
        </div>
        <div>
          <h3 class="card-title text-lg">Utilisateurs en attente</h3>
          <p class="text-3xl font-bold">{{ stats.usersToVerify?.count ?? 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Stat {
    count: number
  }

  interface Stats {
    users: Stat | null
    vehicles: Stat | null
    bookings: Stat | null
    usersToVerify: Stat | null
  }

  defineProps<{
    stats: Stats
    loading: boolean
  }>()
</script>
