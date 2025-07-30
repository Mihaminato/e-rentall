<template>
  <div class="w-80 h-full bg-base-100 flex flex-col">
    <!-- Sidebar header - Fixed height 64px -->
    <div class="bg-primary text-primary-content p-4 h-16 flex-shrink-0">
      <div class="flex items-center justify-between h-full">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-10 h-10 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                alt="Mon profil"
              />
            </div>
          </div>
          <h1 class="font-semibold text-lg">Messages</h1>
        </div>
      </div>
    </div>

    <!-- Search - Fixed height 64px -->
    <div class="p-3 bg-base-200 h-16 flex-shrink-0 flex items-center">
      <div class="relative w-full">
        <Icon
          name="mdi:magnify"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher ou démarrer une nouvelle discussion"
          class="input input-sm w-full pl-10 bg-base-100 border-none rounded-full"
        />
      </div>
    </div>

    <!-- Conversations list -->
    <div class="overflow-y-auto flex-1">
      <div
        v-for="conversation in filteredConversations"
        :key="conversation.id"
        :class="[
          'p-3 cursor-pointer border-b border-base-300 hover:bg-base-200 transition-all',
          selectedId === conversation.id ? 'bg-primary/5 border-r-4 border-primary' : ''
        ]"
        @click="$emit('select-conversation', conversation)"
      >
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="w-12 h-12 rounded-full">
              <img :src="conversation.avatar" :alt="conversation.name" />
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3
                :class="[
                  'font-semibold text-sm truncate',
                  conversation.unread > 0 ? 'text-base-content' : 'text-base-content/80'
                ]"
              >
                {{ conversation.name }}
              </h3>
              <span
                :class="[
                  'text-xs',
                  conversation.unread > 0 ? 'text-primary' : 'text-base-content/50'
                ]"
              >
                {{ conversation.lastMessageTime }}
              </span>
            </div>

            <div class="flex items-center justify-between mt-1">
              <p
                :class="[
                  'text-sm truncate',
                  conversation.unread > 0 ? 'text-base-content/80' : 'text-base-content/60'
                ]"
              >
                {{ conversation.lastMessage }}
              </p>
              <div v-if="conversation.unread > 0" class="badge badge-primary badge-sm">
                {{ conversation.unread }}
              </div>
            </div>

            <p class="text-xs text-base-content/50 mt-1">
              <Icon name="mdi:car" class="w-3 h-3 inline mr-1" />
              {{ conversation.vehicle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conversations: any[]
    selectedId?: number | null
  }

  interface Emits {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'select-conversation': [conversation: any]
  }

  const props = defineProps<Props>()
  defineEmits<Emits>()

  const searchQuery = ref('')

  const filteredConversations = computed(() => {
    if (!searchQuery.value) return props.conversations
    return props.conversations.filter(
      conv =>
        conv.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        conv.vehicle.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
</script>
