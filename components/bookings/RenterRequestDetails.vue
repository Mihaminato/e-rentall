<template>
  <div v-if="renterRequestDetails" class="mt-4">
    <div class="divider"></div>
    <h3 class="text-lg font-semibold mb-3">Détails de la demande du locataire</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-4 rounded-lg">
      <div>
        <div class="flex items-center gap-2 font-semibold">
          <Icon name="mdi:map-marker-outline" />
          <span>Destination</span>
        </div>
        <p class="pl-6">{{ renterRequestDetails.destination }}</p>
      </div>
      <div>
        <div class="flex items-center gap-2 font-semibold">
          <Icon name="mdi:briefcase-outline" />
          <span>Type de location</span>
        </div>
        <p class="pl-6">{{ getLocationTypeLabel(renterRequestDetails.locationType) }}</p>
      </div>
      <div>
        <div class="flex items-center gap-2 font-semibold">
          <Icon name="mdi:account-group-outline" />
          <span>Nombre de personnes</span>
        </div>
        <p class="pl-6">{{ renterRequestDetails.numberOfPeople }}</p>
      </div>
      <div v-if="renterRequestDetails.comments" class="md:col-span-2">
        <div class="flex items-center gap-2 font-semibold">
          <Icon name="mdi:comment-text-outline" />
          <span>Commentaires du locataire</span>
        </div>
        <p class="pl-6 italic">"{{ renterRequestDetails.comments }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Booking } from '~/types'

  const props = defineProps<{
    booking: Booking | null
  }>()

  const renterRequestDetails = computed(() => {
    if (!props.booking?.owner_notes) return null
    try {
      const details = JSON.parse(props.booking.owner_notes)
      if (typeof details === 'object' && details !== null && 'destination' in details) {
        return details
      }
      return null
    } catch (e) {
      return null
    }
  })

  const getLocationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      tourisme: 'Tourisme / Loisir',
      professionnel: 'Professionnel',
      transport: 'Transport de personnes',
      demenagement: 'Déménagement',
      mariage: 'Mariage / Événement',
      urgence: 'Urgence médicale',
      autre: 'Autre'
    }
    return labels[type] || type
  }
</script>
