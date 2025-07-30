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
          [ADMIN] Demande acceptée par le propriétaire
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6"> Bonjour Admin, </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Le propriétaire a accepté la demande de réservation pour le véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong
          >.
        </Text>

        <Section
          style="
            background-color: #d4edda;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la réservation acceptée :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • ID Réservation : {{ reservationId }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Demandeur : {{ renterName }} ({{ renterEmail }})
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Propriétaire : {{ ownerName }} ({{ ownerEmail }})
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Véhicule : {{ vehicleName }} {{ vehicleModel }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Matricule : {{ vehicleLicensePlate }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Période : {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666"> • Destination : {{ destination }} </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Prix total : {{ formatPrice(totalPrice) }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Acompte demandé : {{ formatPrice(depositAmount) }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Statut : En attente de paiement acompte
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          La réservation est maintenant en attente du paiement de l'acompte par le locataire. Une
          fois l'acompte réglé, vous devrez confirmer définitivement la réservation.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/bookings/${reservationId}`"
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
            Voir la réservation
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Système VehicleRental
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
    renterName: string
    renterEmail: string
    ownerName: string
    ownerEmail: string
    vehicleName: string
    vehicleModel: string
    vehicleLicensePlate: string
    startDate: Date
    endDate: Date
    destination: string
    totalPrice: number
    depositAmount: number
    appUrl: string
  }>()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }
</script>
