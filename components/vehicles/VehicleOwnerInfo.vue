<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body p-3">
      <!-- Profil ultra-compact - Cliquable -->
      <div
        class="flex items-center gap-2 mb-2 cursor-pointer hover:bg-base-200 p-2 -m-2 rounded-lg transition-colors"
        @click="viewOwnerProfile"
      >
        <div class="avatar">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <template v-if="ownerAvatarUrl">
              <img :src="ownerAvatarUrl" :alt="ownerName" class="object-cover w-full h-full" />
            </template>
            <template v-else>
              <div class="w-full h-full flex items-center justify-center bg-primary text-white">
                <span class="text-xs font-bold">{{ ownerInitials }}</span>
              </div>
            </template>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <!-- Layout toujours en colonne pour éviter les débordements -->
          <div class="flex flex-col gap-2 w-full">
            <!-- Partie Supérieure: Nom & Date -->
            <div class="flex-shrink-0">
              <div class="flex items-center gap-1.5">
                <h3 class="font-semibold text-sm truncate">{{ ownerName }}</h3>
                <div v-if="vehicle.owner?.is_verified" class="badge badge-success badge-xs px-1">
                  ✓
                </div>
              </div>
              <p class="text-sm text-base-content/70">Membre depuis {{ joinDate }}</p>
            </div>

            <!-- Partie Inférieure: Adresse (toujours en bas) -->
            <div v-if="ownerFullAddress" class="text-sm">
              <div class="flex items-start gap-1.5">
                <Icon name="mdi:map-marker" class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span class="break-words leading-tight">
                  {{ ownerFullAddress }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Équipements inline -->
      <div
        v-if="vehicle.features && vehicle.features.length > 0"
        class="mt-2 pt-2 border-t border-base-300"
      >
        <div class="flex flex-wrap gap-1">
          <span
            v-for="feature in vehicle.features"
            :key="feature"
            class="badge badge-outline badge-xs px-1.5 py-0.5"
          >
            {{ feature }}
          </span>
        </div>
      </div>

      <!--NOTE: A implementer plus tard. Bouton contacter -->
      <!-- <div class="mt-3 pt-2 border-t border-base-300">
        <button class="btn btn-primary btn-sm btn-block" @click="contactOwner">
          <Icon name="mdi:message-text" class="w-4 h-4" />
          Contacter {{ ownerName }}
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import type { SupabaseClient } from '@supabase/supabase-js'
  interface Props {
    vehicle: {
      description?: string
      features?: string[]
      owner?: {
        id?: string
        first_name?: string
        last_name?: string
        created_at?: string
        avatar_url?: string
        address?: string
        city?: string
        postal_code?: string

        is_verified?: boolean
      }
    }
  }

  const props = defineProps<Props>()
  const supabase = useNuxtApp().$supabase as SupabaseClient

  // Nom complet du propriétaire
  const ownerName = computed(() => {
    if (!props.vehicle.owner) return 'N/A'
    return `${props.vehicle.owner.first_name || ''} ${props.vehicle.owner.last_name || ''}`.trim()
  })

  // Initiales du propriétaire
  const ownerInitials = computed(() => {
    if (!props.vehicle.owner) return '?'
    const firstName = props.vehicle.owner.first_name || ''
    const lastName = props.vehicle.owner.last_name || ''
    return `${firstName.charAt(0) || 'P'}${lastName.charAt(0) || 'R'}`
  })

  // Date d'inscription formatée
  const joinDate = computed(() => {
    if (!props.vehicle.owner?.created_at) return 'récemment'
    return dayjs(props.vehicle.owner.created_at).format('MMMM YYYY')
  })

  // URL de l'avatar du propriétaire
  const ownerAvatarUrl = computed(() => {
    if (!props.vehicle.owner?.avatar_url) return null

    // Si c'est déjà une URL complète, la retourner directement
    if (props.vehicle.owner.avatar_url.startsWith('http')) {
      return props.vehicle.owner.avatar_url
    }

    // Sinon, construire l'URL depuis Supabase Storage
    const { data } = supabase.storage.from('avatars').getPublicUrl(props.vehicle.owner.avatar_url)
    return data.publicUrl
  })

  // Vérifier si le propriétaire a une adresse complète
  const ownerFullAddress = computed(() => {
    if (!props.vehicle.owner) return ''
    return [props.vehicle.owner.address, props.vehicle.owner.city, props.vehicle.owner.postal_code]
      .filter(Boolean)
      .join(', ')
  })

  // // Vérifier si le propriétaire a des informations de contact
  // const hasContactInfo = computed(() => {
  //   if (!props.vehicle.owner) return false
  //   return props.vehicle.owner.phone || ownerFullAddress.value
  // })

  // // Fonction pour contacter le propriétaire
  // const contactOwner = () => {
  //   if (!props.vehicle.owner?.id) return

  //   // Rediriger vers la page des messages avec l'ID du propriétaire
  //   navigateTo(`/messages?contact=${props.vehicle.owner.id}`)
  // }

  // Fonction pour voir le profil du propriétaire
  const viewOwnerProfile = () => {
    if (!props.vehicle.owner?.id) return

    // Rediriger vers la page du profil du propriétaire
    navigateTo(`/users/${props.vehicle.owner.id}`)
  }
</script>
