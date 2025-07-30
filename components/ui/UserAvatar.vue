<template>
  <!-- Conteneur avatar générique -->
  <div :class="['rounded-full overflow-hidden', sizeClass]">
    <!-- Image disponible -->
    <template v-if="publicAvatarUrl">
      <img :src="publicAvatarUrl" :alt="fullName" class="object-cover w-full h-full" />
    </template>
    <!-- Placeholder avec initiales -->
    <template v-else>
      <div class="w-full h-full flex items-center justify-center bg-primary text-white">
        <span class="font-bold" :class="fontSize">{{ initials }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { SupabaseClient } from '@supabase/supabase-js'

  interface Props {
    avatarPath?: string | null
    firstName?: string | null
    lastName?: string | null
    sizeClass?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    avatarPath: null,
    firstName: null,
    lastName: null,
    sizeClass: 'w-10 h-10'
  })

  const supabase = useNuxtApp().$supabase as SupabaseClient

  // URL publique de l'avatar (ou null)
  const publicAvatarUrl = computed(() => {
    if (!props.avatarPath) return null
    if (props.avatarPath.startsWith('http')) return props.avatarPath
    const { data } = supabase.storage.from('avatars').getPublicUrl(props.avatarPath)
    return data.publicUrl
  })

  // Nom complet pour l'alt
  const fullName = computed(() => {
    return `${props.firstName ?? ''} ${props.lastName ?? ''}`.trim() || 'Avatar utilisateur'
  })

  // Initiales en fallback
  const initials = computed(() => {
    const first = props.firstName || ''
    const last = props.lastName || ''
    return `${first.charAt(0) || 'U'}${last.charAt(0) || ''}`
  })

  // Taille de police en fonction de la taille du conteneur (simple heuristique)
  const fontSize = computed(() => {
    if (props.sizeClass.includes('w-16')) return 'text-2xl'
    if (props.sizeClass.includes('w-12')) return 'text-xl'
    return 'text-sm'
  })
</script>
