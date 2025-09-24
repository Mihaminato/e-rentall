<template>
  <div class="space-y-4">
    <h3 class="font-bold text-lg">Documents du véhicule</h3>

    <div v-if="isLoading" class="flex justify-center p-4">
      <div class="loading loading-spinner loading-sm"></div>
    </div>

    <div v-else-if="documents.length === 0" class="text-center p-4 text-base-content/60">
      <Icon name="mdi:file-document" class="w-12 h-12 mx-auto mb-2 opacity-50" />
      <p>Aucun document disponible</p>
    </div>

    <div v-else class="grid gap-3">
      <div
        v-for="document in documents"
        :key="document.id"
        class="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
      >
        <div class="flex items-center gap-3">
          <Icon :name="getDocumentIcon(document.type)" class="w-6 h-6 text-primary" />
          <div>
            <p class="font-medium">{{ getDocumentTypeName(document.type) }}</p>
            <p class="text-sm text-base-content/70">
              {{ formatDocumentDate(document.created_at) }}
            </p>
          </div>
        </div>

        <button
          class="btn btn-sm btn-outline btn-primary"
          @click="$emit('viewDocument', document.id, document.file_path)"
        >
          <Icon name="mdi:eye" class="w-4 h-4" />
          Voir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'

  interface VehicleDocument {
    id: string
    vehicle_id: string
    type: string
    file_path: string
    created_at: string
  }

  defineProps<{
    documents: VehicleDocument[]
    isLoading?: boolean
  }>()

  defineEmits<{
    viewDocument: [id: string, filePath: string]
  }>()

  const getDocumentTypeName = (type: string): string => {
    const typeNames: Record<string, string> = {
      vehicle_registration: 'Carte grise',
      technical_inspection: 'Visite technique'
    }
    return typeNames[type] || 'Document inconnu'
  }

  const getDocumentIcon = (type: string): string => {
    const typeIcons: Record<string, string> = {
      vehicle_registration: 'mdi:card-text-outline',
      technical_inspection: 'mdi:clipboard-check-outline'
    }
    return typeIcons[type] || 'mdi:file-document-outline'
  }

  const formatDocumentDate = (dateString: string): string => {
    return dayjs(dateString).format('DD/MM/YYYY')
  }
</script>
