<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Date de début -->
      <div class="flex items-center justify-between sm:block p-3 rounded-lg bg-base-200/50">
        <span class="text-sm text-base-content/70">Date de début : </span>
        <span class="font-semibold">{{ formatDate(booking.start_date) }}</span>
      </div>

      <!-- Date de fin -->
      <div class="flex items-center justify-between sm:block p-3 rounded-lg bg-base-200/50">
        <span class="text-sm text-base-content/70">Date de fin : </span>
        <span class="font-semibold">{{ formatDate(booking.end_date) }}</span>
      </div>

      <!-- Durée -->
      <div class="flex items-center justify-between sm:block p-3 rounded-lg bg-base-200/50">
        <span class="text-sm text-base-content/70">Durée : </span>
        <span class="font-semibold"
          >{{ getDuration(booking.start_date, booking.end_date) }} jours</span
        >
      </div>

      <!-- Prix par jour -->
      <div class="flex items-center justify-between sm:block p-3 rounded-lg bg-base-200/50">
        <span class="text-sm text-base-content/70">Prix par jour : </span>
        <span v-if="booking.vehicle" class="font-semibold">{{
          formatPrice(booking.vehicle.price_per_day)
        }}</span>
      </div>

      <!-- Acompte -->
      <div
        v-if="booking.deposit_amount"
        class="flex items-center justify-between sm:block p-3 rounded-lg bg-base-200/50"
      >
        <span class="text-sm text-base-content/70">Acompte (nombre de jours * 5000 Ar) : </span>
        <div class="flex items-center gap-2">
          <span class="font-semibold">{{ formatPrice(booking.deposit_amount) }}</span>
          <span
            v-if="booking.is_deposit_paid"
            class="badge badge-success badge-sm text-success-content"
            >Payé</span
          >
          <span v-else class="badge badge-warning badge-sm text-warning-content text-white"
            >En attente</span
          >
        </div>
      </div>

      <!-- Référence de paiement -->
      <div v-if="booking.payment_reference" class="p-3 rounded-lg bg-base-200/50">
        <div class="text-sm text-base-content/70 mb-1">Numéro de téléphone de l'envoyeur :</div>
        <div class="font-semibold font-mono">+261 {{ booking.payment_reference }}</div>
      </div>
    </div>
    <!-- Prix total -->
    <div class="mt-4 pt-4 border-t border-base-content/10">
      <div class="flex justify-between items-center text-lg">
        <span class="font-bold">Prix total : </span>
        <span class="font-bold text-primary">{{ formatPrice(booking.total_price) }}</span>
      </div>
      <div
        v-if="booking.deposit_amount && booking.is_deposit_paid"
        class="flex items-center justify-between text-lg"
      >
        <span class="font-bold">Reste à payer : </span>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-primary"
            >{{ formatPrice(booking.total_price - booking.deposit_amount) }}
          </span>
          <span class="font-semibold text-primary"
            >({{ formatPrice(booking.deposit_amount) }} déjà payés)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Booking } from '~/types'

  defineProps<{
    booking: Booking
  }>()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    if (typeof price !== 'number') return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }

  const getDuration = (startDate: string, endDate: string) => {
    return calculateDurationInDays(startDate, endDate)
  }
</script>
