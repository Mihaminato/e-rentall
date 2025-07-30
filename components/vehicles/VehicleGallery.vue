<template>
  <div class="card bg-base-100 shadow-lg overflow-hidden border border-accent/20 shadow-accent/10">
    <div class="relative">
      <!-- Photo principale -->
      <div
        class="aspect-video bg-base-200 relative group cursor-pointer"
        @click="$emit('openModal', selectedPhotoIndex)"
      >
        <img
          v-if="mainPhoto"
          :src="getPhotoUrl(mainPhoto)"
          :alt="`${vehicleName}`"
          class="w-full h-full object-cover"
        />
        <div v-else class="flex items-center justify-center h-full text-base-content/50">
          <Icon name="mdi:car" class="w-16 h-16" />
        </div>

        <!-- Overlay pour zoom -->
        <div
          class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center"
        >
          <Icon
            name="mdi:magnify"
            class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          />
        </div>
      </div>

      <!-- Miniatures -->
      <div v-if="photos.length > 1" class="p-4">
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="(photo, index) in photos"
            :key="photo.id"
            class="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 hover:border-primary transition-colors"
            :class="{
              'border-primary': index === selectedPhotoIndex,
              'border-base-300': index !== selectedPhotoIndex
            }"
            @click="$emit('selectPhoto', index)"
          >
            <img :src="getPhotoUrl(photo.file_path)" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { VehiclePhoto } from '~/types'
  import type { SupabaseClient } from '@supabase/supabase-js'
  interface Props {
    photos: VehiclePhoto[]
    vehicleName: string
    selectedPhotoIndex: number
  }

  const props = defineProps<Props>()

  // Photo principale
  const mainPhoto = computed(() => {
    if (props.photos.length === 0) return null
    return props.photos[props.selectedPhotoIndex]?.file_path || props.photos[0].file_path
  })

  // Fonction pour obtenir l'URL publique d'une photo
  const getPhotoUrl = (filePath: string) => {
    const supabase = useNuxtApp().$supabase as SupabaseClient
    const { data } = supabase.storage.from('cars').getPublicUrl(filePath)
    return data.publicUrl
  }
</script>
