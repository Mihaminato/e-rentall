<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>CIN</th>
          <th>NIF</th>
          <th>STAT</th>
          <th>Ville</th>
          <th>Statut</th>
          <th>Rôle</th>
          <th>Inscription</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div v-if="user.avatar_url" class="w-10 h-10 rounded-full">
                  <img
                    :src="user.avatar_url"
                    :alt="`Avatar de ${user.first_name}`"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-full h-full rounded-full bg-base-300/50 flex items-center justify-center"
                >
                  <Icon name="mdi:account" size="40" class="text-base-content/60" />
                </div>
              </div>
              <div>
                <div class="font-semibold">{{ user.first_name }} {{ user.last_name }}</div>
                <div class="text-sm text-base-content/70">ID: {{ user.id.slice(0, 8) }}...</div>
              </div>
            </div>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone || 'Non renseigné' }}</td>
          <td>
            <div v-if="user.cin_number" class="text-sm">
              <div class="font-mono">{{ formatCinForDisplay(user.cin_number) }}</div>
              <div class="text-xs text-base-content/70">
                {{ formatCinDateForDisplay(user.cin_issued_date) }}
              </div>
            </div>
            <span v-else class="text-base-content/50">Non renseigné</span>
          </td>
          <td>
            <span v-if="user.nif_number" class="font-mono">{{ user.nif_number }}</span>
            <span v-else class="text-base-content/50">Non renseigné</span>
          </td>
          <td>
            <span v-if="user.stat_number" class="font-mono">{{ user.stat_number }}</span>
            <span v-else class="text-base-content/50">Non renseigné</span>
          </td>
          <td>{{ user.city || 'Non renseigné' }}</td>
          <td>
            <span
              :class="[
                'badge h-auto min-w-max',
                user.is_verified ? 'badge-success' : 'badge-warning'
              ]"
            >
              {{ user.is_verified ? 'Vérifié' : 'En attente' }}
            </span>
          </td>
          <td>
            <span
              :class="['badge h-auto min-w-max', user.is_admin ? 'badge-error' : 'badge-ghost']"
            >
              {{ user.is_admin ? 'Admin' : 'Utilisateur' }}
            </span>
          </td>
          <td>
            <div class="text-sm">
              {{ formatDate(user.created_at) }}
            </div>
          </td>
          <td>
            <div class="flex gap-2">
              <NuxtLink
                :to="`/users/${user.id}`"
                class="btn btn-xs btn-ghost"
                title="Voir le profil"
              >
                <Icon name="mdi:eye" />
              </NuxtLink>

              <button
                v-if="!user.is_verified"
                class="btn btn-xs btn-success"
                title="Vérifier l'utilisateur"
                @click="$emit('toggle-verification', user)"
              >
                <Icon name="mdi:check" />
              </button>

              <button
                v-else
                class="btn btn-xs btn-warning"
                title="Retirer la vérification"
                @click="$emit('toggle-verification', user)"
              >
                <Icon name="mdi:close" />
              </button>

              <button
                v-if="!user.is_admin"
                class="btn btn-xs btn-error"
                title="Promouvoir admin"
                @click="$emit('toggle-role', user)"
              >
                <Icon name="mdi:account-plus" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { Profile } from '~/types'
  import { formatCinNumber } from '~/utils/validation'
  import dayjs from 'dayjs'

  defineProps<{
    users: Profile[]
  }>()

  defineEmits<{
    (e: 'toggle-verification' | 'toggle-role', user: Profile): void
  }>()

  // Formatage des dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Formatage CIN pour affichage
  const formatCinForDisplay = (cinNumber?: string) => {
    if (!cinNumber) return null
    return formatCinNumber(cinNumber)
  }

  // Formatage date CIN pour affichage
  const formatCinDateForDisplay = (dateString?: string) => {
    if (!dateString) return null
    return dayjs(dateString).format('DD/MM/YYYY')
  }
</script>
