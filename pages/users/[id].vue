<template>
  <div class="min-h-screen bg-base-100">
    <!-- État de chargement -->
    <div v-if="isLoading" class="container mx-auto px-4 py-8">
      <div class="flex justify-center items-center min-h-96">
        <div class="loading loading-spinner loading-lg"></div>
      </div>
    </div>

    <!-- État d'erreur -->
    <div v-else-if="error" class="container mx-auto px-4 py-8">
      <div class="alert alert-error">
        <Icon name="mdi:alert-circle" class="w-6 h-6" />
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Contenu principal -->
    <div v-else-if="userProfile" class="container mx-auto px-4 py-8">
      <!-- Navigation -->
      <div class="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href="#" class="link link-hover" @click.prevent="router.back()">
              <Icon name="mdi:arrow-left" class="w-4 h-4 mr-1" />
              Retour
            </a>
          </li>
          <li>Profil de {{ userName }}</li>
        </ul>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profil utilisateur -->
        <div class="lg:col-span-1">
          <ProfileCard
            :first-name="userProfile.first_name"
            :last-name="userProfile.last_name"
            :email="userProfile.email || ''"
            :is-verified="userProfile.is_verified"
            :profile-image-url="userAvatarUrl"
            :is-editing="false"
            :public-view="true"
            :phone="userProfile.phone"
            :address="userProfile.address"
            :city="userProfile.city"
            :postal-code="userProfile.postal_code"
            :cin-number="userProfile.cin_number"
            :cin-issued-date="userProfile.cin_issued_date"
            :nif-number="userProfile.nif_number"
            :stat-number="userProfile.stat_number"
            :member-since="joinDate"
          />

          <!-- Actions Administrateur -->
          <div
            v-if="isAdmin && userProfile"
            class="card bg-base-100 shadow-lg mt-6 border"
            :class="userProfile.is_verified ? 'border-success/50' : 'border-accent/50'"
          >
            <div class="card-body">
              <h3
                class="card-title text-lg"
                :class="userProfile.is_verified ? 'text-success' : 'text-accent'"
              >
                {{ userProfile.is_verified ? 'Gestion du Profil' : 'Actions de Vérification' }}
              </h3>
              <p v-if="!userProfile.is_verified" class="text-sm mb-4">
                Ce profil est en attente de vérification.
              </p>
              <p v-else class="text-sm mb-4">Ce profil est actuellement vérifié.</p>

              <!-- Liste des documents de l'utilisateur -->
              <div v-if="documents.length > 0" class="mb-4">
                <h4 class="font-bold mb-2">Documents soumis :</h4>
                <ProfileDocuments
                  :is-profile-complete="hasAllRequiredDocuments"
                  :is-read-only="true"
                  @view-document="(id, path) => viewDocument(id, path)"
                />
              </div>
              <div
                v-else-if="!userProfile.is_verified"
                class="text-sm text-center my-4 italic text-base-content/60"
              >
                Cet utilisateur n'a pas encore soumis de documents.
              </div>

              <button
                v-if="!userProfile.is_verified"
                class="btn btn-accent btn-block"
                :disabled="profileLoading || !hasAllRequiredDocuments"
                @click="handleVerifyUser"
              >
                <span v-if="profileLoading" class="loading loading-spinner"></span>
                Vérifier et Activer le Profil
              </button>
              <button
                v-else
                class="btn btn-warning btn-block"
                :disabled="profileLoading"
                @click="handleUnverifyUser"
              >
                <span v-if="profileLoading" class="loading loading-spinner"></span>
                Retirer la vérification
              </button>
            </div>
          </div>

          <!-- Notification de succès -->
          <div v-if="successMessage" class="alert alert-success mt-4">
            <Icon name="mdi:check-circle" class="w-6 h-6" />
            <span>{{ successMessage }}</span>
          </div>

          <!-- Statistiques utilisateur -->
          <div class="card bg-base-100 shadow-lg mt-6">
            <div class="card-body">
              <h3 class="card-title text-lg mb-4">Statistiques</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-base-content/70">Véhicules actifs</span>
                  <div class="badge badge-primary">{{ ownerVehicles.length }}</div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-base-content/70">Membre depuis</span>
                  <span class="text-sm">{{ joinDate }}</span>
                </div>
                <!-- TODO: Ajouter la note moyenne -->
                <!-- <div class="flex justify-between items-center">
                  <span class="text-base-content/70">Note moyenne</span>
                  <div class="flex items-center gap-2">
                    <div class="rating rating-sm">
                      <input
                        v-for="n in 5"
                        :key="n"
                        type="radio"
                        :name="`rating-${userProfile.id}`"
                        class="mask mask-star-2 bg-orange-400"
                        :checked="n <= Math.round(userRating)"
                        disabled
                      />
                    </div>
                    <span class="text-sm">{{ userRating.toFixed(1) }}</span>
                  </div>
                </div> -->
              </div>

              <!--NOTE: A implementer plus tard. Bouton contacter -->
              <!-- <div class="divider"></div>
              <button class="btn btn-primary btn-block" @click="contactUser">
                <Icon name="mdi:message-text" class="w-4 h-4" />
                Contacter {{ userName }}
              </button> -->
            </div>
          </div>
        </div>

        <!-- Véhicules de l'utilisateur -->
        <div class="lg:col-span-2">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Véhicules de {{ userName }}</h2>
          </div>

          <!-- Message d'information -->
          <div v-if="ownerVehicles.length > 0" class="alert alert-info mb-6">
            <Icon name="mdi:information" class="w-5 h-5" />
            <span class="text-sm"
              >Seuls les véhicules actifs et disponibles à la location sont affichés.</span
            >
          </div>

          <!-- Liste des véhicules -->
          <!-- <div v-if="userVehicles.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VehiclesVehicleCard
              v-for="vehicle in userVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
            />
          </div> -->

          <div v-if="activeVehicles.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VehiclesVehicleCard
              v-for="vehicle in activeVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
            />
          </div>

          <!-- État vide -->
          <div v-else class="text-center py-12">
            <Icon name="mdi:car-off" class="w-16 h-16 mx-auto mb-4 text-base-content/30" />
            <h3 class="text-xl font-semibold mb-2">Aucun véhicule disponible</h3>
            <p class="text-base-content/60">
              {{ userName }} n'a pas encore mis de véhicules en location.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { useVehicles } from '~/composables/useVehicles'
  import type { Profile } from '~/types'
  import { useRoute, useRouter } from 'vue-router'
  import useProfile from '~/composables/useProfile'
  import { useAuthStore } from '~/stores/auth'
  import ProfileDocuments from '~/components/profile/Documents.vue'
  import type { SupabaseClient } from '@supabase/supabase-js'
  // Meta et authentification
  definePageMeta({
    layout: 'default'
  })
  // Composables
  const route = useRoute()
  const router = useRouter()
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const { ownerVehicles, fetchOwnerVehiclesWithPhotos } = useVehicles()
  const {
    getPublicProfile,
    verifyUserProfile,
    unverifyUserProfile,
    loading: profileLoading,
    documents,
    loadUserDocuments,
    viewDocument
  } = useProfile()
  const authStore = useAuthStore()

  // État
  const isLoading = ref(true)
  const error = ref('')
  const userProfile = ref<Profile | null>(null)
  const successMessage = ref('')

  const isAdmin = computed(() => authStore.profile?.is_admin === true)

  const hasAllRequiredDocuments = computed(() => {
    if (!documents.value || documents.value.length < 2) {
      return false
    }
    const documentTypes = new Set(documents.value.map(doc => doc.type))
    return documentTypes.has('nif') && documentTypes.has('stat')
  })

  // ID utilisateur depuis l'URL
  const userId = computed(() => route.params.id as string)

  // Nom d'affichage
  const userName = computed(() => {
    if (!userProfile.value) return 'Utilisateur'
    return (
      `${userProfile.value.first_name || ''} ${userProfile.value.last_name || ''}`.trim() ||
      'Utilisateur'
    )
  })

  // Date d'inscription formatée
  const joinDate = computed(() => {
    if (!userProfile.value?.created_at) return 'récemment'
    return dayjs(userProfile.value.created_at).format('MMMM YYYY')
  })

  // Note simulée (à remplacer par vraie donnée)
  // const userRating = computed(() => 4.8)

  // URL de l'avatar de l'utilisateur (traitée pour Supabase Storage)
  const userAvatarUrl = computed(() => {
    if (!userProfile.value?.avatar_url) return undefined

    // Si c'est déjà une URL complète, la retourner directement
    if (userProfile.value.avatar_url.startsWith('http')) {
      return userProfile.value.avatar_url
    }

    // Sinon, construire l'URL depuis Supabase Storage
    const { data } = supabase.storage.from('avatars').getPublicUrl(userProfile.value.avatar_url)
    return data.publicUrl
  })

  const activeVehicles = computed(() => {
    if (isAdmin.value) return ownerVehicles.value
    return ownerVehicles.value.filter(vehicle => vehicle.is_active)
  })

  // Charger les données
  const loadUserData = async () => {
    try {
      isLoading.value = true
      error.value = ''

      // Charger le profil utilisateur
      const { data: profileData, error: profileError } = await getPublicProfile(userId.value)

      if (profileError) {
        error.value = profileError
        return
      }

      userProfile.value = profileData

      // Si l'utilisateur est admin, charger ses documents pour vérification
      if (isAdmin.value && userProfile.value) {
        await loadUserDocuments(userProfile.value.id)
      }

      // Charger les véhicules de l'utilisateur (vue publique - seulement véhicules actifs)
      // await fetchMyVehicles(userId.value, true)

      // Charger les véhicules du propriétaire
      await fetchOwnerVehiclesWithPhotos(userId.value)

      // Mettre à jour le titre de la page
      useHead({
        title: `${userName.value} - Vehicul Location`
      })
    } catch (err) {
      console.error('Erreur lors du chargement des données utilisateur:', err)
      error.value = 'Une erreur est survenue lors du chargement des données'
    } finally {
      isLoading.value = false
    }
  }

  // Contacter l'utilisateur
  // const contactUser = () => {
  //   navigateTo(`/messages?contact=${userId.value}`)
  // }

  // Action de vérification par l'admin
  const handleVerifyUser = async () => {
    if (!userProfile.value) return
    successMessage.value = ''
    error.value = ''

    const success = await verifyUserProfile(userProfile.value.id)
    if (success && userProfile.value) {
      userProfile.value.is_verified = true
      successMessage.value = 'Le profil a été vérifié et activé avec succès !'
    } else {
      error.value = "Une erreur est survenue lors de la vérification de l'utilisateur."
    }
  }

  const handleUnverifyUser = async () => {
    if (!userProfile.value) return
    successMessage.value = ''
    error.value = ''

    const success = await unverifyUserProfile(userProfile.value.id)
    if (success && userProfile.value) {
      userProfile.value.is_verified = false
      successMessage.value = 'La vérification du profil a été retirée.'
    } else {
      error.value = "Une erreur est survenue lors de l'annulation de la vérification."
    }
  }

  // Charger les données au montage
  onMounted(() => {
    loadUserData()
  })

  // Recharger si l'ID change
  watch(
    () => userId.value,
    () => {
      if (userId.value) {
        loadUserData()
      }
    }
  )
</script>
