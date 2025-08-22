<template>
  <div v-if="unavailabilities.length > 0" class="mt-8">
    <h4 class="font-semibold mb-4 text-gray-700">
      Périodes d'indisponibilité définies ({{ unavailabilities.length }})
    </h4>

    <!-- Zone de scroll avec hauteur limitée -->
    <div class="max-h-[400px] overflow-y-auto pr-2 space-y-3">
      <div
        v-for="availability in unavailabilities"
        :key="availability.id"
        class="bg-base-100 border border-base-300 rounded-lg p-4 flex items-center justify-between"
      >
        <!-- Informations de la période -->
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <Icon name="mdi:calendar-remove" class="w-5 h-5 text-orange-500" />
            <span class="font-medium">
              {{ formatDate(new Date(availability.start_date)) }} -
              {{ formatDate(new Date(availability.end_date)) }}
            </span>
          </div>
          <div class="text-sm text-gray-600">
            {{ getDurationText(availability.start_date, availability.end_date) }}
            <span v-if="hasActiveBookingsForAvailability(availability)" class="ml-2 text-warning">
              • Contient des réservations
            </span>
          </div>
        </div>

        <!-- Actions avec icônes seules -->
        <div class="flex items-center gap-1">
          <button
            class="btn btn-sm btn-ghost btn-square"
            :disabled="hasActiveBookingsForAvailability(availability)"
            :title="
              hasActiveBookingsForAvailability(availability)
                ? 'Impossible de modifier (contient des réservations)'
                : 'Modifier cette période'
            "
            @click="$emit('edit', availability)"
          >
            <Icon name="mdi:pencil" class="w-4 h-4" />
          </button>
          <button
            class="btn btn-sm btn-error btn-outline btn-square"
            :disabled="hasActiveBookingsForAvailability(availability)"
            :title="
              hasActiveBookingsForAvailability(availability)
                ? 'Impossible de supprimer (contient des réservations)'
                : 'Supprimer cette période'
            "
            @click="$emit('delete', availability)"
          >
            <Icon name="mdi:delete" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Availability } from '~/types'

  const { formatDate, getDurationText } = useCalendarDates()

  defineProps<{
    unavailabilities: Availability[]
    hasActiveBookingsForAvailability: (availability: Availability) => boolean
  }>()

  defineEmits<{
    edit: [availability: Availability]
    delete: [availability: Availability]
  }>()
</script>
