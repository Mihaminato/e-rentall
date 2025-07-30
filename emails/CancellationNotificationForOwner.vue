<template>
  <Html>
    <Head />
    <Body
      style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5"
    >
      <Container
        style="
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
        "
      >
        <Heading style="color: #333; text-align: center; margin-bottom: 30px">
          Annulation de Réservation
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ ownerName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Une réservation pour votre véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong> a été annulée.
        </Text>

        <Section
          style="
            background-color: #fff3cd;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de l'annulation :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • <strong>Annulée par :</strong> {{ cancelledBy }}
          </Text>
          <Text v-if="cancellationReason" style="margin: 5px 0 0 0; color: #666">
            • <strong>Raison fournie :</strong> {{ cancellationReason }}
          </Text>
        </Section>

        <Section
          style="
            background-color: #f1f1f1;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #6c757d;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la réservation concernée :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • ID Réservation : {{ reservationId }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Locataire : {{ renterName }} ({{ renterEmail }})
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Période : {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666"> • Statut : Annulée </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Votre calendrier de disponibilité pour ce véhicule a été mis à jour en conséquence. Aucune
          action supplémentaire n'est requise de votre part.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/bookings/requests`"
            style="
              background-color: #007bff;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
            "
          >
            Voir mes demandes
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Cordialement,<br />
          L'équipe Vaika Malaky
        </Text>
      </Container>
    </Body>
  </Html>
</template>

<script setup lang="ts">
  import {
    Html,
    Head,
    Body,
    Container,
    Heading,
    Text,
    Section,
    Button
  } from '@vue-email/components'

  defineProps<{
    reservationId: string
    ownerName: string
    renterName: string
    renterEmail: string
    vehicleName: string
    vehicleModel: string
    startDate: Date
    endDate: Date
    appUrl: string
    cancelledBy: string // "Le Locataire", "L'Admin"
    cancellationReason?: string
  }>()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
</script>
