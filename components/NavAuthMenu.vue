<template>
  <!-- Affichage selon l'état de connexion -->
  <div>
    <!-- Si utilisateur non connecté - Boutons Connexion et S'inscrire -->
    <div v-if="!isLoggedIn" class="flex items-center gap-1 sm:gap-2">
      <NuxtLink 
        to="/auth/login" 
        class="btn btn-ghost btn-sm sm:btn-md text-xs sm:text-sm"
      >
        Connexion
      </NuxtLink>
      <NuxtLink 
        to="/auth/register" 
        class="btn btn-primary btn-sm sm:btn-md text-xs sm:text-sm"
      >
        S'inscrire
      </NuxtLink>
    </div>

    <!-- Si utilisateur connecté -->
    <div v-else class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <UiUserAvatar
          :avatar-path="profile?.avatar_url"
          :first-name="profile?.first_name"
          :last-name="profile?.last_name"
          size-class="w-8 h-8 sm:w-10 sm:h-10"
        />
      </label>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-56 sm:w-64 max-h-96 overflow-y-auto"
      >
        <li class="menu-title text-sm sm:text-base">{{ fullName }}</li>
        <li>
          <NuxtLink to="/profile" @click="closeMenu" class="text-sm sm:text-base py-2">
            Mon profil
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/vehicles/my-vehicles" @click="closeMenu" class="text-sm sm:text-base py-2">
            Mes véhicules
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/bookings" @click="closeMenu" class="text-sm sm:text-base py-2">
            <Icon name="material-symbols:book-online-outline" class="mr-2 w-4 h-4" />
            Mes locations
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/bookings/requests" @click="closeMenu" class="text-sm sm:text-base py-2">
            <Icon name="material-symbols:inbox" class="mr-2 w-4 h-4" />
            Demandes de réservation
          </NuxtLink>
        </li>
        <!--NOTE: A implementer plus tard. Messagerie -->
        <!-- <li><NuxtLink to="/messages">Messagerie</NuxtLink></li> -->

        <!-- Lien admin - visible seulement pour les admins -->
        <template v-if="isAdmin">
          <div class="divider"></div>
          <li>
            <NuxtLink to="/admin" class="text-error font-semibold text-sm sm:text-base py-2" @click="closeMenu">
              <Icon name="mdi:shield-crown" class="w-4 h-4" />
              Administration
            </NuxtLink>
          </li>
        </template>

        <div class="divider"></div>
        <li>
          <button 
            class="btn btn-sm btn-ghost w-full text-sm sm:text-base" 
            :disabled="loading" 
            @click="handleLogout"
          >
            {{ loading ? 'Déconnexion...' : 'Déconnexion' }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '~/stores/auth'
  import { useAuth } from '~/composables/useAuth'

  const authStore = useAuthStore()
  const { user, profile, isLoggedIn, isAdmin } = storeToRefs(authStore)
  const { logout } = useAuth()
  const loading = ref(false)

  const fullName = computed(() => {
    if (profile.value) {
      return `${profile.value.first_name ?? ''} ${profile.value.last_name ?? ''}`.trim()
    }
    return user.value?.email ?? ''
  })

  // Fonction pour fermer le menu dropdown
  const closeMenu = () => {
    const elem = document.activeElement
    if (elem instanceof HTMLElement) {
      elem.blur()
    }
  }

  // Déconnexion
  const handleLogout = async () => {
    loading.value = true
    try {
      await logout()
    } catch (err) {
      console.error('Erreur déconnexion', err)
    } finally {
      loading.value = false
    }
  }
</script>
