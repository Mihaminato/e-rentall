<template>
  <div class="card bg-base-100 shadow-lg mb-6">
    <div class="card-body">
      <div class="flex items-center gap-4">
        <!-- Avatar -->
        <div class="avatar">
          <UiUserAvatar
            :avatar-path="user?.avatar_url"
            :first-name="user?.first_name"
            :last-name="user?.last_name"
            size-class="w-16 h-16"
          />
        </div>

        <!-- Informations utilisateur -->
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h2 class="text-xl font-bold">{{ userName }}</h2>
            <div v-if="user?.is_verified" class="badge badge-success badge-sm">
              <Icon name="mdi:check-circle" class="w-3 h-3 mr-1" />
              Vérifié
            </div>
          </div>

          <div class="flex items-center gap-4 text-sm text-base-content/70">
            <span class="flex items-center gap-1">
              <Icon name="mdi:calendar" class="w-4 h-4" />
              Membre depuis {{ joinDate }}
            </span>
            <!-- NOTE: a implementer plus tard
              <span class="flex items-center gap-1">
              <Icon name="mdi:star" class="w-4 h-4" />
              {{ userRating.toFixed(1) }}
            </span> 
            -->
          </div>

          <!-- Bouton profil (mobile) -->
          <div class="mt-2 md:hidden">
            <NuxtLink to="/profile" class="btn btn-outline btn-xs">
              <Icon name="mdi:account" class="w-4 h-4 mr-1" />
              Mon profil
            </NuxtLink>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="hidden md:flex gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-info">{{ bookingsCount }}</div>
            <div class="text-xs text-base-content/60">
              Réservation{{ bookingsCount > 1 ? 's' : '' }}
            </div>
          </div>
        </div>

        <!-- Bouton profil -->
        <div class="flex-shrink-0 hidden md:block">
          <NuxtLink to="/profile" class="btn btn-outline btn-sm">
            <Icon name="mdi:account" class="w-4 h-4 mr-1" />
            Mon profil
          </NuxtLink>
        </div>
      </div>

      <!-- Statistiques mobiles -->
      <div class="md:hidden mt-4 pt-4 border-t border-base-300">
        <div class="flex justify-around">
          <div class="text-center">
            <div class="text-lg font-bold text-primary">{{ activeVehicleCount }}</div>
            <div class="text-xs text-base-content/60">
              Véhicule{{ activeVehicleCount > 1 ? 's' : '' }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold text-success">{{ activeVehicleCount }}</div>
            <div class="text-xs text-base-content/60">
              Actif{{ activeVehicleCount > 1 ? 's' : '' }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-lg font-bold text-info">{{ bookingsCount }}</div>
            <div class="text-xs text-base-content/60">
              Réservation{{ bookingsCount > 1 ? 's' : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import type { Profile } from '~/types'
  import { useBookings } from '~/composables/useBookings'

  interface Props {
    user: Profile | null
    activeVehicleCount: number
    inactiveVehicleCount: number
  }

  const props = defineProps<Props>()

  // Nom d'affichage
  const userName = computed(() => {
    if (!props.user) return 'Utilisateur'
    return `${props.user.first_name || ''} ${props.user.last_name || ''}`.trim() || 'Utilisateur'
  })

  // Date d'inscription formatée
  const joinDate = computed(() => {
    if (!props.user?.created_at) return 'récemment'
    return dayjs(props.user.created_at).format('MMMM YYYY')
  })

  // Statistiques
  //NOTE: a implementer plus tard const userRating = computed(() => 4.8) // À remplacer par vraie donnée
  const bookingsCount = ref(0) // À remplacer par vraie donnée

  const { fetchUserBookingsCount } = useBookings()

  const loadBookingsCount = async () => {
    if (props.user?.id) {
      bookingsCount.value = await fetchUserBookingsCount(props.user.id)
    }
  }

  onMounted(loadBookingsCount)

  watch(() => props.user, loadBookingsCount)
</script>
