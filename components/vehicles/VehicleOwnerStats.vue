<template>
  <div class="card bg-base-100 shadow-lg">
    <div class="card-body">
      <div class="flex justify-between items-center">
        <h2 class="card-title text-xl">Gestion de votre véhicule</h2>
        <div class="flex gap-2">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
              <Icon name="mdi:settings" class="w-4 h-4" />
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a @click="$emit('manage-availability')"
                  ><Icon name="mdi:calendar" class="w-4 h-4" />Gérer disponibilités</a
                >
              </li>
              <li>
                <a @click="$emit('view-bookings')"
                  ><Icon name="mdi:eye" class="w-4 h-4" />Voir réservations</a
                >
              </li>
              <li>
                <a @click="$emit('edit-photos')"
                  ><Icon name="mdi:image" class="w-4 h-4" />Modifier photos</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Indicateurs de performance désactivés -->
      <!--
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-base-200 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-sm">Taux d'occupation</span>
            <span class="text-sm font-bold">{{ occupancyRate }}%</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-2">
            <div
              class="bg-primary h-2 rounded-full transition-all duration-500"
              :style="{ width: occupancyRate + '%' }"
            ></div>
          </div>
        </div>

        <div class="bg-base-200 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-sm">Taux de réponse</span>
            <span class="text-sm font-bold">{{ responseRate }}%</span>
          </div>
          <div class="w-full bg-base-300 rounded-full h-2">
            <div
              class="bg-success h-2 rounded-full transition-all duration-500"
              :style="{ width: responseRate + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="stat bg-gradient-to-br from-info/10 to-info/5 rounded-lg border border-info/20 p-3">
          <div class="flex items-center gap-2">
            <Icon name="mdi:star" class="w-6 h-6 text-info" />
            <div>
              <div class="stat-title text-xs">Note moyenne</div>
              <div class="stat-value text-info text-lg">{{ displayRating }}/5</div>
              <div class="stat-desc text-xs">{{ reviewsCount }} avis</div>
            </div>
          </div>
        </div>
        <div class="stat bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20 p-3">
          <div class="flex items-center gap-2">
            <Icon name="mdi:calendar" class="w-6 h-6 text-secondary" />
            <div>
              <div class="stat-title text-xs">Réservations</div>
              <div class="stat-value text-secondary text-lg">{{ bookingsCount }}</div>
              <div class="stat-desc text-xs">{{ bookingsActive }} en cours</div>
            </div>
          </div>
        </div>
        <div class="stat bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-3">
          <div class="flex items-center gap-2">
            <Icon name="mdi:eye" class="w-6 h-6 text-primary" />
            <div>
              <div class="stat-title text-xs">Vues totales</div>
              <div class="stat-value text-primary text-lg">{{ vehicle.views }}</div>
              <div class="stat-desc text-xs">+12% ce mois</div>
            </div>
          </div>
        </div>
        <div class="stat bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20 p-3">
          <div class="flex items-center gap-2">
            <Icon name="mdi:cash" class="w-6 h-6 text-accent" />
            <div>
              <div class="stat-title text-xs">Revenus</div>
              <div class="stat-value text-accent text-lg">{{ formatPrice(totalRevenue) }}</div>
              <div class="stat-desc text-xs">{{ formatPrice(monthlyRevenue) }} ce mois</div>
            </div>
          </div>
        </div>
      </div>
      -->

      <!-- Informations détaillées -->
      <div class="space-y-3">
        <div class="flex justify-between items-center py-2 border-b border-base-200">
          <div class="flex items-center gap-2">
            <Icon
              name="mdi:circle"
              :class="vehicle.is_active ? 'text-success' : 'text-error'"
              class="w-3 h-3"
            />
            <span class="font-medium text-sm">Statut de publication</span>
          </div>
          <div class="badge" :class="vehicle.is_active ? 'badge-success' : 'badge-error'">
            {{ vehicle.is_active ? 'Actif' : 'Inactif' }}
          </div>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-base-200">
          <span class="font-medium text-sm">Prix par jour</span>
          <span class="font-bold text-primary">{{ formatPrice(vehicle.price_per_day) }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-base-200">
          <span class="font-medium text-sm">Dernière réservation</span>
          <span class="text-sm text-base-content/70">{{ lastBookingDate || 'Aucune' }}</span>
        </div>

        <div class="flex justify-between items-center py-2 border-b border-base-200">
          <span class="font-medium text-sm">Dernière modification</span>
          <span class="text-sm text-base-content/70">{{ lastModified }}</span>
        </div>

        <div class="flex justify-between items-center py-2">
          <span class="font-medium text-sm">Date de création</span>
          <span class="text-sm text-base-content/70">{{ createdDate }}</span>
        </div>
      </div>

      <!-- Conseils d'amélioration -->
      <div v-if="improvementTips.length > 0" class="mt-6">
        <h3 class="font-semibold text-sm mb-3">Conseils d'amélioration</h3>
        <div class="space-y-2">
          <div
            v-for="tip in improvementTips"
            :key="tip.id"
            class="flex items-center gap-2 text-sm text-base-content/80"
          >
            <Icon :name="tip.icon" class="w-4 h-4 text-warning flex-shrink-0" />
            <span>{{ tip.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'

  interface Props {
    vehicle: {
      is_active?: boolean
      created_at?: string
      updated_at?: string
      views?: number
      price_per_day: number
    }
    bookingsCount?: number
    bookingsActive?: number
    totalRevenue?: number
    monthlyRevenue?: number
    averageRating?: number
    reviewsCount?: number
    lastBookingDate?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    bookingsCount: 0,
    bookingsActive: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    reviewsCount: 0,
    lastBookingDate: ''
  })

  defineEmits<{
    edit: []
    'manage-availability': []
    'view-bookings': []
    'edit-photos': []
  }>()

  // Formatage des dates
  const createdDate = computed(() => {
    if (!props.vehicle.created_at) return 'N/A'
    return dayjs(props.vehicle.created_at).format('DD/MM/YYYY')
  })

  const lastModified = computed(() => {
    const date = props.vehicle.updated_at || props.vehicle.created_at
    if (!date) return 'N/A'
    return dayjs(date).format('DD/MM/YYYY')
  })

  // Affichage de la note
  const displayRating = computed(() => {
    return props.averageRating > 0 ? props.averageRating.toFixed(1) : '0.0'
  })

  // Calculs de performance
  const occupancyRate = computed(() => {
    if (props.bookingsCount === 0) return 0
    return Math.min(Math.round((props.bookingsCount / 30) * 100), 100)
  })

  const responseRate = computed(() => {
    // TODO: Implement response rate calculation
    return 0
  })

  // Conseils d'amélioration basés sur les données
  const improvementTips = computed(() => {
    const tips = []

    if ((props.vehicle.views || 0) < 10) {
      tips.push({
        id: 'low-views',
        icon: 'mdi:eye-off',
        message: 'Ajoutez plus de photos pour augmenter la visibilité'
      })
    }

    if (props.bookingsCount === 0) {
      tips.push({
        id: 'no-bookings',
        icon: 'mdi:calendar-remove',
        message: 'Vérifiez vos disponibilités et votre prix'
      })
    }

    if (props.averageRating < 4 && props.reviewsCount > 0) {
      tips.push({
        id: 'low-rating',
        icon: 'mdi:star-half-full',
        message: 'Améliorez la qualité de service pour de meilleures notes'
      })
    }

    if (!props.vehicle.is_active) {
      tips.push({
        id: 'inactive',
        icon: 'mdi:pause-circle',
        message: 'Activez votre véhicule pour recevoir des réservations'
      })
    }

    return tips
  })

  // Formatage du prix en Ariary
  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price) + ' Ar'
    )
  }
</script>
