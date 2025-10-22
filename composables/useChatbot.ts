import type { ChatMessage, ChatbotState } from '~/types'

export const useChatbot = () => {
  const state = ref<ChatbotState>({
    messages: [],
    isOpen: false,
    isTyping: false,
    error: null
  })

  const authStore = useAuthStore()

  // Initialiser avec message d'accueil bilingue
  onMounted(() => {
    loadHistory()
    if (state.value.messages.length === 0) {
      const welcomeMessage =
        authStore.user && authStore.profile?.first_name
          ? `Bonjour ${authStore.profile.first_name} ! Comment puis-je vous aider ?\n\nSalama ${authStore.profile.first_name} ! Ahoana no afaka manampy anao aho ?`
          : "Bonjour ! Comment puis-je vous aider aujourd'hui ?\n\nFiarahabana ! Ahoana no afaka manampy anao aho ?"

      addMessage('assistant', welcomeMessage)
    }
  })

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const message: ChatMessage = {
      role,
      content,
      timestamp: new Date().toISOString()
    }
    state.value.messages.push(message)
    saveHistory()
  }

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    // Ajouter message utilisateur
    addMessage('user', message)
    state.value.isTyping = true
    state.value.error = null

    try {
      const { data, error } = await useFetch('/api/chat/send-message', {
        method: 'POST',
        body: {
          message,
          history: state.value.messages.slice(-20).map(m => ({
            role: m.role,
            content: m.content
          }))
        }
      })

      if (error.value || !data.value?.success) {
        const errorMessage =
          data.value && 'error' in data.value ? data.value.error : 'Erreur de communication'
        throw new Error(errorMessage)
      }

      const reply =
        data.value && 'reply' in data.value ? data.value.reply : 'Réponse non disponible'
      addMessage('assistant', reply)
    } catch (err) {
      console.error('Chatbot error:', err)
      state.value.error = "Désolé, une erreur s'est produite. Veuillez réessayer."
      addMessage(
        'assistant',
        'Désolé, je rencontre une difficulté technique. Contactez notre support à support@erentall.market'
      )
    } finally {
      state.value.isTyping = false
    }
  }

  const toggle = () => {
    state.value.isOpen = !state.value.isOpen
  }

  const close = () => {
    state.value.isOpen = false
  }

  const clearHistory = () => {
    state.value.messages = []
    sessionStorage.removeItem('chatHistory')
  }

  const saveHistory = () => {
    sessionStorage.setItem('chatHistory', JSON.stringify(state.value.messages))
  }

  const loadHistory = () => {
    const saved = sessionStorage.getItem('chatHistory')
    if (saved) {
      try {
        state.value.messages = JSON.parse(saved)
      } catch (err) {
        console.error('Error loading chat history:', err)
      }
    }
  }

  return {
    state,
    sendMessage,
    toggle,
    close,
    clearHistory
  }
}
