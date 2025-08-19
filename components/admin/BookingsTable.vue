<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Réservation</th>
          <th>Véhicule</th>
          <th>Locataire</th>
          <th>Propriétaire</th>
          <th>Période</th>
          <th>Montant</th>
          <th>Acompte</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id" class="hover">
          <td>
            <div class="font-mono text-sm">#{{ booking.id.slice(0, 8) }}</div>
            <div class="text-xs opacity-50">{{ formatDate(booking.created_at) }}</div>
          </td>
          <td>
            <div class="font-medium">{{ booking.vehicle?.make }} {{ booking.vehicle?.model }}</div>
            <div class="text-sm opacity-50">{{ booking.vehicle?.year }}</div>
          </td>
          <td>
            <NuxtLink
              v-if="booking.renter"
              :to="`/users/${booking.renter.id}`"
              class="flex items-center space-x-2 link link-hover"
            >
              <UiUserAvatar
                :avatar-path="booking.renter?.avatar_url"
                :first-name="booking.renter?.first_name"
                :last-name="booking.renter?.last_name"
                size-class="w-8 h-8"
              />
              <div class="font-medium">{{ getProfileFullName(booking.renter) }}</div>
            </NuxtLink>
            <span v-else>N/A</span>
          </td>
          <td>
            <NuxtLink
              v-if="booking.vehicle?.owner"
              :to="`/users/${booking.vehicle.owner.id}`"
              class="flex items-center space-x-2 link link-hover"
            >
              <UiUserAvatar
                :avatar-path="booking.vehicle?.owner?.avatar_url"
                :first-name="booking.vehicle?.owner?.first_name"
                :last-name="booking.vehicle?.owner?.last_name"
                size-class="w-8 h-8"
              />
              <div class="font-medium">
                {{ getProfileFullName(booking.vehicle?.owner) }}
              </div>
            </NuxtLink>
            <span v-else>N/A</span>
          </td>
          <td>
            <div class="text-sm">
              <div>{{ formatDate(booking.start_date) }}</div>
              <div>{{ formatDate(booking.end_date) }}</div>
              <div class="text-xs opacity-50">{{ getBookingDuration(booking) }} jours</div>
            </div>
          </td>
          <td>
            <div class="font-semibold">{{ formatPrice(booking.total_price) }}</div>
          </td>
          <td>
            <div
              v-if="booking.is_deposit_paid"
              class="flex flex-wrap items-center gap-1 justify-center"
            >
              <div class="badge badge-success badge-sm text-success-content">Payé</div>
              <div
                v-if="booking.payment_reference"
                class="text-xs text-base-100 font-mono badge badge-sm badge-primary whitespace-nowrap"
                :title="booking.payment_reference"
              >
                #{{ booking.payment_reference }}
              </div>
            </div>
            <div v-else-if="booking.status === 'owner_approved'">
              <span class="badge badge-warning badge-sm text-warning-content">En attente</span>
            </div>
            <div v-else class="text-center">-</div>
          </td>
          <td>
            <div class="badge whitespace-nowrap" :class="getStatusClass(booking.status)">
              {{ getStatusLabel(booking.status) }}
            </div>
          </td>
          <td>
            <div class="flex items-center gap-1">
              <button
                @click="navigateTo(`/bookings/${booking.id}`)"
                class="btn btn-ghost btn-sm btn-square"
                title="Voir les détails"
              >
                <Icon name="mdi:eye" class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import type { Booking, Profile } from '~/types'

  defineProps<{
    bookings: Booking[]
  }>()

  const supabase = useNuxtApp().$supabase

  // --- Logique copiée de pages/admin/bookings.vue ---
  const BOOKING_STATUS_LABELS: Record<string, string> = {
    pending: 'En attente',
    owner_approved: 'Prop. OK',
    confirmed: 'Admin OK',
    active: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé'
  }

  const BOOKING_STATUS_COLORS: Record<string, string> = {
    pending: 'badge-warning',
    owner_approved: 'badge-info',
    confirmed: 'badge-primary',
    active: 'badge-success',
    completed: 'badge-ghost',
    cancelled: 'badge-error'
  }

  const getPublicUrl = (filePath: string | undefined, bucket: 'cars' | 'avatars') => {
    const defaultUrl = 'https://placehold.co/100x100?text=N/A'
    if (!filePath) return defaultUrl
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
    return data?.publicUrl || defaultUrl
  }

  const getProfileFullName = (profile: Profile | null | undefined) => {
    if (!profile) return 'N/A'
    return `${profile.first_name} ${profile.last_name}`
  }

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A'
    return dayjs(date).format('DD/MM/YYYY')
  }

  const getBookingDuration = (booking: Booking) => {
    return dayjs(booking.end_date).diff(dayjs(booking.start_date), 'day')
  }

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }

  const getStatusLabel = (status: string) => BOOKING_STATUS_LABELS[status] || status
  const getStatusClass = (status: string) => BOOKING_STATUS_COLORS[status] || 'badge-ghost'

  const navigateTo = (path: string) => {
    useRouter().push(path)
  }
</script>
