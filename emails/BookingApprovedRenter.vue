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
          Demande acceptée - Régler l'acompte
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ renterName }},
        </Text>

        <Text v-if="reservationId" style="color: #666; font-size: 16px; line-height: 1.6">
          Excellente nouvelle ! Votre demande <strong>#{{ reservationId.slice(0, 8) }}</strong> a
          été acceptée par le propriétaire. Merci de régler l'acompte pour confirmer la réservation.
        </Text>
        <Text v-else style="color: #666; font-size: 16px; line-height: 1.6">
          Excellente nouvelle ! Votre demande a été acceptée par le propriétaire. Merci de régler
          l'acompte pour confirmer la réservation.
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
        </Section>

        <Section
          style="
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border: 2px solid #007bff;
          "
        >
          <Text style="margin: 0; color: #333; text-align: center">
            <strong>Montant de l'acompte à régler :</strong>
          </Text>
          <Text
            style="
              margin: 10px 0 0 0;
              color: #007bff;
              font-size: 24px;
              font-weight: bold;
              text-align: center;
            "
          >
            {{ formatPrice(depositAmount) }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666; text-align: center; font-size: 14px">
            (nombre de jours * 5000 Ar)
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Pour finaliser votre réservation, veuillez vous connecter à votre espace et procéder au
          paiement de l'acompte. Une fois l'acompte réglé, votre réservation sera définitivement
          confirmée.
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
            Payer l'acompte maintenant
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
