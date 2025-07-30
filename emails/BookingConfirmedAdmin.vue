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
          [ADMIN] Acompte réglé - Réservation confirmée
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6"> Bonjour Admin, </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          L'acompte pour la réservation du véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong> a été réglé. La réservation est maintenant confirmée.
        </Text>

        <Section
          style="
            background-color: #d1ecf1;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #17a2b8;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la réservation confirmée :</strong>
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
            • Acompte réglé : {{ formatPrice(depositAmount) }} ✅
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Référence paiement : {{ paymentReference }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666"> • Statut : Confirmée et active </Text>
        </Section>

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
            <strong>Actions automatiques effectuées :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • Email de confirmation envoyé au locataire
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Email de confirmation envoyé au propriétaire
          </Text>
        </Section>

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
            Consulter la réservation
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
    paymentReference: string
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
