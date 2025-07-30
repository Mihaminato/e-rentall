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
          Demande de réservation reçue
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ renterName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous avons bien reçu votre demande de réservation pour le véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >.
        </Text>

        <Section
          style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0"
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la réservation :</strong>
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
            • Statut : En attente de confirmation
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Votre demande est actuellement <strong>en cours de traitement</strong>. Le propriétaire du
          véhicule va examiner votre demande et vous recevrez une notification dès qu'une décision
          sera prise.
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
            Suivre ma demande
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
    renterName: string
    vehicleName: string
    vehicleModel: string
    vehicleLicensePlate: string
    startDate: Date
    endDate: Date
    destination: string
    reservationId: string
    appUrl: string
  }>()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
</script>
