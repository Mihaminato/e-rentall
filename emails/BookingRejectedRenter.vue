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
          Demande de réservation refusée
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ renterName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous sommes désolés de vous informer que votre demande de réservation du véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong
          >, matricule <strong>{{ vehicleLicensePlate }}</strong
          >, du {{ formatDate(startDate) }} au {{ formatDate(endDate) }} vers la destination
          <strong>{{ destination }}</strong>
          a été refusée par le propriétaire.
        </Text>

        <Section
          style="
            background-color: #f8d7da;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #dc3545;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la demande refusée :</strong>
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
          <Text style="margin: 5px 0 0 0; color: #666"> • Statut : Refusée </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Ne vous découragez pas ! De nombreux autres véhicules sont disponibles sur notre
          plateforme. Nous vous encourageons à explorer d'autres options qui pourraient correspondre
          à vos besoins.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/vehicles`"
            style="
              background-color: #007bff;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              font-size: 16px;
            "
          >
            Rechercher d'autres véhicules
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
