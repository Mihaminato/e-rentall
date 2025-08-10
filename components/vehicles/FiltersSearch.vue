<template>
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body">
      <div class="w-full max-w-screen-xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Trouvez votre véhicule idéal</h2>
        <div class="flex flex-row flex-wrap gap-4 items-end">
          <!-- Filtres principaux - Visibles sur grand écran -->
          <div class="hidden md:block md:basis-1/4 md:min-w-[240px] flex-shrink-0">
            <UiFormSelect
              v-model="internalFilters.province"
              label="Province"
              :options="provinceOptions"
            />
          </div>
          <div class="hidden md:block md:basis-1/4 md:min-w-[240px] flex-shrink-0">
            <UiFormInput v-model="internalFilters.startDate" label="Date de début" type="date" />
          </div>
          <div class="hidden md:block md:basis-1/4 md:min-w-[240px] flex-shrink-0">
            <UiFormInput v-model="internalFilters.endDate" label="Date de fin" type="date" />
          </div>

          <!-- Boutons d'action pour le mode bureau -->
          <div class="hidden md:flex gap-2 flex-nowrap items-center md:justify-end flex-shrink-0">
            <button
              class="btn btn-primary btn-sm md:btn-md whitespace-nowrap"
              @click="applyFilters"
            >
              <Icon name="mdi:magnify" class="mr-1" />
              Rechercher
            </button>
            <button class="btn btn-ghost btn-sm md:btn-md whitespace-nowrap" @click="clearFilters">
              Réinitialiser
            </button>
          </div>
        </div>

        <!-- Filtres avancés -->
        <div class="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box mt-2">
          <input v-model="advancedFiltersOpen" type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            <Icon name="mdi:filter-variant" class="mr-2" />
            Filtres
          </div>
          <div class="collapse-content">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <!-- Filtres principaux - Dupliqués ici pour le mode mobile -->
              <div class="md:hidden">
                <UiFormSelect
                  v-model="internalFilters.province"
                  label="Province"
                  :options="provinceOptions"
                />
              </div>
              <div class="md:hidden">
                <UiFormInput
                  v-model="internalFilters.startDate"
                  label="Date de début"
                  type="date"
                />
              </div>
              <div class="md:hidden">
                <UiFormInput v-model="internalFilters.endDate" label="Date de fin" type="date" />
              </div>

              <!-- Filtres avancés -->
              <UiFormSelect
                v-model="internalFilters.vehicleType"
                label="Type de véhicule"
                :options="vehicleTypeOptions"
              />
              <!-- <UiFormSelect
              v-model="internalFilters.transmission"
              label="Transmission"
              :options="transmissionOptions"
            /> -->
              <!-- <UiFormSelect
              v-model="internalFilters.fuelType"
              label="Carburant"
              :options="fuelTypeOptions"
            /> -->
              <UiFormInput
                v-model="internalFilters.seats"
                label="Nombre de sièges minimum"
                type="number"
                min="1"
                placeholder="ex: 4"
              />
              <UiFormSelect
                v-model="internalFilters.maxPrice"
                label="Fourchette de prix / jour"
                :options="priceRangeOptions"
              />
              <!-- <UiFormInput
              v-model="internalFilters.keywords"
              label="Mots-clés"
              placeholder="Marque, modèle..."
              class="md:col-span-3"
            /> -->
            </div>
            <!-- Boutons d'action pour le mode mobile -->
            <div class="flex flex-row gap-4 mt-6 md:hidden">
              <button class="btn btn-primary flex-grow" @click="applyFilters">
                <Icon name="mdi:magnify" class="mr-2" />
                Appliquer les filtres
              </button>
              <button class="btn btn-ghost flex-grow shadow-sm" @click="clearFilters">
                <Icon name="mdi:close" class="mr-2" />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { SearchFilters } from '~/types'
  import { CITY_OPTIONS, VEHICLE_TYPE_OPTIONS, PRICE_RANGE_OPTIONS } from '~/types'

  // Props & Emits
  const props = defineProps<{
    filters: SearchFilters
  }>()

  const emit = defineEmits<{
    (e: 'update:filters', filters: SearchFilters): void
    (e: 'apply-filters'): void
  }>()

  // État interne
  const internalFilters = ref<SearchFilters>({ ...props.filters })
  const advancedFiltersOpen = ref(false)

  // Options pour les selects
  const provinceOptions = [{ value: '', label: 'Toutes' }, ...CITY_OPTIONS]
  const vehicleTypeOptions = [{ value: '', label: 'Tous' }, ...VEHICLE_TYPE_OPTIONS]
  const priceRangeOptions = [{ value: '', label: 'Toutes' }, ...PRICE_RANGE_OPTIONS]

  // Synchroniser l'état interne si les filtres externes changent (ex: depuis l'URL)
  watch(
    () => props.filters,
    newFilters => {
      internalFilters.value = { ...newFilters }
    },
    { deep: true }
  )

  // Fonctions d'action
  const applyFilters = () => {
    emit('update:filters', internalFilters.value)
    emit('apply-filters')
    advancedFiltersOpen.value = false // Fermer l'accordéon après la recherche
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      province: '',
      startDate: '',
      endDate: '',
      vehicleType: '',
      transmission: '',
      fuelType: '',
      seats: '',
      maxPrice: '',
      keywords: ''
    }
    internalFilters.value = clearedFilters
    emit('update:filters', clearedFilters)
    emit('apply-filters')
  }
</script>
