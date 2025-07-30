<template>
  <div>
    <!-- Hero Section (avec correction pour éliminer l'espace blanc) -->
    <div
      class="hero min-h-[100vh] bg-accent-200 -mt-16 md:-mt-20"
      style="
        background-image: url('https://images.unsplash.com/photo-1750792717021-57a790d10d28?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-size: cover;
        background-position: center;
      "
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-white">
        <div class="max-w-md md:max-w-lg lg:max-w-2xl">
          <h1 class="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold">
            Location de véhicules entre particuliers
          </h1>
          <p class="mb-5 text-lg">
            Louez un véhicule auprès de propriétaires locaux ou rentabilisez le vôtre quand vous ne
            l'utilisez pas.
          </p>
          <div class="card bg-base-100 text-base-content p-6 shadow-2xl">
            <h2 class="text-xl font-semibold mb-4">Trouvez votre véhicule idéal</h2>

            <ClientOnly>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UiFormSelect
                  v-model="searchLocation"
                  label="Lieux"
                  icon="mdi:map-marker"
                  :options="provinceOptions"
                  placeholder="Antananarivo"
                />
                <UiFormInput
                  v-model="startDate"
                  label="Date de début"
                  type="date"
                  icon="mdi:calendar"
                />

                <UiFormInput
                  v-model="endDate"
                  label="Date de fin"
                  type="date"
                  icon="mdi:calendar"
                />
              </div>
            </ClientOnly>

            <div class="mt-4">
              <button class="btn btn-primary w-sm" @click="searchVehicles">
                <Icon name="mdi:magnify" class="w-6 h-6" />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment ça marche -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-base-content mb-4">Comment ça marche</h2>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
            Simple, sécurisé, et direct - louez un véhicule en 4 étapes faciles.
          </p>
        </div>

        <div class="relative">
          <!-- Visual connector line -->
          <!-- <div
            class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 z-0"
          ></div> -->

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <!-- Step 1: Find Your Car -->
            <div class="flex flex-col items-center text-center relative">
              <div class="relative mb-6">
                <!-- Pastille en haut à droite du conteneur de l'icône -->
                <div
                  class="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 flex items-center justify-center shadow-lg rounded-full z-20"
                >
                  <span class="text-white font-bold text-sm">1</span>
                </div>
                <div
                  class="w-20 h-20 bg-white flex items-center justify-center shadow-md"
                >
                  <Icon name="mdi:magnify" class="text-2xl text-teal-500" />
                </div>
              </div>
              <h3 class="text-lg font-bold text-base-content mb-3">Trouvez votre véhicule</h3>
              <p class="text-base-content/70 leading-relaxed">
                Parcourez des centaines de véhicules de propriétaires locaux. Filtrez par lieu, type et budget.
              </p>
            </div>

            <!-- Step 2: Book Instantly -->
            <div class="flex flex-col items-center text-center relative">
              <div class="relative mb-6">
                <!-- Pastille en haut à droite du conteneur de l'icône -->
                <div
                  class="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 flex items-center justify-center shadow-lg rounded-full z-20"
                >
                  <span class="text-white font-bold text-sm">2</span>
                </div>
                <div
                  class="w-20 h-20 bg-white flex items-center justify-center shadow-md"
                >
                  <Icon name="mdi:key" class="text-2xl text-teal-500" />
                </div>
              </div>
              <h3 class="text-lg font-bold text-base-content mb-3">Réservez instantanément</h3>
              <p class="text-base-content/70 leading-relaxed">
                Réservez votre véhicule idéal avec confirmation instantanée. Notre plateforme sécurisée gère les paiements et les assurances.
              </p>
            </div>

            <!-- Step 3: Pick Up & Go -->
            <div class="flex flex-col items-center text-center relative">
              <div class="relative mb-6">
                <!-- Pastille en haut à droite du conteneur de l'icône -->
                <div
                  class="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 flex items-center justify-center shadow-lg rounded-full z-20"
                >
                  <span class="text-white font-bold text-sm">3</span>
                </div>
                <div
                  class="w-20 h-20 bg-white flex items-center justify-center shadow-md"
                >
                  <Icon name="mdi:car" class="text-2xl text-teal-500" />
                </div>
              </div>
              <h3 class="text-lg font-bold text-base-content mb-3">Récupérez et partez</h3>
              <p class="text-base-content/70 leading-relaxed">
                Rencontrez votre hôte, récupérez les clés et commencez votre aventure à Madagascar. GPS et support 24/7 inclus.
              </p>
            </div>

            <!-- Step 4: Drive Safely -->
            <div class="flex flex-col items-center text-center relative">
              <div class="relative mb-6">
                <!-- Pastille en haut à droite du conteneur de l'icône -->
                <div
                  class="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 flex items-center justify-center shadow-lg rounded-full z-20"
                >
                  <span class="text-white font-bold text-sm">4</span>
                </div>
                <div
                  class="w-20 h-20 bg-white flex items-center justify-center shadow-md"
                >
                  <Icon name="mdi:shield-check" class="text-2xl text-teal-500" />
                </div>
              </div>
              <h3 class="text-lg font-bold text-base-content mb-3">Drive Safely</h3>
              <p class="text-base-content/70 leading-relaxed">
                Every trip is covered by comprehensive insurance. Return the car and rate your experience.
              </p>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-12">
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink
              to="/vehicles"
              class="btn btn-primary px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Icon name="mdi:calendar-check" class="w-5 h-5 mr-2" />
              Commencer à réserver
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <ClientOnly>
      <!-- Nos derniers véhicules -->
      <section id="recent-vehicles" class="py-20 bg-base-200">
        <div class="container mx-auto px-4">
          <!-- Titre de la section -->
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold">Nos derniers véhicules</h2>
            <p class="text-lg text-base-content/70 mt-2">
              Découvrez les derniers ajouts à notre flotte.
            </p>
            <div class="mt-4">
              <NuxtLink to="/vehicles" class="btn btn-primary">Voir tous les véhicules</NuxtLink>
            </div>
          </div>

          <!-- Grille des véhicules -->
          <div v-if="isLoading" class="text-center">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <div v-else-if="error" class="alert alert-error">
            <Icon name="mdi:alert-circle" />
            <span>{{ error }}</span>
          </div>
          <div
            v-else-if="recentVehicles.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <VehiclesVehicleCard
              v-for="vehicle in recentVehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
            />
          </div>
          <div v-else class="text-center py-8">
            <p>Aucun véhicule à afficher pour le moment.</p>
          </div>
        </div>
      </section>
    </ClientOnly>

    <!-- Avantages / Pourquoi nous choisir -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Pourquoi nous choisir</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div class="text-4xl text-primary mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="font-bold">Réservation flexible</h3>
              <p class="text-sm">Annulation gratuite jusqu'à 24h avant la location</p>
            </div>
          </div>

          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div class="text-4xl text-primary mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 class="font-bold">Communauté vérifiée</h3>
              <p class="text-sm">Propriétaires et locataires vérifiés pour votre sécurité</p>
            </div>
          </div>

          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div class="text-4xl text-primary mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 class="font-bold">Support 24/7</h3>
              <p class="text-sm">Notre équipe est à votre service tout au long de votre location</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-neutral text-primary-content py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
        <p class="mb-6 max-w-xl mx-auto">
          Rejoignez notre communauté de propriétaires et locataires dès aujourd'hui et profitez de
          notre plateforme de location de véhicules entre particuliers.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/auth/register" class="btn bg-white text-primary hover:bg-gray-200"
            >S'inscrire gratuitement</NuxtLink
          >
          <NuxtLink
            to="/vehicles"
            class="btn btn-outline text-white border-white hover:bg-white hover:text-primary"
            >Explorer les véhicules</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Importations des composables et types
  import { CITY_OPTIONS } from '~/types'
  import type { Vehicle } from '~/types'
  import { useVehicles } from '~/composables/useVehicles'

  // Date actuelle pour les champs de date par défaut
  const currentDate = new Date()
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  const searchLocation = ref('')
  const startDate = ref(currentDate.toISOString().split('T')[0])
  const endDate = ref(tomorrow.toISOString().split('T')[0])

  // Options pour le select de province (avec "Toutes" en première option)
  const provinceOptions = [{ value: '', label: 'Toutes' }, ...CITY_OPTIONS]

  const { fetchVehiclesWithPagination } = useVehicles()

  const recentVehicles = ref<Vehicle[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  // Cette fonction sera implémentée plus tard avec Supabase
  const searchVehicles = () => {
    // Redirection vers la page de résultats avec les paramètres de recherche
    navigateTo({
      path: '/vehicles',
      query: {
        province: searchLocation.value,
        start_date: startDate.value,
        end_date: endDate.value
      }
    })
  }

  onMounted(async () => {
    try {
      isLoading.value = true
      const { data } = await fetchVehiclesWithPagination(undefined, 'newest', 1, 3)
      recentVehicles.value = data
    } catch (err) {
      console.error('Erreur lors du chargement des véhicules récents:', err)
      error.value = 'Impossible de charger les véhicules.'
    } finally {
      isLoading.value = false
    }
  })
</script>
