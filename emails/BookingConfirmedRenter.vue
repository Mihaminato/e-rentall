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
          🎉 Réservation confirmée !
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ renterName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Excellente nouvelle ! Votre réservation pour le véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong> est confirmée. Merci pour votre confiance !
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
            <strong>Détails de votre réservation confirmée :</strong>
          </Text>
          <Text v-if="reservationId" style="margin: 10px 0 0 0; color: #666">
            • ID Réservation : #{{ reservationId.slice(0, 8) }}
          </Text>
          <Text v-else style="margin: 10px 0 0 0; color: #666"> • ID Réservation : N/A </Text>
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
            <strong>Prochaines étapes :</strong>
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Le propriétaire vous contactera pour organiser votre voyage
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Conservez cette confirmation pour vos records
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous vous souhaitons un excellent voyage ! En cas de questions, n'hésitez pas à nous
          contacter ou à consulter votre espace personnel.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/bookings/${reservationId}`"
            style="
              background-color: #28a745;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              font-size: 16px;
            "
          >
            Voir ma réservation
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Cordialement,<br />
          L'équipe VehicleRental
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
