<template>
  <div v-if="visible" class="toast toast-top toast-end z-50">
    <div
      :class="{
        alert: true,
        'alert-info': type === 'info',
        'alert-success': type === 'success',
        'alert-warning': type === 'warning',
        'alert-error': type === 'error'
      }"
    >
      <span>{{ message }}</span>
      <button class="btn btn-sm btn-ghost" @click="close">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    visible: boolean
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  const close = () => {
    emit('close')
  }
</script>
