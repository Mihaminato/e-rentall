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
          [ADMIN] Nouveau véhicule ajouté par {{ ownerName }}
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6"> Bonjour Admin, </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Un véhicule vient d'être ajouté:
          <strong>{{ vehicleName }} {{ vehicleModel }}</strong> (matricule
          <strong>{{ vehicleLicensePlate }}</strong
          >). Lieu: <strong>{{ province }}</strong
          >.
        </Text>

        <Section
          style="
            background-color: #eef6ff;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
          "
        >
          <Text style="margin: 0; color: #333"><strong>Détails du véhicule</strong></Text>
          <Text style="margin: 8px 0 0 0; color: #666">• ID: {{ vehicleId }}</Text>
          <Text style="margin: 4px 0 0 0; color: #666"
            >• Modèle: {{ vehicleName }} {{ vehicleModel }}</Text
          >
          <Text style="margin: 4px 0 0 0; color: #666">• Matricule: {{ vehicleLicensePlate }}</Text>
          <Text style="margin: 4px 0 0 0; color: #666">• Province: {{ province }}</Text>
          <Text style="margin: 4px 0 0 0; color: #666"
            >• Description: {{ description || '—' }}</Text
          >
        </Section>

        <Section
          style="
            background-color: #d4edda;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
          "
        >
          <Text style="margin: 0; color: #333"><strong>Propriétaire</strong></Text>
          <Text style="margin: 8px 0 0 0; color: #666">• Nom: {{ ownerName }}</Text>
          <Text style="margin: 4px 0 0 0; color: #666">• Email: {{ ownerEmail }}</Text>
          <Text style="margin: 4px 0 0 0; color: #666"
            >• Téléphone: {{ ownerPhone || 'Non renseigné' }}</Text
          >
          <Text style="margin: 4px 0 0 0; color: #666"
            >• Adresse: {{ ownerAddress || 'Non renseignée' }}</Text
          >
        </Section>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/vehicles/${vehicleId}`"
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
            Voir le véhicule
          </Button>
        </Section>

        <Text style="color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px"
          >Equipe E-rentall</Text
        >
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
    vehicleId: string
    vehicleName: string
    vehicleModel: string
    vehicleLicensePlate: string
    province: string
    description?: string
    ownerName: string
    ownerEmail: string
    ownerPhone?: string
    ownerAddress?: string
    appUrl: string
  }>()
</script>
