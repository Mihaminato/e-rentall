<template>
  <div class="relative h-full">
    <!-- Si plusieurs photos -->
    <div v-if="photos && photos.length > 1" class="vehicle-swiper h-full">
      <swiper
        :slides-per-view="1"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :navigation="true"
        :modules="[Pagination, Navigation, Autoplay]"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        :effect="'fade'"
        class="h-full"
      >
        <swiper-slide v-for="(photo, index) in sortedPhotos" :key="index" class="h-full">
          <div class="relative h-full">
            <img
              :src="getPhotoUrl(photo)"
              :alt="`${vehicleName} - Photo ${index + 1}`"
              class="cursor-pointer w-full h-full object-cover"
              @click="openImagePreview(sortedPhotos, index)"
            />
            <div
              v-if="photo.is_primary"
              class="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full"
            >
              <Icon name="mdi:star" class="w-3 h-3 mr-1" />Principal
            </div>
          </div>
        </swiper-slide>

        <!-- Indicateur de navigation sur mobile -->
        <div class="swiper-pagination"></div>
      </swiper>

      <!-- Indications nombre de photos -->
      <div class="photo-indicator" @click="openImagePreview(sortedPhotos, 0)">
        <Icon name="mdi:image-multiple" class="w-4 h-4 mr-1" />
        {{ photos.length }} photos
      </div>
    </div>

    <!-- Si une seule photo -->
    <div v-else-if="photos && photos.length === 1" class="w-full h-full">
      <img
        :src="getPhotoUrl(photos[0])"
        :alt="vehicleName"
        class="cursor-pointer w-full h-full object-cover"
        @click="openImagePreview(photos, 0)"
      />
      <div
        v-if="photos[0].is_primary"
        class="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full"
      >
        <Icon name="mdi:star" class="w-3 h-3 mr-1" />Principal
      </div>
    </div>

    <!-- Si aucune photo -->
    <div v-else class="w-full h-full bg-base-200 flex items-center justify-center">
      <div class="text-center text-base-content/50">
        <Icon name="mdi:image-off" class="w-8 h-8 mx-auto mb-2" />
        <p>Aucune photo</p>
      </div>
    </div>
  </div>

  <!-- Modale d'images pour afficher toutes les photos -->
  <UiImageModal :modal-id="modalId" :images="currentImageUrls" :initial-index="currentImageIndex" />
</template>
<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Pagination, Navigation, Autoplay } from 'swiper/modules'
  import type { VehiclePhoto } from '~/types'
  import type { SupabaseClient } from '@supabase/supabase-js'
  // Import Swiper styles
  import 'swiper/css'
  import 'swiper/css/pagination'
  import 'swiper/css/navigation'
  import '~/assets/css/swiper-custom.css'

  interface Props {
    photos: VehiclePhoto[]
    vehicleName: string
    vehicleId?: string
  }

  const props = defineProps<Props>()

  // ID unique du modal pour ce véhicule
  const modalId = computed(() => `photo-carousel-modal-${props.vehicleId || 'default'}`)

  // État pour la prévisualisation d'image
  const currentImageUrls = ref<string[]>([])
  const currentImageIndex = ref(0)
  // Fonction pour générer l'URL d'une photo à partir d'un objet VehiclePhoto
  const getPhotoUrl = (photo: VehiclePhoto): string => {
    const supabase = useNuxtApp().$supabase as SupabaseClient

    if (photo && photo.file_path) {
      return supabase.storage.from('cars').getPublicUrl(photo.file_path).data.publicUrl
    }

    return 'https://placehold.co/600x400?text=Véhicule'
  }

  // Fonction pour obtenir un tableau trié des photos (photo principale en premier)
  const sortedPhotos = computed(() => {
    if (!props.photos || props.photos.length === 0) {
      return []
    }

    // Copier le tableau pour éviter de modifier l'original
    const photosCopy = [...props.photos]

    // Trier avec la photo principale en premier
    return photosCopy.sort((a, b) => {
      if (a.is_primary) return -1
      if (b.is_primary) return 1
      return 0
    })
  })

  const openImagePreview = (vehiclePhotos: VehiclePhoto[] | undefined, startIndex = 0) => {
    if (vehiclePhotos && vehiclePhotos.length > 0) {
      currentImageUrls.value = vehiclePhotos.map(photo => getPhotoUrl(photo))
      currentImageIndex.value = startIndex

      // Ouvrir le modal DaisyUI avec l'ID unique
      const modal = document.getElementById(modalId.value) as HTMLDialogElement
      if (modal) {
        modal.showModal()
      }
    }
  }
</script>
