<template>
  <div class="card bg-base-100 shadow-md border border-base-300 self-start">
    <!-- Bannière supérieure décorative avec gradient harmonieux -->
    <div
      class="h-20 bg-gradient-to-r from-accent/20 via-accent/30 to-base-300/20 rounded-t-lg"
    ></div>

    <div class="card-body items-center text-center pb-6">
      <!-- Avatar avec effet d'élévation et possibilité d'édition -->
      <div class="avatar -mt-18 mb-4 relative">
        <div
          class="w-24 h-24 mask mask-squircle bg-base-200 ring ring-accent ring-offset-base-100 ring-offset-2 shadow-lg overflow-hidden"
        >
          <!-- Image de profil (existante, téléchargée ou par défaut) -->
          <template v-if="previewImage || profileImageUrl">
            <img
              :src="previewImage || profileImageUrl"
              alt="Photo de profil"
              class="object-cover w-full h-full"
            />
          </template>
          <template v-else>
            <!-- Placeholder avec initiales -->
            <div class="w-full h-full flex items-center justify-center bg-accent text-white">
              <span class="text-2xl font-bold">{{ userInitials }}</span>
            </div>
          </template>

          <!-- Bouton d'édition sur l'avatar (visible uniquement en mode édition) -->
          <label
            v-if="isEditing"
            for="profile-image-upload"
            class="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
          >
            <Icon name="mdi:camera" class="w-8 h-8 text-white" />
          </label>
          <input
            v-if="isEditing"
            id="profile-image-upload"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageChange"
          />
        </div>
      </div>

      <!-- Bloc infos regroupé -->
      <div class="flex flex-col items-center gap-1">
        <h2 class="card-title font-bold text-xl m-0">
          {{ firstName || 'Prénom' }} {{ lastName || 'Nom' }}
        </h2>
        <!-- <p class="text-base-content/70 flex items-center gap-1 m-0">
          <Icon name="mdi:email" class="text-base opacity-70" />
          {{ email || 'Chargement...' }}
        </p> -->
        <div class="flex justify-center">
          <div v-if="isVerified" class="badge badge-sm badge-success gap-1 py-1 px-2">
            <Icon name="mdi:check-circle" class="text-xs" /> Vérifié
          </div>
          <!-- NOTE: Pour le moment seul les locataires sont vérifiés -->
          <!-- <div v-else class="badge badge-sm badge-outline badge-warning gap-1 py-1 px-2">
            <Icon name="mdi:clock-outline" class="text-xs" /> En attente
          </div> -->
        </div>
      </div>

      <!-- Divider élégant -->

      <!-- Informations additionnelles pour la vue publique -->
      <div v-if="publicView" class="w-full text-left p-4 border-t border-base-200">
        <div class="grid grid-cols-2 gap-x-6 gap-y-4">
          <!-- Téléphone -->
          <!-- <div v-if="phone" class="flex items-center gap-3">
            <Icon name="mdi:phone" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Téléphone</p>
              <p class="text-base-content">{{ phone }}</p>
            </div>
          </div> -->
          <!-- Adresse -->
          <div v-if="address" class="flex items-start gap-3">
            <Icon name="mdi:map-marker" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Adresse</p>
              <p class="text-base-content">{{ address }}</p>
            </div>
          </div>
          <!-- Ville -->
          <div v-if="city" class="flex items-start gap-3">
            <Icon name="mdi:city-variant" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Ville</p>
              <p class="text-base-content">{{ city }}</p>
            </div>
          </div>
          <!-- Code postal -->
          <div v-if="postalCode" class="flex items-start gap-3">
            <Icon name="mdi:map-marker-radius-outline" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Code postal</p>
              <p class="text-base-content">{{ postalCode }}</p>
            </div>
          </div>
          <!-- Numéro CIN -->
          <div v-if="cinNumber" class="flex items-start gap-3">
            <Icon name="mdi:card-account-details-outline" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Numéro CIN</p>
              <p class="text-base-content">{{ cinNumber }}</p>
            </div>
          </div>
          <!-- Date de délivrance CIN -->
          <div v-if="cinIssuedDate" class="flex items-start gap-3">
            <Icon name="mdi:calendar-check" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Date de délivrance CIN</p>
              <p class="text-base-content">{{ formattedCinDate }}</p>
            </div>
          </div>
          <!-- Numéro NIF -->
          <div v-if="nifNumber" class="flex items-start gap-3">
            <Icon name="mdi:file-document-outline" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Numéro NIF</p>
              <p class="text-base-content">{{ nifNumber }}</p>
            </div>
          </div>
          <!-- Numéro STAT -->
          <div v-if="statNumber" class="flex items-start gap-3">
            <Icon name="mdi:chart-line" class="h-5 w-5 text-primary mt-1" />
            <div>
              <p class="font-medium text-base-content/60">Numéro STAT</p>
              <p class="text-base-content">{{ statNumber }}</p>
            </div>
          </div>
        </div>
        <!-- Membre depuis le -->
        <div
          v-if="memberSince"
          class="flex items-center justify-center gap-2 text-sm text-base-content/70 mt-4 pt-4 border-t border-base-200"
        >
          <Icon name="mdi:calendar" class="h-4 w-4" />
          <span>Membre depuis {{ memberSince }}</span>
        </div>
      </div>

      <!-- Bouton d'action avec effet hover (masqué en mode public) -->
      <div v-if="!publicView" class="card-actions justify-center w-full">
        <button
          class="btn btn-primary w-full btn-md hover:btn-primary transition-all duration-300 gap-2"
          @click="$emit('edit')"
        >
          Modifier mon profil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDateFormat } from '@vueuse/core'

  const props = defineProps<{
    firstName?: string
    lastName?: string
    email?: string
    isVerified?: boolean
    profileImageUrl?: string
    isEditing?: boolean
    publicView?: boolean
    phone?: string | null
    address?: string | null
    city?: string | null
    postalCode?: string | null
    cinNumber?: string | null
    nifNumber?: string | null
    statNumber?: string | null
    cinIssuedDate?: string | null
    memberSince?: string | null
  }>()

  const emit = defineEmits<{
    edit: []
    'update:image': [file: File]
  }>()

  const formattedCinDate = computed(() => {
    if (!props.cinIssuedDate) return ''
    return useDateFormat(props.cinIssuedDate, 'DD/MM/YYYY').value
  })

  // Image temporaire pour prévisualisation avant envoi
  const previewImage = ref<string | null>(null)

  // Initiales pour le placeholder
  const userInitials = computed(() => {
    const first = (props.firstName as string) || ''
    const last = (props.lastName as string) || ''
    return `${first.charAt(0) || 'U'}${last.charAt(0) || ''}`
  })

  // Gestion du changement d'image
  const handleImageChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      const file = input.files[0]

      // Créer une URL pour prévisualisation
      previewImage.value = URL.createObjectURL(file)

      // Émettre l'événement avec le fichier pour traitement par le parent
      emit('update:image', file)
    }
  }
</script>
