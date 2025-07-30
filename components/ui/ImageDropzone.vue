<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text font-medium">{{ label }}</span>
    </label>
    <label
      :class="[
        'flex justify-center items-center px-4 py-6 w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-200 transition-all duration-200',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'border-primary hover:border-primary-focus': !disabled,
          'border-primary bg-primary/5': isDragging
        }
      ]"
      @dragover.prevent="isDragging = true; emit('dragging-change', true);"
      @dragleave.prevent="isDragging = false; emit('dragging-change', false);"
      @drop.prevent="onDrop($event); emit('drop', $event);"
    >
      <div class="flex flex-col items-center justify-center">
        <Icon
          :name="isDragging ? 'mdi:cloud-upload' : 'mdi:image-plus'"
          class="h-10 w-10 mb-2 text-primary transition-all"
        />
        <p class="text-sm font-medium">
          {{ isDragging ? 'Déposez les images ici' : 'Glissez-déposez ou cliquez pour ajouter' }}
        </p>
        <p class="text-xs text-gray-500 mt-1">{{ helperText }}</p>
      </div>
      <input
        class="hidden"
        type="file"
        multiple
        accept="image/*"
        :disabled="disabled"
        @change="onInputChange"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
  const isDragging = ref(false)

  const props = defineProps<{
    label: string
    helperText: string
    disabled: boolean
    maxFileSize?: number
  }>()

  const emit = defineEmits<{
    (e: 'files-selected', files: File[]): void
    (e: 'drop', event: DragEvent): void
    (e: 'dragging-change', isDragging: boolean): void
  }>()

  // Gérer le glisser-déposer
  const onDrop = (event: DragEvent) => {
    isDragging.value = false

    const files = event.dataTransfer?.files
    if (!files || files.length === 0) return

    // Traiter les fichiers déposés
    processFiles(files)
  }

  // Gérer le changement dans l'input file
  const onInputChange = (event: Event) => {
    const targetInput = event.target as HTMLInputElement
    const selectedFiles = targetInput.files

    if (!selectedFiles || selectedFiles.length === 0) return

    processFiles(selectedFiles)

    // Réinitialiser l'input
    targetInput.value = ''
  }

  // Traiter les fichiers et émettre uniquement les fichiers valides
  const processFiles = (fileList: FileList) => {
    // Filtrer les fichiers valides (images de taille correcte)
    const validFiles = Array.from(fileList).filter(file => {
      // Vérifier la taille du fichier
      const isValidSize = !props.maxFileSize || file.size <= props.maxFileSize
      // Vérifier que c'est une image
      const isImage = file.type.startsWith('image/')

      return isValidSize && isImage
    })

    // Émettre l'événement avec les fichiers valides
    if (validFiles.length > 0) {
      emit('files-selected', validFiles)
    }
  }
</script>
