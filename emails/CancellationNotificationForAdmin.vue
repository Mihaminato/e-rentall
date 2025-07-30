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
          [ADMIN] Annulation de Réservation
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6"> Bonjour Admin, </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Une réservation a été annulée.
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
            <strong>Détails de l'annulation :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            • <strong>Annulée par :</strong> {{ cancelledBy }}
          </Text>
          <Text v-if="cancellationReason" style="margin: 5px 0 0 0; color: #666">
            • <strong>Raison :</strong> {{ cancellationReason }}
          </Text>
        </Section>

        <Section
          style="
            background-color: #f1f1f1;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #6c757d;
          "
        >
          <Text style="margin: 0; color: #333">
            <strong>Détails de la réservation concernée :</strong>
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
            • Période : {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666"> • Statut : Annulée </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • Date d'annulation : {{ formatDate(createdAt) }}
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Les parties concernées (locataire et propriétaire) ont été notifiées. Aucune action
          supplémentaire n'est requise de votre part, sauf si un suivi est nécessaire.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/admin/bookings`"
            style="
              background-color: #6c757d;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
            "
          >
            Voir la réservation dans l'admin
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Système Vaika Malaky
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
    startDate: Date
    endDate: Date
    createdAt: Date
    appUrl: string
    cancelledBy: string // "Le Locataire", "Le Propriétaire", "L'Admin"
    cancellationReason?: string
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
