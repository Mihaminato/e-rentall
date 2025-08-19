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
          Réservation confirmée pour votre véhicule
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ ownerName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Excellente nouvelle ! La réservation pour votre véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong> est confirmée.
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
            <strong>Détails de la réservation confirmée :</strong>
          </Text>
          <Text v-if="reservationId" style="margin: 10px 0 0 0; color: #666">
            • ID Réservation : #{{ reservationId.slice(0, 8) }}
          </Text>
          <Text v-else style="margin: 10px 0 0 0; color: #666"> • ID Réservation : N/A </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Locataire : {{ renterName }} ({{ renterEmail }})
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
            • Acompte reçu : {{ formatPrice(depositAmount) }} ✅
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Référence paiement : {{ paymentReference }}
          </Text>
        </Section>

        <Section
          style="
            background-color: #e3f2fd;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #2196f3;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Prochaines étapes :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • Préparez votre véhicule pour la location
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Contactez le locataire pour organiser la remise du véhicule
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Le solde sera réglé à la fin de la location
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Félicitations pour cette nouvelle location ! Le système vous notifiera de toute mise à
          jour concernant cette réservation.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/bookings/${reservationId}`"
            style="
              background-color: #2563eb;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              font-size: 16px;
            "
          >
            Voir la réservation
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
    ownerName: string
    renterName: string
    renterEmail: string
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
