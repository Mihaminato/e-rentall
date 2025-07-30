<template>
  <div>
    <div v-if="loading && users.length === 0" class="text-center">
      <span class="loading loading-lg loading-spinner"></span>
    </div>

    <div v-else-if="users.length > 0" class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Dernière soumission</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.profile_id" class="hover">
            <td>
              <div class="flex items-center space-x-3">
                <UiUserAvatar
                  :avatar-path="user.avatar_url"
                  :first-name="user.first_name"
                  :last-name="user.last_name"
                  size-class="w-12 h-12"
                />
                <div>
                  <div class="font-bold">{{ user.first_name }} {{ user.last_name }}</div>
                  <div class="text-sm opacity-50">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td>
              <span v-if="user.last_submission_date">
                {{ new Date(user.last_submission_date).toLocaleDateString() }}
              </span>
              <span v-else>N/A</span>
            </td>
            <td>
              <div class="flex space-x-2">
                <span
                  v-for="doc in user.documents"
                  :key="doc.id"
                  class="badge badge-ghost badge-sm"
                >
                  {{ doc.type.toUpperCase() }}
                </span>
              </div>
            </td>
            <td>
              <NuxtLink
                :to="`/users/${user.profile_id}`"
                class="btn btn-primary btn-sm"
                title="Consulter le profil et les documents"
              >
                Vérifier
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="!loading" class="flex flex-row justify-center items-center text-center py-8">
      <p class="text-lg flex flex-row items-center justify-center">
        <Icon name="mdi:check-circle-outline" class="w-8 h-8 mr-2 text-success" />Aucun utilisateur
        n'est actuellement en attente de vérification.
      </p>
    </div>

    <!-- Le loader de "chargement de page suivante" est maintenant géré par le parent -->
  </div>
</template>

<script setup lang="ts">
  import type { UserToVerify } from '~/types'
  import UiUserAvatar from '~/components/ui/UserAvatar.vue'

  defineProps<{
    users: UserToVerify[]
    loading: boolean
    allLoaded: boolean
  }>()
</script>
