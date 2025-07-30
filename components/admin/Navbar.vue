<template>
  <div class="navbar bg-base-100 shadow-md">
    <!-- Menu mobile toggle -->
    <!-- <div class="flex-none lg:hidden"> -->
    <!-- <label for="admin-drawer" class="btn btn-square btn-ghost">
        <Icon name="mdi:menu" class="w-5 h-5" />
      </label> -->
    <!-- </div> -->

    <!-- Titre -->
    <div class="flex-1">
      <span class="text-xl font-semibold">Administration</span>
    </div>

    <!-- Menu utilisateur -->
    <div class="flex-none">
      <AdminUserMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
  // Composant navbar admin
</script>
