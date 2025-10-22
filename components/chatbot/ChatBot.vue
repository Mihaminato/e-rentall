<template>
  <div>
    <!-- Bouton flottant -->
    <Transition
      name="button-fade"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <button
        v-if="!state.isOpen"
        class="btn btn-circle btn-lg fixed bottom-6 right-6 z-50 shadow-2xl hover:scale-110 transition-transform"
        style="background-color: #e2725b; border-color: #e2725b"
        @click="toggle"
      >
        <Icon name="mdi:chat" size="24" class="text-white" />
      </button>
    </Transition>

    <!-- Fenêtre chat -->
    <Transition
      name="chat-slide"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-250 ease-in"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="state.isOpen"
        class="card fixed bottom-0 left-0 w-full h-[90vh] max-h-[550px] shadow-2xl z-50 bg-base-100 flex flex-col overflow-hidden rounded-t-2xl md:bottom-24 md:right-6 md:left-auto md:w-96 md:h-[550px] md:max-h-[calc(100vh-8rem)] md:rounded-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4" style="background-color: #e2725b">
          <div class="flex items-center gap-2">
            <Icon name="mdi:car" size="20" class="text-white" />
            <div>
              <h3 class="font-bold text-white text-sm">Assistance E-RENTALL</h3>
              <span class="badge badge-success badge-sm gap-1">
                <Icon name="mdi:check-circle" size="16" />
                Support 24/7
              </span>
            </div>
          </div>
          <button
            class="btn btn-ghost btn-sm btn-circle text-white hover:bg-white hover:text-primary transition-all"
            @click="close"
          >
            <Icon name="mdi:close" size="20" />
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 bg-base-200 space-y-4">
          <TransitionGroup
            name="message-slide"
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 translate-y-2 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-95"
          >
            <div
              v-for="(msg, index) in state.messages"
              :key="`${msg.timestamp}-${index}`"
              :class="['chat', msg.role === 'user' ? 'chat-end' : 'chat-start']"
            >
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <Icon
                    v-if="msg.role === 'assistant'"
                    name="mdi:robot"
                    size="40"
                    class="text-primary"
                  />
                  <Icon v-else name="mdi:account-circle" size="40" class="text-accent" />
                </div>
              </div>
              <div
                :class="[
                  'chat-bubble',
                  msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-neutral'
                ]"
              >
                {{ msg.content }}
              </div>
            </div>
          </TransitionGroup>

          <!-- Typing indicator -->
          <div v-if="state.isTyping" class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <Icon name="mdi:robot" size="40" class="text-primary" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-neutral">
              <span class="loading loading-dots loading-sm"></span>
            </div>
          </div>
        </div>

        <!-- Suggestions rapides (si pas de messages encore) -->
        <div v-if="state.messages.length <= 1" class="flex flex-wrap gap-2 p-3 bg-base-100">
          <button
            class="btn btn-xs btn-outline"
            @click="askQuestion('Comment réserver un véhicule ?')"
          >
            Comment réserver ?
          </button>
          <button
            class="btn btn-xs btn-outline"
            @click="askQuestion('Quel est le montant de l\'acompte ?')"
          >
            Montant acompte ?
          </button>
          <button class="btn btn-xs btn-outline" @click="askQuestion('Quels documents fournir ?')">
            Documents requis ?
          </button>
        </div>

        <!-- Zone de saisie -->
        <div class="p-4 bg-base-100 border-t border-base-300">
          <div class="flex gap-2">
            <input
              v-model="userInput"
              type="text"
              placeholder="Tapez votre message..."
              class="input input-bordered flex-1"
              :disabled="state.isTyping"
              @keyup.enter="handleSend"
            />
            <button
              class="btn btn-circle"
              style="background-color: #e2725b; border-color: #e2725b"
              :disabled="!userInput.trim() || state.isTyping"
              @click="handleSend"
            >
              <Icon name="mdi:send" size="20" class="text-white" />
            </button>
          </div>
          <div v-if="state.error" class="alert alert-error alert-sm mt-2">
            <Icon name="mdi:alert-circle" size="16" />
            <span class="text-xs">{{ state.error }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  const { state, sendMessage, toggle, close } = useChatbot()
  const userInput = ref('')
  const messagesContainer = ref<HTMLDivElement>()

  const handleSend = async () => {
    if (!userInput.value.trim()) return

    const message = userInput.value
    userInput.value = ''
    await sendMessage(message)

    // Scroll to bottom
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  }

  const askQuestion = (question: string) => {
    userInput.value = question
    handleSend()
  }

  // Auto-scroll sur nouveau message
  watch(
    () => state.value.messages.length,
    () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
      })
    }
  )
</script>
