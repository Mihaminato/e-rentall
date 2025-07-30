<template>
  <div
    ref="messagesContainer"
    class="overflow-y-auto p-4 bg-gradient-to-b from-base-200 to-base-300 flex-1 min-h-96"
    :class="{ relative: showBackButton }"
  >
    <!-- Mobile back button -->
    <button
      v-if="showBackButton"
      class="btn btn-ghost btn-circle btn-sm absolute top-2 left-2 z-10"
      @click="$emit('back')"
    >
      <Icon name="mdi:arrow-left" class="w-5 h-5" />
    </button>

    <!-- Vehicle info banner - Will be implemented with Supabase data -->
    <div v-if="conversation?.vehicle" class="flex justify-center mb-6">
      <div class="bg-base-100 rounded-lg p-3 shadow-sm text-center max-w-sm">
        <Icon name="mdi:car" class="w-6 h-6 mx-auto mb-2 text-primary" />
        <p class="text-xs text-base-content/60">Discussion à propos de</p>
        <p class="font-semibold text-sm">{{ conversation.vehicle }}</p>
      </div>
    </div>

    <!-- Chat messages -->
    <div class="space-y-2">
      <div
        v-for="message in conversation?.messages"
        :key="message.id"
        :class="['chat', message.isMe ? 'chat-end' : 'chat-start']"
      >
        <!-- Avatar (toujours affiché selon DaisyUI) -->
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img
              :src="
                message.isMe
                  ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
                  : conversation.avatar
              "
              :alt="message.isMe ? 'Moi' : conversation.name"
            />
          </div>
        </div>

        <!-- Chat header (nom de l'utilisateur) -->
        <div class="chat-header text-xs opacity-50 mb-1">
          {{ message.isMe ? 'Vous' : conversation.name }}
          <time class="ml-2">{{ message.time }}</time>
        </div>

        <!-- Message bubble -->
        <div :class="['chat-bubble', message.isMe ? 'chat-bubble-primary' : 'chat-bubble-neutral']">
          {{ message.text }}
        </div>

        <!-- Message footer with status -->
        <div class="chat-footer opacity-50">
          <Icon
            v-if="message.isMe && message.read"
            name="mdi:check-all"
            class="w-3 h-3 text-blue-500"
          />
          <Icon v-else-if="message.isMe" name="mdi:check" class="w-3 h-3" />
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img :src="conversation?.avatar" :alt="conversation?.name" />
          </div>
        </div>
        <div class="chat-bubble chat-bubble-neutral">
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-current rounded-full animate-bounce"
              style="animation-delay: 0.1s"
            ></div>
            <div
              class="w-2 h-2 bg-current rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conversation: any
    isTyping?: boolean
    showBackButton?: boolean
  }

  interface Emits {
    back: []
  }

  const props = withDefaults(defineProps<Props>(), {
    isTyping: false,
    showBackButton: false
  })

  defineEmits<Emits>()

  const messagesContainer = ref<HTMLElement>()

  // Fonction pour scroller vers le bas automatiquement
  const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }

  // Watcher pour scroller quand les messages changent
  watch(
    () => props.conversation?.messages,
    () => {
      scrollToBottom()
    },
    { deep: true, immediate: true }
  )

  // Exposer la fonction pour usage externe
  defineExpose({
    scrollToBottom
  })
</script>
