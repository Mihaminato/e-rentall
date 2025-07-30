<template>
  <div class="h-full w-full overflow-hidden bg-base-100 flex justify-center mb-10">
    <!-- Centered app container -->
    <div class="w-screen max-w-7xl">
      <!-- Desktop layout -->
      <div class="hidden lg:flex" style="height: calc(100vh - 28rem)">
        <!-- Sidebar conversations -->
        <MessagesConversationsList
          :conversations="conversations"
          :selected-id="selectedConversation?.id"
          @select-conversation="selectConversation"
        />

        <!-- Chat area -->
        <div class="flex-1 flex flex-col">
          <div v-if="selectedConversation" class="h-full flex flex-col">
            <!-- Messages area -->
            <MessagesChatMessages
              ref="chatMessagesRef"
              :conversation="selectedConversation"
              :is-typing="isTyping"
            />

            <!-- Message input -->
            <MessagesInput v-model="newMessage" @send-message="sendMessage" />
          </div>

          <!-- Empty state -->
          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center max-w-md">
              <Icon
                name="mdi:message-text-outline"
                class="w-24 h-24 mx-auto mb-4 text-base-content/30"
              />
              <h2 class="text-2xl font-bold mb-2">Sélectionnez une conversation</h2>
              <p class="text-base-content/60 mb-6">
                Choisissez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile layout -->
      <div class="lg:hidden flex flex-col" style="height: calc(100vh - 10rem)">
        <!-- Mobile: Show conversations list -->
        <MessagesConversationsList
          v-if="!selectedConversation"
          class="h-full w-full"
          :conversations="conversations"
          :selected-id="selectedConversation?.id"
          @select-conversation="selectConversation"
        />

        <!-- Mobile: Show selected conversation -->
        <div v-else class="h-full flex flex-col">
          <!-- Mobile messages -->
          <MessagesChatMessages
            ref="mobileChatMessagesRef"
            :conversation="selectedConversation"
            :is-typing="isTyping"
            :show-back-button="true"
            @back="selectedConversation = null"
          />

          <!-- Mobile input -->
          <MessagesInput v-model="newMessage" :mobile="true" @send-message="sendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Authentification et meta
  definePageMeta({
    middleware: 'auth',
    layout: 'default'
  })

  useHead({
    title: 'Messages - Vehicul Location'
  })

  // État des composants
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedConversation = ref<any>(null)
  const newMessage = ref('')
  const isTyping = ref(false)

  // Références aux composants
  const chatMessagesRef = ref()
  const mobileChatMessagesRef = ref()

  // Données simulées des conversations
  const conversations = ref([
    {
      id: 1,
      name: 'Jean Rakoto',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      lastMessage: 'Bonjour, est-ce que la voiture est...',
      lastMessageTime: '14:30',
      unread: 2,
      status: 'En ligne',
      vehicle: 'Toyota Corolla 2024',
      messages: [
        {
          id: 1,
          text: "Bonjour ! Je suis intéressé par votre Toyota Corolla 2024. Est-ce qu'elle est disponible du 25 au 28 août ?",
          time: '14:30',
          isMe: false,
          read: true
        },
        {
          id: 2,
          text: 'Bonjour Jean ! Oui elle est disponible pour cette période. Le prix est de 80 000 Ar par jour.',
          time: '14:35',
          isMe: true,
          read: true
        },
        {
          id: 3,
          text: 'Parfait ! Est-ce que la voiture a bien tous les équipements mentionnés ? Climatisation, GPS, etc.',
          time: '14:37',
          isMe: false,
          read: true
        },
        {
          id: 4,
          text: "Oui, elle a tout ce qui est mentionné dans l'annonce. Je peux vous envoyer des photos supplémentaires si vous voulez.",
          time: '14:40',
          isMe: true,
          read: false
        }
      ]
    },
    {
      id: 2,
      name: 'Marie Razafy',
      avatar:
        'https://images.unsplash.com/photo-1494790108775-e1f12fda8ecb?w=100&h=100&fit=crop&crop=face',
      lastMessage: '✓✓ Merci pour les informations !',
      lastMessageTime: 'Hier',
      unread: 0,
      status: 'Vu récemment',
      vehicle: 'Honda Civic 2023',
      messages: [
        {
          id: 1,
          text: 'Bonjour, je voudrais louer votre Honda pour ce weekend',
          time: 'Hier 15:20',
          isMe: false,
          read: true
        },
        {
          id: 2,
          text: 'Bonjour Marie ! Pas de problème, elle est libre ce weekend.',
          time: 'Hier 15:25',
          isMe: true,
          read: true
        },
        {
          id: 3,
          text: 'Merci pour les informations !',
          time: 'Hier 15:30',
          isMe: false,
          read: true
        }
      ]
    },
    {
      id: 3,
      name: 'Paul Andry',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      lastMessage: "✓ D'accord, à bientôt",
      lastMessageTime: '2 jours',
      unread: 0,
      status: 'Hors ligne',
      vehicle: 'Nissan X-Trail 2022',
      messages: [
        {
          id: 1,
          text: 'Rendez-vous demain à 14h ?',
          time: 'Il y a 2 jours',
          isMe: true,
          read: true
        },
        {
          id: 2,
          text: "D'accord, à bientôt",
          time: 'Il y a 2 jours',
          isMe: false,
          read: true
        }
      ]
    }
  ])

  // Fonction pour scroller vers le bas automatiquement
  const scrollToBottom = async () => {
    await nextTick()
    const component = chatMessagesRef.value || mobileChatMessagesRef.value
    if (component && component.scrollToBottom) {
      component.scrollToBottom()
    }
  }

  // Methods
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectConversation = (conversation: any) => {
    selectedConversation.value = conversation
    // Marquer comme lu
    conversation.unread = 0
    // Scroll vers le bas
    scrollToBottom()
  }

  const sendMessage = (messageText: string) => {
    if (!messageText.trim() || !selectedConversation.value) return

    const message = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      read: false
    }

    selectedConversation.value.messages.push(message)
    selectedConversation.value.lastMessage = messageText
    selectedConversation.value.lastMessageTime = message.time

    // Scroll vers le bas après envoi
    scrollToBottom()

    // Simuler une réponse
    setTimeout(() => {
      isTyping.value = true
      setTimeout(() => {
        isTyping.value = false
        selectedConversation.value.messages.push({
          id: Date.now(),
          text: 'Message reçu ! Je vais vous répondre bientôt.',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
          read: true
        })
        // Scroll vers le bas après réception
        scrollToBottom()
      }, 2000)
    }, 1000)
  }

  // Gestion des paramètres d'URL
  const route = useRoute()
  const contactId = route.query.contact

  if (contactId) {
    // Simuler l'ouverture d'une conversation depuis un lien
    const conversation = conversations.value.find(c => c.id === Number(contactId))
    if (conversation) {
      selectedConversation.value = conversation
      // Scroll vers le bas après sélection
      scrollToBottom()
    }
  }

  // Sélectionner la première conversation par défaut sur desktop
  onMounted(() => {
    if (
      window.innerWidth >= 1024 &&
      conversations.value.length > 0 &&
      !selectedConversation.value
    ) {
      selectedConversation.value = conversations.value[0]
      // Scroll vers le bas après sélection automatique
      scrollToBottom()
    }
  })
</script>

<style scoped>
  /* Scrollbar personnalisé */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Animation pour les bulles qui apparaissent */
  .chat {
    animation: fadeInUp 0.3s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
