<template>
  <div class="alert alert-warning text-sm text-base-100">
    <Icon name="mdi:alert-circle-outline" class="h-6 w-6" />
    <div>
      <h3 class="font-bold">Profil incomplet</h3>
      <div class="text-xs">
        {{ text }}
      </div>
      <button class="btn btn-primary btn-sm w-fit" @click="navigateTo('/profile')">
                <Icon name="mdi:account-edit" class="w-4 h-4 mr-2" />
                Compléter mon profil
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    text: string
  }>()
</script>
