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
          Action requise : Référence de paiement incorrecte
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ renterName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous vous contactons concernant votre réservation
          <strong>#{{ reservationId.slice(0, 8) }}</strong> pour le véhicule
          <strong>{{ vehicleName }}</strong
          >.
        </Text>

        <Section
          style="
            border: 1px solid #eee;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            background-color: #fafafa;
          "
        >
          <Text style="font-size: 18px; font-weight: 500; color: #333; margin-top: 0">
            Détails de la réservation :
          </Text>
          <ul style="list-style-type: none; padding-left: 0; color: #666; font-size: 16px">
            <li style="margin-bottom: 8px">
              <strong>Date de début :</strong> {{ formatDate(startDate) }}
            </li>
            <li style="margin-bottom: 8px">
              <strong>Date de fin :</strong> {{ formatDate(endDate) }}
            </li>
            <li><strong>Prix total :</strong> {{ totalPrice }} €</li>
          </ul>
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
            <strong>Une action de votre part est nécessaire :</strong>
          </Text>
          <Text style="margin: 10px 0 0 0; color: #666">
            L'administrateur a examiné votre soumission de paiement et a constaté que la référence
            fournie ("<strong>{{ paymentReference }}</strong
            >") semble incorrecte. Pour finaliser votre réservation, veuillez soumettre une nouvelle
            référence de paiement valide.
          </Text>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Vous pouvez le faire en cliquant sur le bouton ci-dessous. Cela vous redirigera vers la
          page de votre réservation où vous pourrez saisir la nouvelle référence.
        </Text>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/bookings/${reservationId}`"
            style="
              background-color: #ffc107;
              color: #212529;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              font-size: 16px;
            "
          >
            Soumettre une nouvelle référence
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px">
          Si vous avez des questions, n'hésitez pas à nous contacter.
          <br /><br />
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
    startDate: string
    endDate: string
    totalPrice: number
    appUrl: string
    paymentReference: string
  }>()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
</script>
