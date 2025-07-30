<template>
  <div class="bg-base-200 border-t border-base-300 p-4 flex-shrink-0" :class="mobileClass">
    <div class="flex items-center gap-3">
      <div
        class="flex-1 flex items-center bg-base-100 rounded-full px-4 py-2"
        :class="mobileInputClass"
      >
        <input
          v-model="messageText"
          type="text"
          placeholder="Tapez un message..."
          class="flex-1 bg-transparent border-none outline-none text-sm"
          @keyup.enter="handleSend"
        />
      </div>

      <button
        class="btn btn-primary btn-circle"
        :disabled="!messageText.trim()"
        @click="handleSend"
      >
        <Icon name="mdi:send" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    modelValue?: string
    mobile?: boolean
  }

  interface Emits {
    'update:modelValue': [value: string]
    'send-message': [message: string]
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    mobile: false
  })

  const emit = defineEmits<Emits>()

  const messageText = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
  })

  const mobileClass = computed(() => (props.mobile ? 'bg-base-100 border-t w-full' : 'bg-base-200'))

  const mobileInputClass = computed(() => (props.mobile ? 'bg-base-200' : 'bg-base-100'))

  const handleSend = () => {
    if (!messageText.value.trim()) return

    emit('send-message', messageText.value)
    messageText.value = ''
  }
</script>
