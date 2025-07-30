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
          [ACTION REQUISE] Vérification d'acompte
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">Bonjour Administrateur,</Text>
        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Un paiement d'acompte a été soumis par un locataire et nécessite votre
          <strong style="color: #c0392b">vérification manuelle</strong> avant la confirmation finale
          de la réservation.
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
          <Text style="margin: 0; color: #333; font-size: 18px">
            <strong>Détails à vérifier :</strong>
          </Text>
          <Text style="margin: 15px 0 0 0; color: #666">
            • <strong>ID Réservation :</strong> {{ reservationId }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • <strong>Locataire :</strong> {{ renterName }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • <strong>Véhicule :</strong> {{ vehicleName }} {{ vehicleModel }}
          </Text>
          <Text style="margin: 5px 0 0 0; color: #666">
            • <strong>Montant de l'acompte :</strong> {{ formatPrice(depositAmount) }}
          </Text>
          <Text
            style="
              margin: 10px 0 0 0;
              color: #c0392b;
              font-weight: bold;
              background-color: #fbeee6;
              padding: 8px;
              border-radius: 4px;
            "
          >
            Référence de paiement : {{ paymentReference }}
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; text-align: center">
          Veuillez vous assurer que le paiement a bien été reçu sur le compte avant de cliquer sur
          le bouton ci-dessous.
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
            Voir la réservation et confirmer
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
    vehicleName: string
    vehicleModel: string
    depositAmount: number
    paymentReference: string
    appUrl: string
  }>()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' Ar'
  }
</script>
