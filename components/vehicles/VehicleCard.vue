<template>
  <NuxtLink
    :to="`/vehicles/${vehicle.id}`"
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer overflow-hidden rounded-md"
  >
    <!-- Image -->
    <figure class="relative h-48">
      <img
        :src="vehicle.image_url"
        :alt="`${vehicle.make} ${vehicle.model}`"
        class="h-48 w-full object-cover rounded-t-md"
      />
      <!-- Badge de disponibilité -->
      <div class="absolute top-3 left-3">
        <div
          v-if="vehicle.isCurrentlyAvailable"
          class="badge bg-accent/70 text-accent-content border-accent/70 rounded-full px-3 py-1 font-medium"
        >
          <Icon name="mdi:check-circle" class="w-3 h-3 mr-1" />
          Disponible
        </div>
        <div
          v-else
          class="badge bg-primary/70 text-primary-content border-primary/70 rounded-full px-3 py-1 font-medium"
        >
          <Icon name="mdi:clock-outline" class="w-3 h-3 mr-1" />
          Non disponible
        </div>
      </div>
    </figure>

    <!-- Corps de la carte -->
    <div class="card-body p-4">
      <!-- Titre et prix -->
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="card-title text-lg font-bold">{{ vehicle.make }} {{ vehicle.model }}</h3>
          <div class="flex items-center text-sm text-base-content/70">
            <Icon name="mdi:map-marker" class="w-4 h-4 mr-1" />
            {{ vehicle.province }}
          </div>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-primary">
            {{ formatPrice(vehicle.price_per_day) }}
            <span class="text-sm text-base-content/70">Ar/jour</span>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-base-content/80 line-clamp-2">
        {{ vehicle.description }}
      </p>

      <!-- Caractéristiques avec icônes -->
      <div class="flex flex-wrap gap-2 mb-3">
        <div class="badge badge-accent badge-sm gap-1 rounded-full">
          <Icon name="mdi:car-shift-pattern" class="w-3 h-3" />
          {{ vehicle.transmission === 'manual' ? 'Manuelle' : 'Auto' }}
        </div>
        <div class="badge badge-accent badge-sm gap-1 rounded-full">
          <Icon name="mdi:car" class="w-3 h-3" />
          {{ vehicle.vehicle_type }}
        </div>
        <div v-if="vehicle.fuel_type" class="badge badge-accent badge-sm gap-1 rounded-full">
          <Icon :name="getFuelIcon(vehicle.fuel_type)" class="w-3 h-3" />
          {{ getFuelLabel(vehicle.fuel_type) }}
        </div>
        <div class="badge badge-accent badge-sm gap-1 rounded-full">
          <Icon name="mdi:account-group" class="w-3 h-3" />
          {{ vehicle.seats }} places
        </div>
        <div v-if="vehicle.consumption" class="badge badge-accent badge-sm gap-1 rounded-full">
          <Icon name="mdi:gas-station" class="w-3 h-3" />
          {{ vehicle.consumption }} L/100
        </div>
      </div>

      <!-- Équipements -->
      <div v-if="vehicle.features && vehicle.features.length > 0" class="flex items-center gap-2">
        <div class="badge badge-accent badge-sm rounded-full">
          +{{ vehicle.features.length }} équipements
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import type { Vehicle } from '~/types'
  import { FuelType, FUEL_TYPE_OPTIONS } from '~/types'

  defineProps<{
    vehicle: Vehicle
  }>()

  // Formatage du prix avec séparateurs de milliers
  const formatPrice = (price?: number) => {
    return new Intl.NumberFormat('fr-FR').format(price || 0)
  }

  // Icône selon le type de carburant
  const getFuelIcon = (fuelType?: string) => {
    switch (fuelType) {
      case FuelType.GASOLINE:
        return 'mdi:gas-station'
      case FuelType.DIESEL:
        return 'mdi:fuel'
      case FuelType.ELECTRIC:
        return 'mdi:lightning-bolt'
      case FuelType.HYBRID:
        return 'mdi:leaf'
      default:
        return 'mdi:gas-station'
    }
  }

  // Label selon le type de carburant
  const getFuelLabel = (fuelType?: string) => {
    const option = FUEL_TYPE_OPTIONS.find(opt => opt.value === fuelType)
    return option ? option.label : 'Essence'
  }
</script>

<style scoped>
  /* Texte tronqué sur 2 lignes avec effet de dégradé en bas */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    /* Effet de profondeur : dégradé transparent vers le bas pour indiquer qu'il y a plus de contenu */
    -webkit-mask-image: linear-gradient(180deg, #000 70%, transparent);
    mask-image: linear-gradient(180deg, #000 70%, transparent);
  }
</style>
