<template>
  <div class="grid grid-cols-3 gap-4 mt-4">
    <div
      v-for="(preview, index) in photos"
      :key="index"
      class="relative border border-base-300 rounded-lg overflow-hidden h-32"
    >
      <img
        :src="preview.url"
        alt="Aperçu de la photo"
        class="w-full h-full object-cover"
      />
      <button
        type="button"
        class="absolute top-1 right-1 btn btn-circle btn-xs btn-error"
        @click="$emit('remove', index)"
      >
        <Icon name="mdi:close" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PhotoPreview } from '~/types'

defineProps<{
  photos: PhotoPreview[]
  maxPhotos?: number
}>()

defineEmits<{
  (e: 'remove', index: number): void
}>()
</script>
