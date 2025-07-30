<template>
  <div>
    <dialog :id="modalId" class="modal">
      <div class="modal-box w-11/12 max-w-5xl h-5/6 p-0 bg-black">
        <!-- Header avec bouton fermer -->
        <div class="absolute top-4 right-4 z-10">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </form>
        </div>

        <!-- Navigation gauche/droite -->
        <div
          v-if="images.length > 1"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        >
          <button
            class="btn btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70"
            @click="previousImage"
          >
            <Icon name="mdi:chevron-left" class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="images.length > 1"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
        >
          <button
            class="btn btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70"
            @click="nextImage"
          >
            <Icon name="mdi:chevron-right" class="w-6 h-6" />
          </button>
        </div>

        <!-- Image principale -->
        <div class="w-full h-full flex items-center justify-center">
          <img
            :src="currentImageUrl"
            :alt="`Photo ${currentIndex + 1}`"
            class="max-w-full max-h-full object-contain cursor-zoom-in"
            @click="zoomImage"
          />
        </div>

        <!-- Indicateurs de pagination -->
        <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div class="flex space-x-2">
            <button
              v-for="(_, index) in images"
              :key="index"
              class="w-2 h-2 rounded-full transition-colors"
              :class="index === currentIndex ? 'bg-white' : 'bg-white/50'"
              @click="goToImage(index)"
            ></button>
          </div>
        </div>

        <!-- Compteur -->
        <div
          v-if="images.length > 1"
          class="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm"
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Backdrop pour fermer -->
      <form method="dialog" class="modal-backdrop">
        <button type="button">close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modalId: string
    images: string[]
    initialIndex?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    initialIndex: 0
  })

  const currentIndex = ref(props.initialIndex)

  const currentImageUrl = computed(() => {
    if (props.images.length === 0) return ''
    return props.images[currentIndex.value] || props.images[0]
  })

  // Navigation
  const nextImage = () => {
    if (props.images.length > 1) {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }
  }

  const previousImage = () => {
    if (props.images.length > 1) {
      currentIndex.value =
        currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
    }
  }

  const goToImage = (index: number) => {
    currentIndex.value = index
  }

  const zoomImage = () => {
    // Pour l'instant, on peut ajouter une fonctionnalité de zoom plus tard
    console.log('Zoom image functionality to be implemented')
  }

  // Réinitialiser l'index quand les images changent
  watch(
    () => props.images,
    () => {
      currentIndex.value = 0
    }
  )

  // Réinitialiser l'index quand initialIndex change
  watch(
    () => props.initialIndex,
    newIndex => {
      currentIndex.value = newIndex
    }
  )

  // Gestion des touches clavier
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      previousImage()
    } else if (event.key === 'ArrowRight') {
      nextImage()
    } else if (event.key === 'Escape') {
      const modal = document.getElementById(props.modalId) as HTMLDialogElement
      if (modal) {
        modal.close()
      }
    }
  }

  // Ajouter/supprimer les listeners de clavier
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
</script>
