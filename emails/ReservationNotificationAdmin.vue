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
          [ADMIN] Nouvelle réservation créée
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6"> Bonjour Admin, </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nouvelle demande de réservation en attente pour
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong
          >. La demande a bien été envoyée et est en cours de traitement.
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
            <strong>Détails complets :</strong>
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
          <Text style="margin: 5px 0 0 0; color: #666"> • Statut : {{ status }} </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Date de création : {{ formatDate(createdAt) }}
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
            Voir la demande
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Equipe E-rentall
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
    status: string
    createdAt: Date
    appUrl: string
  }>()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
</script>
