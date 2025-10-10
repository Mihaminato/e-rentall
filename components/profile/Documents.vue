<template>
  <div class="mt-8">
    <div class="overflow-x-auto">
      <table class="table table-sm w-full">
        <thead>
          <tr>
            <th>Type de Document</th>
            <th>Statut</th>
            <th v-if="!isReadOnly" class="text-right">Actions</th>
            <th v-else class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in documents" :key="doc.id" class="hover">
            <td class="font-medium">
              {{ getDocumentTypeName(doc.type) }}
            </td>
            <td>
              <span
                :class="[
                  'badge badge-sm h-auto',
                  doc.is_verified ? 'badge-success' : 'badge-warning'
                ]"
              >
                {{ doc.is_verified ? 'Vérifié' : 'En attente' }}
              </span>
            </td>
            <td class="text-right">
              <button
                class="btn btn-xs btn-ghost"
                title="Visualiser le document"
                @click="$emit('viewDocument', doc.id, doc.file_path || '')"
              >
                <Icon name="mdi:eye" class="w-4 h-4" />
              </button>
              <button
                v-if="!isReadOnly && !doc.is_verified"
                class="btn btn-xs btn-ghost text-error"
                title="Supprimer le document"
                @click="confirmDelete(doc)"
              >
                <Icon name="mdi:delete" class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!isReadOnly" class="mt-4 text-base-100">
      <p v-if="documents.length === 0 && isProfileComplete" class="py-4 text-center">
        Aucun document téléchargé.
      </p>

      <!-- Alerte si le profil n'est pas complet -->
      <UiProfileVerificationCard
        v-if="!isProfileComplete"
        text="Veuillez compléter toutes vos informations personnelles avant de pouvoir ajouter des documents. (CIN, Date de délivrance CIN, NIF, STAT)"
      />
      <!-- Indication pour l'insertion obligatoire des documents -->
      <div 
        v-if="isProfileComplete && missingDocumentTypes.length > 0" 
        class="alert alert-info text-sm mt-4 mb-2 p-3"
      >
        <Icon name="mdi:information-outline" class="w-5 h-5" />
        <div>
          Veuillez insérer tous les documents requis pour la validation de votre compte. 
          Ces documents sont obligatoires pour l'ajout de véhicules.
        </div>
      </div>
      <!-- Bouton d'ajout -->
      <button
        v-if="isProfileComplete"
        class="btn btn-primary btn-sm mt-4"
        :disabled="missingDocumentTypes.length === 0 && documents.length > 0"
        @click="$emit('showUploadModal')"
      >
        <Icon name="mdi:plus-circle-outline" class="mr-2" />
        Ajouter un document
      </button>
      <p
        v-if="isProfileComplete && missingDocumentTypes.length === 0 && documents.length > 0"
        class="text-xs text-base-content/60 mt-2"
      >
        Tous les documents requis ont été fournis.
      </p>
    </div>

    <!-- Modal de confirmation -->
    <UiConfirmationModal
      :visible="isDeleteModalVisible"
      title="Supprimer le document ?"
      :message="`Êtes-vous sûr de vouloir supprimer le document : ${
        docToDelete ? getDocumentTypeName(docToDelete.type) : ''
      } ?`"
      confirm-text="Supprimer"
      :loading="loading"
      @confirm="proceedWithDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Document } from '~/types'
  import useProfile from '~/composables/useProfile'

  defineProps<{
    isReadOnly?: boolean
    isProfileComplete: boolean    
  }>()

  // Utilisation de l'état partagé depuis le composable singleton
  const { documents, documentTypes, loading, errorMessage, missingDocumentTypes, deleteDocument } =
    useProfile()

  const emit = defineEmits<{
    (e: 'showUploadModal'): void
    (e: 'viewDocument', id: string, path: string): void
    (e: 'delete-success' | 'delete-error', message: string): void
  }>()

  const isDeleteModalVisible = ref(false)
  const docToDelete = ref<Document | null>(null)

  const getDocumentTypeName = (type: string): string => {
    const names: { [key: string]: string } = {
      nif: "Numéro d'Identification Fiscale (NIF)",
      stat: 'Numéro Statistique (STAT)'
    }
    return names[type] || documentTypes[type as keyof typeof documentTypes] || 'Document inconnu'
  }

  const confirmDelete = (doc: Document) => {
    docToDelete.value = doc
    isDeleteModalVisible.value = true
  }

  const cancelDelete = () => {
    isDeleteModalVisible.value = false
    docToDelete.value = null
  }

  const proceedWithDelete = async () => {
    if (docToDelete.value) {
      const success = await deleteDocument(docToDelete.value.id, docToDelete.value.file_path || '')
      if (success) {
        emit('delete-success', 'Document supprimé avec succès.')
      } else {
        emit('delete-error', errorMessage.value || 'Erreur lors de la suppression.')
      }
      cancelDelete()
    }
  }
</script>
