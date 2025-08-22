<template>
  <div class="w-full">
    <!-- Modal de confirmation daisyUI -->
    <dialog class="modal z-[999]" :class="{ 'modal-open': visible }">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ title }}</h3>
        <p class="py-4">{{ message }}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn" @click="$emit('cancel')">Annuler</button>
            <button class="btn btn-error ml-2" :disabled="loading" @click="$emit('confirm')">
              <span v-if="loading" class="loading loading-spinner loading-xs mr-2"></span>
              {{ confirmText }}
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="$emit('cancel')">fermer</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirmation'
    },
    message: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: 'Confirmer'
    }
  })

  defineEmits(['confirm', 'cancel'])

  // Méthodes exposées pour manipuler le modal
  defineExpose({
    // Ces méthodes seront implémentées au niveau du parent
  })
</script>
