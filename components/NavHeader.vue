<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-base-100 bg-opacity-90 backdrop-blur-lg shadow-lg border-b border-base-200"
  >
    <div class="navbar max-w-7xl mx-auto py-2">
      <div class="navbar-start">
        <!-- Menu hamburger pour mobile et tablette -->
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
            class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-56 max-h-96 overflow-y-auto"
          >
            <li><NuxtLink to="/" class="text-base py-3">Accueil</NuxtLink></li>
            <li><NuxtLink to="/vehicles" class="text-base py-3">Véhicules</NuxtLink></li>
            <li><NuxtLink to="/how-it-works" class="text-base py-3">Comment ça marche</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-base py-3">À propos</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-base py-3">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Logo responsive -->
        <NuxtLink to="/" class="btn btn-ghost p-1 sm:p-2 hover:bg-transparent border-none">
          <img 
            :src="logo" 
            alt="E-Rentall Logo" 
            class="h-6 w-auto object-contain transition-all duration-200 sm:h-8 md:h-10 lg:h-12 xl:h-14 2xl:h-16" 
          />
        </NuxtLink>
      </div>

      <!-- Navigation centrale - visible sur tablette et desktop -->
      <div class="navbar-center hidden md:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          <li>
            <NuxtLink to="/" class="hover:bg-base-200 rounded-lg px-3 py-2 text-sm lg:text-base">
              Accueil
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/vehicles" class="hover:bg-base-200 rounded-lg px-3 py-2 text-sm lg:text-base">
              Véhicules
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/how-it-works" class="hover:bg-base-200 rounded-lg px-3 py-2 text-sm lg:text-base">
              Comment ça marche?
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Menu d'authentification -->
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
  import logo from '~/assets/imgs/e-rentall-main.svg'
</script>
