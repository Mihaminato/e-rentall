<template>
  <div class="card bg-base-100 shadow-md mb-6">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UiFormInput
          v-model="editableFilters.searchQuery"
          type="text"
          placeholder="Rechercher par nom ou email..."
          label="Rechercher"
        />

        <UiFormSelect v-model="editableFilters.status" :options="statusOptions" label="Statut" />

        <UiFormSelect v-model="editableFilters.role" :options="roleOptions" label="Rôle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { UserFilters } from '~/composables/useAdminUsers'

  const props = defineProps<{
    modelValue: UserFilters
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: UserFilters): void
  }>()

  const editableFilters = computed({
    get: () => props.modelValue,
    set: value => {
      emit('update:modelValue', value)
    }
  })

  // Options pour les filtres
  const statusOptions = ref([
    { value: 'all', label: 'Tous les statuts' },
    { value: 'verified', label: 'Vérifiés' },
    { value: 'pending', label: 'En attente' }
  ])

  const roleOptions = ref([
    { value: 'all', label: 'Tous les rôles' },
    { value: 'admin', label: 'Administrateurs' },
    { value: 'user', label: 'Utilisateurs' }
  ])
</script>
