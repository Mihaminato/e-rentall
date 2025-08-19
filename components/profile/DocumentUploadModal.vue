<template>
  <div v-if="visible" class="modal modal-open">
    <div class="modal-box w-11/12 max-w-lg">
      <h3 class="font-bold text-lg">Ajouter des documents</h3>

      <div v-if="missingDocumentTypes.length > 0">
        <p class="py-4">Veuillez sélectionner les fichiers pour les documents manquants.</p>
        <div
          v-for="docType in missingDocumentTypes"
          :key="docType"
          class="form-control w-full mb-4"
        >
          <label class="label">
            <span class="label-text">{{ getDocumentTypeName(docType) }} <span class="text-xs text-base-content/60">(fichier PDF uniquement)</span></span>
          </label>
          <input
            type="file"
            class="file-input file-input-bordered w-full"
            accept="application/pdf"
            @change="handleFileChange($event, docType)"
          />
          <div v-if="fileErrors[docType]" class="label">
            <span class="label-text-alt text-error text-sm mt-2">{{ fileErrors[docType] }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="py-4 text-center text-success">
          <Icon name="mdi:check-circle" class="w-6 h-6 mr-2" />
          Vous avez déjà fourni tous les documents requis.
        </p>
      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" @click="closeModal">Annuler</button>
        <button
          class="btn btn-primary"
          :class="{ 'btn-disabled': Object.keys(filesToUpload).length === 0 }"
          :disabled="Object.keys(filesToUpload).length === 0 || hasErrors || loading"
          @click="uploadDocuments"
        >
          <span v-if="loading" class="loading loading-spinner"></span>
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useProfile from '~/composables/useProfile'

  const props = defineProps<{
    visible: boolean
  }>()

  const emit = defineEmits(['close', 'upload-success'])

  const { loading, documentTypes, missingDocumentTypes } = useProfile()

  const filesToUpload = ref<Record<string, File>>({})
  const fileErrors = ref<Record<string, string>>({})

  const hasErrors = computed(() => Object.keys(fileErrors.value).some(key => fileErrors.value[key]))

  const getDocumentTypeName = (type: string) => {
    return documentTypes[type as keyof typeof documentTypes] || type
  }

  const handleFileChange = (event: Event, docType: string) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const file = target.files[0]

      // Validation simple : vérifier si c'est un PDF
      if (file.type !== 'application/pdf') {
        fileErrors.value[docType] = 'Veuillez sélectionner un fichier PDF.'
        target.value = '' // Réinitialiser l'input
        const { [docType]: _, ...rest } = filesToUpload.value
        filesToUpload.value = rest
        return
      }

      // Fichier valide
      fileErrors.value[docType] = ''
      filesToUpload.value[docType] = file
    } else {
      const { [docType]: _, ...rest } = filesToUpload.value
      filesToUpload.value = rest
      fileErrors.value[docType] = ''
    }
  }
  const uploadDocuments = async () => {
    if (Object.keys(filesToUpload.value).length === 0) return

    emit('upload-success', filesToUpload.value)
  }

  const closeModal = () => {
    filesToUpload.value = {}
    emit('close')
  }

  // Réinitialiser les fichiers si la modale est fermée de l'extérieur
  watch(
    () => props.visible,
    newValue => {
      if (!newValue) {
        filesToUpload.value = {}
      }
    }
  )
</script>
