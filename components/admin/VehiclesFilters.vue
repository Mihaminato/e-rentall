<template>
  <div class="card bg-base-100 shadow-md mb-6">
    <div class="card-body">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <UiFormInput
          v-model="internalFilters.searchTerm"
          label="Rechercher"
          placeholder="Marque, modèle, propriétaire..."
          class="w-full"
        />

        <UiFormSelect
          v-model="internalFilters.status"
          label="Statut"
          :options="statusOptions"
          class="w-full"
        />

        <UiFormSelect
          v-model="internalFilters.type"
          label="Type"
          :options="vehicleTypeOptions"
          class="w-full"
        />

        <UiFormSelect
          v-model="internalFilters.location"
          label="Ville"
          :options="cityOptions"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AdminFilters } from '~/composables/useVehicles'
  import { VEHICLE_TYPE_OPTIONS, CITY_OPTIONS } from '~/types'

  type InternalFilters = Omit<AdminFilters, 'status'> & { status: string }

  const props = defineProps<{
    modelValue: AdminFilters
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: AdminFilters): void
  }>()

  // State local pour gérer les filtres, avec status en string pour le select
  const internalFilters = ref<InternalFilters>({
    ...props.modelValue,
    status: typeof props.modelValue.status === 'boolean' ? String(props.modelValue.status) : ''
  })

  // Surveiller les changements locaux pour notifier le parent
  watch(
    internalFilters,
    newFilters => {
      emit('update:modelValue', {
        ...newFilters,
        status: newFilters.status === 'true' ? true : newFilters.status === 'false' ? false : ''
      })
    },
    { deep: true }
  )

  // Options pour les selects, avec "Tous" en premier
  const statusOptions = ref([
    { value: '', label: 'Tous les statuts' },
    { value: 'true', label: 'Actif' },
    { value: 'false', label: 'Inactif' }
  ])

  const vehicleTypeOptions = ref([{ value: '', label: 'Tous les types' }, ...VEHICLE_TYPE_OPTIONS])
  const cityOptions = ref([{ value: '', label: 'Toutes les villes' }, ...CITY_OPTIONS])
</script>
