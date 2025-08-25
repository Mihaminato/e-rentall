<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Véhicule</th>
          <th>Propriétaire</th>
          <th>Localisation</th>
          <th>Prix/jour</th>
          <th>Statut</th>
          <th class="text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          class="hover cursor-pointer"
          @click="$emit('view-vehicle', vehicle)"
        >
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img
                    :src="
                      getPrimaryImageUrl(vehicle) ||
                      'https://via.placeholder.com/200x120/cccccc/333333?text=No+Image'
                    "
                    :alt="`${vehicle.make} ${vehicle.model}`"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ vehicle.make }} {{ vehicle.model }}</div>
                <div class="text-sm opacity-50">
                  {{ vehicle.year }} • {{ vehicle.transmission }}
                </div>
              </div>
            </div>
          </td>
          <td>
            <div v-if="vehicle.owner" class="flex items-center space-x-3">
              <UiUserAvatar
                :avatar-path="vehicle.owner.avatar_url"
                :first-name="vehicle.owner.first_name"
                :last-name="vehicle.owner.last_name"
                size-class="w-10 h-10"
              />
              <div>
                <div class="font-medium">
                  {{ vehicle.owner.first_name }} {{ vehicle.owner.last_name }}
                </div>
                <div class="text-sm opacity-50">{{ vehicle.owner.email }}</div>
                <div class="text-sm opacity-50">{{ vehicle.owner.phone }}</div>
              </div>
            </div>
            <div v-else class="text-sm opacity-50">Propriétaire non défini</div>
          </td>
          <td>{{ vehicle.province }}</td>
          <td>
            <div class="font-semibold">{{ vehicle.price_per_day }} Ar</div>
          </td>
          <td>
            <div class="badge" :class="getStatusClass(!!vehicle.is_active)">
              {{ getStatusLabel(!!vehicle.is_active) }}
            </div>
          </td>
          <td class="text-right">
            <button
              class="btn btn-ghost btn-sm text-error"
              @click.stop="$emit('delete-vehicle', vehicle.id)"
            >
              <Icon name="mdi:delete" class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { Vehicle } from '~/types'

  const { $supabase } = useNuxtApp()

  defineProps<{
    vehicles: Vehicle[]
  }>()

  defineEmits<{
    (e: 'view-vehicle', vehicle: Vehicle): void
    (e: 'delete-vehicle', vehicleId: string): void
  }>()

  function getPrimaryImageUrl(vehicle: Vehicle): string | null {
    if (!vehicle.vehicle_photos || vehicle.vehicle_photos.length === 0) {
      return null
    }

    const primaryPhoto = vehicle.vehicle_photos.find(p => p.is_primary) || vehicle.vehicle_photos[0]

    if (!primaryPhoto || !primaryPhoto.file_path) {
      return null
    }

    const { data } = $supabase.storage.from('cars').getPublicUrl(primaryPhoto.file_path)

    return data.publicUrl
  }

  // Helper functions for status rendering
  function getStatusClass(isActive: boolean) {
    return isActive ? 'badge-success' : 'badge-error'
  }

  function getStatusLabel(isActive: boolean) {
    return isActive ? 'Actif' : 'Inactif'
  }
</script>
