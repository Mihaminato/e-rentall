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
          Nouvelle demande de réservation
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ ownerName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Une nouvelle demande de réservation est en attente pour votre véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong
          >. Merci de la traiter.
        </Text>

        <Section
          style="background-color: #e3f2fd; padding: 20px; border-radius: 6px; margin: 20px 0"
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la demande :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • Demandeur : {{ renterName }} ({{ renterEmail }})
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
            • Date de demande : {{ formatDate(createdAt) }}
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Veuillez vous connecter à votre espace pour accepter ou refuser cette demande de
          réservation.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/bookings/${reservationId}`"
            style="
              background-color: #2563eb;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
            "
          >
            Traiter cette demande
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Cordialement,<br />
          L'équipe E-rentall
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
    ownerName: string
    renterName: string
    renterEmail: string
    vehicleName: string
    vehicleModel: string
    vehicleLicensePlate: string
    startDate: Date
    endDate: Date
    destination: string
    createdAt: Date
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
