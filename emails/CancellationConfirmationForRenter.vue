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
          Confirmation d'Annulation
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ renterName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous vous confirmons que votre demande d'annulation pour la réservation du véhicule
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong> a bien été enregistrée.
        </Text>

        <Section
          style="
            background-color: #e2e8f0;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #4a5568;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la réservation annulée :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • Véhicule : {{ vehicleName }} {{ vehicleModel }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Période : {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
          </Text>
          <Text v-if="cancellationReason" style="margin: 5px 0 0 0; color: #666">
            • Raison fournie : {{ cancellationReason }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666"> • Statut : Annulée </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous espérons vous revoir bientôt sur notre plateforme.
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
            Trouver un autre véhicule
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
    renterName: string
    vehicleName: string
    vehicleModel: string
    startDate: Date
    endDate: Date
    appUrl: string
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
