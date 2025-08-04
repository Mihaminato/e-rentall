<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-base-100 bg-opacity-90 backdrop-blur-lg shadow-lg border-b border-base-200"
  >
    <div class="navbar max-w-7xl mx-auto py-2">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><NuxtLink to="/">Accueil</NuxtLink></li>
            <li><NuxtLink to="/vehicles">Véhicules</NuxtLink></li>
            <li><NuxtLink to="/how-it-works">Comment ça marche</NuxtLink></li>
          </ul>
        </div>

        <!-- Logo seul -->
        <NuxtLink to="/" class="btn btn-ghost p-2 hover:bg-transparent border-none">
          <img :src="logo" alt="Vaika Malaky Logo" class="h-32 w-auto object-contain" />
        </NuxtLink>
      </div>

      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li><NuxtLink to="/" class="hover:bg-base-200 rounded-lg">Accueil</NuxtLink></li>
          <li>
            <NuxtLink to="/vehicles" class="hover:bg-base-200 rounded-lg">Véhicules</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/how-it-works" class="hover:bg-base-200 rounded-lg"
              >Comment ça marche</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div class="navbar-end">
        <ClientOnly>
          <NavAuthMenu />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import NavAuthMenu from '~/components/NavAuthMenu.vue'
  import logo from '~/assets/imgs/vaika-malaky.png'
</script>
