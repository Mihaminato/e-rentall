<!-- Page de gestion des véhicules de l'utilisateur -->
<template>
  <div>
    <div class="container mx-auto px-4 py-8">
      <!--NOTE: A implementer plus tard  Carte utilisateur-->
      <!-- <ProfileUserCard
        :user="profile ?? null"
        :active-vehicle-count="vehicleCounts.active"
        :inactive-vehicle-count="vehicleCounts.inactive"
      /> -->

      <!-- En-tête avec titre et bouton d'ajout -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Mes véhicules</h1>
        <div v-if="vehicleCounts.active > 0 || vehicleCounts.inactive > 0" class="text-right">
          <button :disabled="!canAddVehicle" class="btn btn-primary" @click="openAddVehicleModal()">
            <Icon name="mdi:add" class="w-5 h-5 mr-2" />
            Ajouter un véhicule
          </button>
          <div
            v-if="!canAddVehicle"
            class="alert alert-info mt-2 text-left text-sm p-3 max-w-md ml-auto"
          >
            <Icon name="mdi:information-outline" class="w-6 h-6" />
            <div class="flex flex-col gap-2">
              <span>
                Pour ajouter un véhicule, votre profil doit être vérifié (NIF/STAT et documents
                requis).
              </span>
              <button class="btn btn-primary btn-sm w-fit" @click="navigateTo('/profile')">
                <Icon name="mdi:account-edit" class="w-4 h-4 mr-2" />
                Compléter mon profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglets de navigation -->
      <div
        v-if="vehicleCounts.active > 0 || vehicleCounts.inactive > 0"
        class="tabs tabs-bordered mb-6"
      >
        <button
          :class="['tab tab-bordered', { 'tab-active': activeTab === 'active' }]"
          @click="changeTab('active')"
        >
          Véhicules actifs
          <div class="badge badge-neutral ml-2">{{ vehicleCounts.active }}</div>
        </button>
        <button
          :class="['tab tab-bordered', { 'tab-active': activeTab === 'inactive' }]"
          @click="changeTab('inactive')"
        >
          En attente de validation
          <div class="badge badge-warning ml-2 text-base-100">{{ vehicleCounts.inactive }}</div>
        </button>
      </div>

      <!-- Composant Toast pour les notifications -->
      <UiToast
        :visible="toast.visible"
        :message="toast.message"
        :type="toast.type"
        @close="toast.visible = false"
      />

      <!-- État de chargement global -->
      <div v-if="isLoading && vehicles.length === 0" class="flex justify-center">
        <div class="card-body text-center py-12 flex flex-col items-center">
          <div class="loading loading-spinner loading-lg mx-auto mb-4"></div>
          <p>Chargement de vos véhicules...</p>

          <!-- Bouton d'annulation pour les chargements longs -->
          <button class="btn btn-sm btn-outline mt-4 w-sm" @click="cancelLoading">Annuler</button>
        </div>
      </div>

      <!-- Message d'erreur avec bouton de retry -->
      <div v-else-if="hasError" class="space-y-6">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body text-center py-8">
            <Icon name="mdi:alert-circle" class="w-12 h-12 mx-auto mb-4 text-warning" />
            <h3 class="text-lg font-semibold mb-2">Problème de chargement</h3>
            <p class="text-base-content/70 mb-4">
              Une erreur s'est produite lors du chargement de vos véhicules.
            </p>
            <div class="flex gap-2 justify-center">
              <button class="btn btn-primary" @click="retryLoading">
                <Icon name="mdi:refresh" class="w-4 h-4 mr-2" />
                Réessayer
              </button>
              <button class="btn btn-outline" @click="clearCacheAndRetry">
                <Icon name="mdi:cached" class="w-4 h-4 mr-2" />
                Vider le cache
              </button>
            </div>
          </div>
        </div>

        <!-- Guide d'aide -->
        <UiSessionTroubleshoot />
      </div>

      <!-- Aucun véhicule -->
      <div
        v-else-if="vehicleCounts.active === 0 && vehicleCounts.inactive === 0"
        class="card bg-base-100 shadow-lg"
      >
        <div class="card-body text-center py-12">
          <h2 class="text-2xl font-semibold mb-4">Vous n'avez pas encore de véhicules</h2>
          <p class="mb-4">Commencez à louer votre véhicule et gagnez de l'argent</p>
          <div class="mx-auto">
            <button
              :disabled="!canAddVehicle"
              class="btn btn-primary"
              @click="openAddVehicleModal()"
            >
              Ajouter mon premier véhicule
            </button>
            <div
              v-if="!canAddVehicle"
              class="alert alert-info mt-4 text-left text-sm p-3 max-w-md mx-auto"
            >
              <Icon name="mdi:information-outline" class="w-6 h-6" />
              <span>
                Pour ajouter un véhicule, veuillez renseigner vos NIF/STAT dans votre profil et
                téléverser les documents correspondants pour vérification.
              </span>
              <button class="btn btn-primary btn-sm w-fit" @click="navigateTo('/profile')">
                <Icon name="mdi:account-edit" class="w-4 h-4 mr-2" />
                Compléter mon profil
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Aucun véhicule dans l'onglet actuel -->
      <div v-else-if="vehicles.length === 0" class="card bg-base-100 shadow-lg">
        <div class="card-body text-center py-12">
          <h2 class="text-2xl font-semibold mb-4">
            {{ activeTab === 'active' ? 'Aucun véhicule actif' : 'Aucun véhicule en attente' }}
          </h2>
          <p class="mb-4">
            {{
              activeTab === 'active'
                ? "Vous n'avez pas de véhicules actifs pour le moment"
                : "Vous n'avez pas de véhicules en attente de validation"
            }}
          </p>
        </div>
      </div>

      <!-- Liste des véhicules -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          class="card bg-base-100 shadow-md overflow-hidden duration-300"
        >
          <!-- Carrousel de photos -->
          <div class="relative h-52 bg-base-200 cursor-pointer overflow-hidden">
            <VehiclesPhotoCarousel
              :photos="vehicle.vehicle_photos || []"
              :vehicle-name="`${vehicle.make} ${vehicle.model}`"
              :vehicle-id="vehicle.id"
            />

            <h2
              class="absolute h-10 items-center flex bottom-2 left-2 z-10 text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] backdrop-blur-sm bg-black/40 px-2 py-1 rounded"
            >
              {{ vehicle.make }} {{ vehicle.model }}
            </h2>
          </div>

          <!-- Corps de la carte avec design épuré -->
          <div
            class="card-body p-4 flex flex-col cursor-pointer"
            @click="navigateTo(`/vehicles/${vehicle.id}`)"
          >
            <div class="flex items-center justify-between mt-1 text-xs">
              <p class="font-bold text-2xl text-primary mr-2 rounded-lg">
                {{ vehicle.price_per_day }} <span class="text-lg">Ar/jour</span>
              </p>
              <div class="flex items-center">
                <Icon name="mdi:map-marker" class="text-primary w-4 h-4 mr-1" />
                <p class="text-xs">{{ vehicle.province }}</p>
              </div>
            </div>
            <!-- Caractéristiques -->
            <div class="mb-2 flex w-full">
              <div class="flex flex-wrap gap-1">
                <div class="badge badge-outline badge-sm">
                  <Icon name="mdi:calendar" class="w-3 h-3 mr-1" />{{ vehicle.year }}
                </div>
                <div class="badge badge-outline badge-sm">
                  <Icon name="mdi:car-shift-pattern" class="w-3 h-3 mr-1" />{{
                    vehicle.transmission
                  }}
                </div>
                <div class="badge badge-outline badge-sm">
                  <Icon name="mdi:car" class="w-3 h-3 mr-1" />{{ vehicle.vehicle_type }}
                </div>
                <div v-if="vehicle.fuel_type" class="badge badge-outline badge-sm">
                  <Icon name="mdi:gas-station" class="w-3 h-3 mr-1" />{{
                    getFuelTypeLabel(vehicle.fuel_type)
                  }}
                </div>
                <div class="badge badge-outline badge-sm">
                  <Icon name="mdi:account-group" class="w-3 h-3 mr-1" />{{ vehicle.seats }} places
                </div>
                <div v-if="vehicle.license_plate" class="badge badge-outline badge-sm">
                  <Icon name="mdi:card-text" class="w-3 h-3 mr-1" />{{ vehicle.license_plate }}
                </div>
                <div v-if="vehicle.consumption" class="badge badge-outline badge-sm">
                  <Icon name="mdi:gas-station" class="w-3 h-3 mr-1" />{{ vehicle.consumption }}
                  L/100
                </div>
              </div>
            </div>

            <!-- Disponibilités -->
            <div>
              <div
                v-if="
                  vehicleAvailabilities[vehicle.id] && vehicleAvailabilities[vehicle.id].length > 0
                "
                class="badge badge-success gap-1"
              >
                <Icon name="mdi:check-circle" class="w-4 h-4" />
                {{ vehicleAvailabilities[vehicle.id].length }} période(s) de disponibilité
              </div>
              <div v-else class="badge badge-warning gap-1">
                <Icon name="mdi:alert" class="w-4 h-4" />
                Pas de disponibilité
              </div>
            </div>

            <!-- Actions avec toggle -->
            <div class="mt-auto pt-2">
              <!-- Boutons d'action principaux -->
              <div class="flex flex-wrap gap-2 justify-between items-center">
                <div class="flex flex-wrap gap-1">
                  <button class="btn btn-sm btn-ghost text-xs px-2" @click="editVehicle(vehicle)">
                    <Icon name="mdi:pencil" class="w-4 h-4 mr-1" />Modifier
                  </button>
                  <button
                    class="btn btn-sm btn-ghost text-xs px-2"
                    @click="manageAvailability(vehicle)"
                  >
                    <Icon name="mdi:calendar" class="w-4 h-4 mr-1" />Disponibilités
                  </button>
                  <NuxtLink
                    :to="`/vehicles/${vehicle.id}`"
                    class="btn btn-sm btn-ghost text-xs px-2"
                  >
                    <Icon name="mdi:eye" class="w-4 h-4 mr-1" />Voir détail
                  </NuxtLink>
                </div>
                <!-- Le bouton s'étire sur mobile, revient à la largeur normale sur ≥ sm -->
                <button class="btn btn-soft btn-error flex-1" @click="confirmDelete(vehicle)">
                  <Icon name="mdi:delete" class="w-6 h-6" />
                </button>
              </div>

              <!-- Toggle Actif/Inactif dans une rangée séparée -->
              <div class="form-control w-full mt-2 border-t pt-2">
                <label class="cursor-pointer flex justify-between items-center">
                  <span class="text-sm">{{
                    vehicle.is_active ? 'Véhicule actif' : 'En attente de validation'
                  }}</span>
                  <!-- TODO: add toggle active /inactive @change="toggleActive(vehicle)"  -->
                  <input
                    type="checkbox"
                    class="toggle toggle-primary toggle-sm"
                    :checked="vehicle.is_active"
                    :disabled="true"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages.value > 1" class="flex justify-center mt-8">
        <UiPagination
          :current-page="pagination.currentPage.value"
          :total-items="pagination.totalItems.value"
          :page-size="pagination.pageSize.value"
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>

      <!-- Modal pour ajouter/éditer un véhicule -->
      <VehiclesFormModal
        v-if="showAddVehicleModal"
        :vehicle="editingVehicle"
        @close="showAddVehicleModal = false"
        @saved="handleVehicleSaved"
      />
    </div>

    <!-- Modal de confirmation pour supprimer un véhicule -->
    <UiConfirmationModal
      :visible="isDeleteModalVisible"
      title="Supprimer ce véhicule ?"
      :message="
        vehicleToDelete
          ? `Êtes-vous sûr de vouloir supprimer définitivement le véhicule : ${vehicleToDelete.make} ${vehicleToDelete.model} ? Toutes les données associées (photos, disponibilités) seront perdues.`
          : ''
      "
      :loading="isDeleting"
      confirm-text="Supprimer"
      @confirm="proceedWithDeleteVehicle"
      @cancel="cancelDelete"
    />

    <!-- Modal pour gérer les disponibilités -->
    <VehiclesAvailabilityModal
      modal-id="availability-modal"
      :vehicle="vehicleForAvailability"
      @update="refreshAvailabilities"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useVehicles } from '~/composables/useVehicles'
  import { useAvailabilities } from '~/composables/useAvailabilities'
  import { usePagination } from '~/composables/usePagination'
  import { useAuthStore } from '~/stores/auth'
  import type { Vehicle, Availability } from '~/types'
  import { FUEL_TYPE_OPTIONS } from '~/types'

  // Middleware d'authentification
  definePageMeta({
    middleware: 'auth'
  })

  // ----- COMPOSABLES -----
  const { deleteVehicle, fetchMyVehicles, getMyVehiclesCounts } = useVehicles()
  const { fetchVehicleAvailabilities } = useAvailabilities()
  const { user: authUser, profile } = storeToRefs(useAuthStore())
  const pagination = usePagination({ pageSize: 5 })
  // États réactifs du composant
  const vehicles = ref<Vehicle[]>([])
  const isLoading = ref(true)
  const isDeleting = ref(false)
  const hasError = ref(false)
  const loadingCancelled = ref(false)

  // États pour la pagination et les onglets
  const activeTab = ref<'active' | 'inactive'>('active')
  const vehicleCounts = ref({
    active: 0,
    inactive: 0
  })

  // Gestion des modaux
  const showAddVehicleModal = ref(false)
  const isDeleteModalVisible = ref(false)
  const editingVehicle = ref<Vehicle | null>(null)
  const vehicleToDelete = ref<Vehicle | null>(null)
  const vehicleForAvailability = ref<Vehicle | null>(null)

  // Gestion des disponibilités
  const vehicleAvailabilities = ref<Record<string, Availability[]>>({})

  // Gestion des notifications Toast
  const toast = reactive({
    visible: false,
    message: '',
    type: 'info' as 'info' | 'success' | 'warning' | 'error'
  })

  // --- CONDITION SIMPLIFIÉE ---
  const canAddVehicle = computed(() => !!profile.value?.is_verified)
  // --------------------------

  // ----- FONCTIONS -----

  // Afficher un toast
  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    toast.message = message
    toast.type = type
    toast.visible = true
  }

  // Obtenir le label du type de carburant pour l'affichage
  const getFuelTypeLabel = (value: string) => {
    return FUEL_TYPE_OPTIONS.find(option => option.value === value)?.label || value
  }

  // ----- GESTION DES VÉHICULES -----

  // Charger les véhicules de l'utilisateur avec pagination
  const loadVehicles = async () => {
    if (!authUser.value?.id) return
    if (loadingCancelled.value) {
      isLoading.value = false
      return
    }

    isLoading.value = true
    hasError.value = false

    const statuses = activeTab.value === 'active' ? [true] : [false]
    const {
      vehicles: fetchedVehicles,
      error,
      totalCount
    } = await fetchMyVehicles(
      authUser.value.id,
      false,
      statuses,
      pagination.currentPage.value,
      pagination.pageSize.value
    )

    if (error) {
      hasError.value = true
      showToast(error, 'error')
    } else if (fetchedVehicles) {
      vehicles.value = fetchedVehicles
      pagination.totalItems.value = totalCount || 0
      await loadAllAvailabilities(fetchedVehicles)
    }
    isLoading.value = false
  }

  // Charger les compteurs de véhicules
  const loadCounts = async () => {
    if (!authUser.value?.id) return

    const { counts, error } = await getMyVehiclesCounts(authUser.value.id)
    if (!error) {
      vehicleCounts.value = counts
    }
  }

  // Gérer la sauvegarde (ajout/modification) d'un véhicule
  const handleVehicleSaved = () => {
    showAddVehicleModal.value = false
    editingVehicle.value = null
    showToast('Véhicule sauvegardé avec succès!', 'success')
    loadCounts() // Recharger les compteurs
    loadVehicles() // Recharger la liste pour voir les changements
  }

  // Ouvrir le modal pour l'ajout
  const openAddVehicleModal = () => {
    editingVehicle.value = null
    showAddVehicleModal.value = true
  }

  // Ouvrir le modal pour la modification
  const editVehicle = (vehicle: Vehicle) => {
    editingVehicle.value = vehicle
    showAddVehicleModal.value = true
  }

  // ----- GESTION DE LA SUPPRESSION -----

  // Fonction pour ouvrir la modale de confirmation de suppression
  const confirmDelete = (vehicle: Vehicle) => {
    if (!vehicle.id) return
    vehicleToDelete.value = vehicle
    isDeleteModalVisible.value = true
  }

  // Annuler la suppression
  const cancelDelete = () => {
    isDeleteModalVisible.value = false
    vehicleToDelete.value = null
  }

  // Procéder à la suppression après confirmation
  const proceedWithDeleteVehicle = async () => {
    if (!vehicleToDelete.value) return

    const vehicleId = vehicleToDelete.value.id
    isDeleting.value = true

    const { success, error } = await deleteVehicle(vehicleId)

    if (success) {
      // Retirer le véhicule de la liste locale
      vehicles.value = vehicles.value.filter(v => v.id !== vehicleId)
      showToast('Véhicule supprimé avec succès.', 'success')
      // Recharger les compteurs et la liste
      await loadCounts()
      await loadVehicles()
    } else {
      showToast(`Erreur lors de la suppression : ${error}`, 'error')
    }

    isDeleting.value = false
    isDeleteModalVisible.value = false
    vehicleToDelete.value = null
  }

  // ----- GESTION DES DISPONIBILITÉS -----

  // Charger les disponibilités pour tous les véhicules
  const loadAllAvailabilities = async (vehicleList: Vehicle[]) => {
    const promises = vehicleList.map(async v => {
      const { data, error } = await fetchVehicleAvailabilities(v.id)
      if (!error && data) {
        vehicleAvailabilities.value[v.id] = data
      }
    })
    await Promise.all(promises)
  }

  // Ouvrir le modal pour gérer les disponibilités
  const manageAvailability = (vehicle: Vehicle) => {
    vehicleForAvailability.value = vehicle
    const availabilityModal = document.getElementById('availability-modal') as HTMLDialogElement
    if (availabilityModal) {
      availabilityModal.showModal()
    }
  }

  // Rafraîchir les disponibilités après mise à jour
  const refreshAvailabilities = async (vehicleId: string) => {
    const { data, error } = await fetchVehicleAvailabilities(vehicleId)
    if (!error && data) {
      vehicleAvailabilities.value[vehicleId] = data
    }
  }

  // ----- GESTION DU CHARGEMENT -----

  // Annuler un chargement trop long
  const cancelLoading = () => {
    loadingCancelled.value = true
    isLoading.value = false
  }

  // Réessayer de charger après une erreur
  const retryLoading = () => {
    loadingCancelled.value = false
    loadVehicles()
  }

  // Vider un cache potentiel et réessayer (simulation)
  const clearCacheAndRetry = () => {
    // Dans une vraie app, on pourrait vider un store ou un cache local
    console.log('Cache vidé (simulation)...')
    retryLoading()
  }

  // ----- GESTION DES ONGLETS ET PAGINATION -----

  // Changer d'onglet
  const changeTab = (tab: 'active' | 'inactive') => {
    activeTab.value = tab
    pagination.currentPage.value = 1 // Reset à la première page
  }

  // Gestionnaires d'événements pour la pagination
  const handlePageChange = (page: number) => {
    pagination.goToPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    pagination.changePageSize(size)
  }

  // Watchers pour recharger les données
  watch([() => pagination.currentPage.value, () => pagination.pageSize.value, activeTab], () => {
    loadVehicles()
  })

  // ----- CYCLE DE VIE -----

  // Charger les données au montage du composant
  onMounted(async () => {
    await loadCounts()
    await loadVehicles()
  })
</script>
