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
          [ADMIN] Véhicule modifié
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Le véhicule <strong>{{ vehicleName }} {{ vehicleModel }}</strong> ({{
            vehicleLicensePlate
          }}) a été modifié par son propriétaire.
        </Text>

        <Section
          style="
            background-color: #fff3cd;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
          "
        >
          <Text style="margin: 0; color: #333"><strong>Modifications apportées</strong></Text>
          <Text v-if="modifiedFields.includes('make')" style="margin: 8px 0 0 0; color: #666">
            • Marque: {{ vehicleName }}
          </Text>
          <Text v-if="modifiedFields.includes('model')" style="margin: 4px 0 0 0; color: #666">
            • Modèle: {{ vehicleModel }}
          </Text>
          <Text v-if="modifiedFields.includes('year')" style="margin: 4px 0 0 0; color: #666">
            • Année: {{ year }}
          </Text>
          <Text v-if="modifiedFields.includes('vehicle_type')" style="margin: 4px 0 0 0; color: #666">
            • Type: {{ vehicleType }}
          </Text>
          <Text v-if="modifiedFields.includes('transmission')" style="margin: 4px 0 0 0; color: #666">
            • Transmission: {{ transmission }}
          </Text>
          <Text v-if="modifiedFields.includes('fuel_type')" style="margin: 4px 0 0 0; color: #666">
            • Carburant: {{ fuelType }}
          </Text>
          <Text v-if="modifiedFields.includes('seats')" style="margin: 4px 0 0 0; color: #666">
            • Places: {{ seats }}
          </Text>
          <Text v-if="modifiedFields.includes('consumption')" style="margin: 4px 0 0 0; color: #666">
            • Consommation: {{ consumption }} L/100km
          </Text>
          <Text v-if="modifiedFields.includes('price_per_day')" style="margin: 4px 0 0 0; color: #666">
            • Prix/jour: {{ pricePerDay }} Ar
          </Text>
          <Text v-if="modifiedFields.includes('province')" style="margin: 4px 0 0 0; color: #666">
            • Province: {{ province }}
          </Text>
          <Text v-if="modifiedFields.includes('description')" style="margin: 4px 0 0 0; color: #666">
            • Description: {{ description || '—' }}
          </Text>
          <Text v-if="modifiedFields.includes('license_plate')" style="margin: 4px 0 0 0; color: #666">
            • Immatriculation: {{ vehicleLicensePlate }}
          </Text>
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

        <Section
          style="
            background-color: #f8d7da;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #dc3545;
          "
        >
          <Text style="margin: 0; color: #333"><strong>⚠️ Action requise</strong></Text>
          <Text style="margin: 8px 0 0 0; color: #666">
            Ce véhicule a été modifié et nécessite une nouvelle validation avant d'être visible sur la plateforme.
          </Text>
        </Section>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/admin/vehicles`"
            style="
              background-color: #007bff;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              margin-right: 10px;
            "
          >
            Gérer les véhicules
          </Button>
          <Button
            :href="`${appUrl}/vehicles/${vehicleId}`"
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
            Voir le véhicule
          </Button>
        </Section>
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
    year?: number
    vehicleType?: string
    transmission?: string
    fuelType?: string
    seats?: number
    consumption?: number
    pricePerDay?: number
    province: string
    description?: string
    ownerName: string
    ownerEmail: string
    ownerPhone?: string
    ownerAddress?: string
    modifiedFields: string[]
    appUrl: string
  }>()
</script>
