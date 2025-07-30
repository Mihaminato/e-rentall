<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <h2 class="card-title mb-4">Caractéristiques</h2>
      <div class="flex flex-wrap gap-2">
        <div v-for="spec in specs" :key="spec.label">
          <Icon :name="spec.icon" class="mr-2" />
          {{ spec.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Vehicle } from '~/types'

  const props = defineProps<{
    vehicle: Vehicle
  }>()

  const specs = computed(() => {
    const vehicleSpecs = [
      {
        icon: 'mdi:car-shift-pattern',
        label: 'Transmission',
        value: props.vehicle.transmission === 'automatic' ? 'Automatique' : 'Manuelle'
      },
      { icon: 'mdi:car-door', label: 'Type', value: props.vehicle.vehicle_type },
      { icon: 'mdi:account-group', label: 'Places', value: `${props.vehicle.seats} places` },
      {
        icon: 'mdi:card-text-outline',
        label: 'Plaque',
        value: props.vehicle.license_plate?.toUpperCase()
      },
      { icon: 'mdi:gas-station', label: 'Carburant', value: props.vehicle.fuel_type },
      {
        icon: 'mdi:speedometer',
        label: 'Consommation',
        value: `${props.vehicle.consumption} L/100km`
      }
    ]
    return vehicleSpecs.filter(spec => spec.value)
  })
</script>
