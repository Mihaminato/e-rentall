<template>
  <div class="card bg-base-100 shadow-md mb-6">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- <UiFormInput
          v-model="editableFilters.searchTerm"
          type="text"
          placeholder="Véhicule, locataire, propriétaire..."
          label="Rechercher"
        /> -->

        <UiFormSelect v-model="editableFilters.status" :options="statusOptions" label="Statut" />

        <UiFormSelect v-model="editableFilters.period" :options="periodOptions" label="Période" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  export interface BookingFilters {
    searchTerm: string
    status: string
    period: string
  }

  const props = defineProps<{
    modelValue: BookingFilters
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: BookingFilters): void
  }>()

  const editableFilters = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
    }
  })

  const statusOptions = ref([
    { value: '', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente validation' },
    { value: 'owner_approved', label: 'Approuvé par propriétaire' },
    { value: 'confirmed', label: 'Confirmé' },
    { value: 'active', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' }
  ])

  const periodOptions = ref([
    { value: '', label: 'Toutes les périodes' },
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'past', label: 'Passées' }
  ])
</script>
