<template>
  <div class="card bg-base-100 shadow-lg overflow-hidden group">
    <figure class="relative h-48">
      <img
        :src="primaryPhotoUrl || 'https://placehold.co/400x300?text=Véhicule'"
        :alt="`${booking.vehicle?.make} ${booking.vehicle?.model}`"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 badge text-base-100" :class="statusBadgeClass">
        {{ statusLabel }}
      </div>
    </figure>
    <div class="card-body p-4 flex flex-col justify-between">
      <!-- Détails véhicule et prix -->
      <div>
        <div class="flex justify-between items-start mb-2">
          <div>
            <h2 class="card-title text-base font-bold truncate">
              {{ booking.vehicle?.make }} {{ booking.vehicle?.model }}
            </h2>
            <p class="text-sm text-base-content/70">{{ booking.vehicle?.year }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-base-content/70">Prix total</p>
            <p class="font-bold text-xl text-primary">{{ formatPrice(booking.total_price) }}</p>
            <div
              v-if="booking.status === 'owner_approved' || booking.status === 'confirmed'"
              class="text-xs mt-1"
            >
              <span v-if="booking.is_deposit_paid" class="text-success font-semibold"
                >✓ Acompte payé</span
              >
              <span v-else class="text-warning">⏳ Acompte en attente</span>
            </div>
            <div
              v-if="booking.payment_reference"
              class="text-xs text-base-content/60 mt-1 truncate"
              :title="booking.payment_reference"
            >
              Réf-paiement: {{ booking.payment_reference }}
            </div>
          </div>
        </div>
        <div class="divider my-2"></div>
        <!-- Période et Infos du LOCATAIRE -->
        <div class="space-y-3 text-sm">
          <div class="flex items-center gap-2">
            <Icon name="material-symbols:date-range-outline" class="h-4 w-4 text-base-content/70" />
            <div>
              <p class="text-xs text-base-content/70 -mb-1">Période demandée</p>
              <p>
                <span class="font-semibold">{{ formatDate(booking.start_date) }}</span> au
                <span class="font-semibold">{{ formatDate(booking.end_date) }}</span>
              </p>
            </div>
          </div>
          <div v-if="booking.renter">
            <div class="flex justify-between items-start gap-2">
              <div>
                <p class="text-xs text-base-content/70 flex items-center gap-1">
                  <Icon name="mdi:account-group" class="h-4 w-4" /> Demandé par
                </p>
                <p class="text-sm font-medium flex items-center flex-wrap gap-x-2 gap-y-1">
                  <span class="inline-flex items-center gap-1">
                    <Icon name="mdi:card-account-details" class="h-4 w-4" />
                    <span>{{ booking.renter.first_name }} {{ booking.renter.last_name }}</span>
                  </span>
                  <span
                    v-if="booking.renter.phone"
                    class="inline-flex items-center gap-1 font-normal text-base-content/80"
                  >
                    <span>-</span>
                    <Icon name="mdi:phone" class="h-4 w-4" />
                    <span>{{ booking.renter.phone }}</span>
                  </span>
                </p>
                <p
                  v-if="booking.renter.address"
                  class="text-xs text-base-content/70 flex items-center gap-1"
                >
                  <Icon name="mdi:map-marker" class="h-4 w-4" />
                  <span>{{ booking.renter.address }}, {{ booking.renter.city }}</span>
                </p>
              </div>
              <NuxtLink
                :to="`/bookings/${booking.id}`"
                class="btn btn-secondary btn-sm btn-outline w-32"
              >
                Détails
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <!-- Actions du propriétaire -->
      <div v-if="booking.status === 'pending'" class="card-actions justify-end mt-4">
        <button class="btn btn-error btn-sm" @click="$emit('refuse', booking.id)">Refuser</button>
        <button class="btn btn-success btn-sm" @click="$emit('approve', booking.id)">
          Approuver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Booking } from '~/types'
  import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from '~/types'

  const props = defineProps({
    booking: {
      type: Object as PropType<Booking>,
      required: true
    }
  })

  defineEmits(['approve', 'refuse'])

  const supabase = useNuxtApp().$supabase

  // UTILS
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return 'N/A'
    return new Intl.NumberFormat('fr-MG', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    return new Date(dateString).toLocaleDateString('fr-FR', options)
  }

  // COMPUTED
  const primaryPhotoUrl = computed(() => {
    const vehicle = props.booking.vehicle
    if (!vehicle?.vehicle_photos || vehicle.vehicle_photos.length === 0) {
      return null
    }
    const primaryPhoto = vehicle.vehicle_photos.find(p => p.is_primary) || vehicle.vehicle_photos[0]
    if (!primaryPhoto?.file_path) return null
    const { data } = supabase.storage.from('cars').getPublicUrl(primaryPhoto.file_path)
    return data.publicUrl
  })

  const statusLabel = computed(() => {
    return BOOKING_STATUS_LABELS[props.booking.status] || props.booking.status
  })

  const statusBadgeClass = computed(() => {
    return BOOKING_STATUS_COLORS[props.booking.status] || 'badge-ghost'
  })
</script>
