<template>
  <div class="card bg-base-100 shadow-md border border-accent/20 shadow-accent/20">
    <div class="card-body">
      <h2 class="card-title">
        {{ isEditing ? 'Modifier mes informations' : 'Mes informations' }}
      </h2>

      <div v-if="!isEditing">
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="flex items-start gap-2">
            <Icon name="mdi:phone" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Téléphone</p>
              <p>{{ profile?.phone || 'Non renseigné' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:home-outline" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Adresse</p>
              <p>{{ profile?.address || 'Non renseignée' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:city-variant-outline" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Ville</p>
              <p>{{ profile?.city || 'Non renseignée' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:map-marker-radius-outline" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Code postal</p>
              <p>{{ profile?.postal_code || 'Non renseigné' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:card-account-details-outline" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Numéro CIN</p>
              <p>{{ formatCinForDisplay(profile?.cin_number) || 'Non renseigné' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:calendar-outline" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Date de délivrance CIN</p>
              <p>{{ formatDateForDisplay(profile?.cin_issued_date) || 'Non renseigné' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:file-document-outline" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Numéro NIF</p>
              <p>{{ profile?.nif_number || 'Non renseigné' }}</p>
            </div>
          </div>

          <div class="flex items-start gap-2">
            <Icon name="mdi:chart-line" class="text-info w-5 h-5 mt-0.5" />
            <div>
              <p class="font-semibold">Numéro STAT</p>
              <p>{{ profile?.stat_number || 'Non renseigné' }}</p>
            </div>
          </div>
        </div>
      </div>

      <form v-else @submit.prevent="$emit('save')">
        <!-- Alerte d'information -->
        <div class="alert alert-info mb-6 shadow-sm">
          <Icon name="mdi:information-outline" class="stroke-current shrink-0 w-6 h-6" />
          <span
            >Modifiez vos informations personnelles et cliquez sur "Enregistrer" pour valider.</span
          >
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4">
          <!-- Email (désactivé) -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 bg-base-200 opacity-80 cursor-not-allowed w-full"
            >
              <Icon name="mdi:email-outline" class="h-4 w-4 opacity-70" />
              <input :value="email" type="email" class="grow bg-transparent" disabled />
            </label>
            <span class="text-xs text-info mt-1 ml-1">L'email ne peut pas être modifié</span>
          </div>

          <!-- Prénom -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:account-outline" class="h-4 w-4 opacity-70" />
              <input v-model="firstName" type="text" placeholder="Prénom" class="grow" required />
            </label>
          </div>

          <!-- Nom -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:account-outline" class="h-4 w-4 opacity-70" />
              <input v-model="lastName" type="text" placeholder="Nom" class="grow" required />
            </label>
          </div>

          <!-- Téléphone -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:phone-outline" class="h-4 w-4 opacity-70" />
              <input v-model="phone" type="tel" placeholder="Téléphone" class="grow" required />
            </label>
          </div>

          <!-- Adresse -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:home-outline" class="h-4 w-4 opacity-70" />
              <input v-model="address" type="text" placeholder="Adresse" class="grow" required />
            </label>
          </div>

          <!-- Code postal -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:map-marker-radius-outline" class="h-4 w-4 opacity-70" />
              <input v-model="postalCode" type="text" placeholder="Code postal" class="grow" required />
            </label>
          </div>

          <!-- Numéro CIN -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:card-account-details-outline" class="h-4 w-4 opacity-70" />
              <input
                v-model="cinNumber"
                type="text"
                placeholder="CIN"
                class="grow"
                maxlength="14"
                required
                @input="handleCinInput"
              />
            </label>
            <span class="text-xs text-base-content/70 mt-1 ml-1">Format: 12 chiffres</span>
          </div>

          <!-- Date de délivrance CIN -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:calendar-outline" class="h-4 w-4 opacity-70" />
              <input v-model="cinIssuedDate" type="date" class="grow" required />
            </label>
            <span class="text-xs text-base-content/70 mt-1 ml-1">Date de délivrance de la CIN</span>
          </div>

          <!-- Numéro NIF -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:file-document-outline" class="h-4 w-4 opacity-70" />
              <input v-model="nifNumber" type="text" placeholder="Numéro NIF" class="grow" />
            </label>
            <span class="text-xs text-base-content/70 mt-1 ml-1"
              >Numéro d'Identification Fiscale (optionnel)</span
            >
          </div>

          <!-- Numéro STAT -->
          <div class="form-control">
            <label
              class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
            >
              <Icon name="mdi:chart-line" class="h-4 w-4 opacity-70" />
              <input v-model="statNumber" type="text" placeholder="Numéro STAT" class="grow" />
            </label>
            <span class="text-xs text-base-content/70 mt-1 ml-1">Numéro STAT (Statistique) (optionnel)</span>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-8">
          <button
            type="button"
            class="btn btn-outline btn-md"
            :disabled="loading"
            @click="$emit('cancel')"
          >
            <Icon name="mdi:close" class="h-5 w-5" />
            Annuler
          </button>
          <button type="submit" class="btn btn-primary btn-md" :disabled="loading">
            <Icon v-if="!loading" name="mdi:check" class="h-5 w-5" />
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {  type Profile, type City } from '~/types'
  import { formatCinNumber } from '~/utils/validation'
  import dayjs from 'dayjs'

  const props = defineProps<{
    profile: Profile | null
    modelValue: Partial<Profile>
    isEditing: boolean
    loading: boolean
    email: string // Email de l'utilisateur depuis Supabase Auth
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: Partial<Profile>]
    save: []
    cancel: []
    fileChange: [event: Event]
  }>()

  // Fonctions utilitaires pour l'affichage
  const formatCinForDisplay = (cinNumber?: string) => {
    if (!cinNumber) return null
    return formatCinNumber(cinNumber)
  }

  const formatDateForDisplay = (dateString?: string) => {
    if (!dateString) return null
    return dayjs(dateString).format('DD/MM/YYYY')
  }

  // Fonction pour formater le CIN en temps réel
  const handleCinInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    cinNumber.value = formatCinNumber(value)
  }

  // Computed properties pour chaque champ du formulaire
  const firstName = computed({
    get: () => props.modelValue.first_name,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, first_name: value })
    }
  })

  const lastName = computed({
    get: () => props.modelValue.last_name,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, last_name: value })
    }
  })

  const phone = computed({
    get: () => props.modelValue.phone,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, phone: value })
    }
  })

  const address = computed({
    get: () => props.modelValue.address,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, address: value })
    }
  })

  const city = computed({
    get: () => props.modelValue.city,
    set: (value: City | undefined) => {
      emit('update:modelValue', { ...props.modelValue, city: value })
    }
  })

  const postalCode = computed({
    get: () => props.modelValue.postal_code,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, postal_code: value })
    }
  })

  const cinNumber = computed({
    get: () => props.modelValue.cin_number,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, cin_number: value })
    }
  })

  const cinIssuedDate = computed({
    get: () => props.modelValue.cin_issued_date,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, cin_issued_date: value })
    }
  })

  const nifNumber = computed({
    get: () => props.modelValue.nif_number,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, nif_number: value })
    }
  })

  const statNumber = computed({
    get: () => props.modelValue.stat_number,
    set: (value: string) => {
      emit('update:modelValue', { ...props.modelValue, stat_number: value })
    }
  })
</script>
