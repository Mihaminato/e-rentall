<template>
  <dialog :open="modelValue" class="modal" @close="closeModal">
    <div class="modal-box max-w-4xl">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-lg mb-4">Détails du véhicule</h3>
      <div v-if="vehicle" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Colonne Gauche: Carrousel -->
          <div class="h-64 md:h-auto rounded-lg overflow-hidden">
            <VehiclesPhotoCarousel
              :photos="vehicle.vehicle_photos || []"
              :vehicle-name="`${vehicle.make} ${vehicle.model}`"
              :vehicle-id="vehicle.id"
            />
          </div>

          <!-- Colonne Droite: Infos -->
          <div class="flex flex-col space-y-4">
            <div>
              <h4 class="text-2xl font-bold">{{ vehicle.make }} {{ vehicle.model }}</h4>
              <p class="text-base-content/70">{{ vehicle.year }}</p>
            </div>

            <div class="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Transmission:</strong> {{ vehicle.transmission }}</div>
              <div><strong>Carburant:</strong> {{ vehicle.fuel_type }}</div>
              <div><strong>Type:</strong> {{ getTypeLabel(vehicle.vehicle_type) }}</div>
              <div><strong>Places:</strong> {{ vehicle.seats }}</div>
              <div><strong>Kilométrage:</strong> {{ vehicle.mileage }} km</div>
              <div><strong>Prix/jour:</strong> {{ vehicle.price_per_day }} Ar</div>
              <div class="col-span-2">
                <strong>Immatriculation:</strong> {{ vehicle.license_plate }}
              </div>
            </div>

            <div v-if="vehicle.description">
              <h5 class="font-semibold mb-1">Description</h5>
              <p class="text-sm text-base-content/80">
                {{ vehicle.description }}
              </p>
            </div>

            <!-- Infos Propriétaire -->
            <div v-if="vehicle.owner">
              <h5 class="font-semibold mb-2">Propriétaire</h5>
              <NuxtLink
                :to="`/users/${vehicle.owner.id}`"
                class="card p-2 rounded-md hover:bg-base-300 bg-base-200 border-x-2 border-x-primary/50"
              >
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-10 h-10">
                      <img
                        :src="
                          vehicle.owner.avatar_url ||
                          'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                        "
                        :alt="`${vehicle.owner.first_name} ${vehicle.owner.last_name}`"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-medium">
                      {{ vehicle.owner.first_name }}
                      {{ vehicle.owner.last_name }}
                    </div>
                    <div class="text-sm opacity-70">{{ vehicle.owner.email }}</div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-action mt-6">
        <!-- Boutons de modération -->
        <button
          v-if="vehicle && !vehicle.is_active"
          class="btn btn-success"
          :disabled="isModerating"
          @click="activateVehicle"
        >
          <span v-if="isModerating" class="loading loading-spinner"></span>
          <Icon v-else name="mdi:check" class="w-4 h-4" />
          Approuver le véhicule
        </button>
        <button
          v-if="vehicle && vehicle.is_active"
          class="btn btn-warning"
          :disabled="isModerating"
          @click="suspendVehicle"
        >
          <span v-if="isModerating" class="loading loading-spinner"></span>
          <Icon v-else name="mdi:pause" class="w-4 h-4" />
          Suspendre le véhicule
        </button>
        <button class="btn btn-ghost ml-2" @click="closeModal">Fermer</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
  import { useVehicles } from '~/composables/useVehicles'
  import type { Vehicle } from '~/types'
  import VehiclesPhotoCarousel from '~/components/vehicles/PhotoCarousel.vue'

  const props = defineProps<{
    modelValue: boolean
    vehicle: Vehicle | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'vehicle-updated'): void
  }>()

  const { moderateVehicle } = useVehicles()
  const isModerating = ref(false)

  const closeModal = () => {
    emit('update:modelValue', false)
  }

  const suspendVehicle = async () => {
    if (!props.vehicle || isModerating.value) return
    isModerating.value = true
    try {
      await moderateVehicle(props.vehicle.id, false)
      emit('vehicle-updated')
    } finally {
      isModerating.value = false
    }
  }

  const activateVehicle = async () => {
    if (!props.vehicle || isModerating.value) return
    isModerating.value = true
    try {
      await moderateVehicle(props.vehicle.id, true)
      emit('vehicle-updated')
    } finally {
      isModerating.value = false
    }
  }

  const getTypeLabel = (type: string | undefined) => {
    if (!type) return 'N/A'
    const labels = {
      sedan: 'Berline',
      suv: 'SUV',
      hatchback: 'Citadine',
      pickup: 'Pick-up'
    }
    return labels[type as keyof typeof labels] || type
  }
</script>
