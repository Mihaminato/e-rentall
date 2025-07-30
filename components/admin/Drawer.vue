<template>
  <div class="drawer lg:drawer-open">
    <!-- <input id="admin-drawer" type="checkbox" class="drawer-toggle" /> -->

    <!-- Contenu principal -->
    <div class="drawer-content flex flex-col">
      <AdminNavbar />
      <main class="p-6">
        <slot></slot>
      </main>
    </div>

    <!-- Sidebar Note: active only for more money $-->
    <!-- <div class="drawer-side">
      <label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <AdminSidebar />
    </div> -->
  </div>
</template>

<script setup lang="ts">
  // Composant drawer admin principal
</script>
