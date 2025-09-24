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
          🎉 Félicitations ! Votre profil a été vérifié
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ firstName }} {{ lastName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous avons le plaisir de vous informer que votre profil a été
          <strong>vérifié avec succès</strong> par notre équipe administrative.
        </Text>

        <Section
          style="
            background-color: #d4edda;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
          "
        >
          <Text style="margin: 0; color: #333; font-weight: 600"> ✅ Profil vérifié </Text>
          <Text style="margin: 8px 0 0 0; color: #155724">
            Vos documents ont été validés et votre compte dispose maintenant du badge de
            vérification.
          </Text>
        </Section>

        <Section
          style="
            background-color: #eef6ff;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
          "
        >
          <Text style="margin: 0; color: #333; font-weight: 600">
            🚗 Vous pouvez maintenant :
          </Text>
          <Text style="margin: 8px 0 0 0; color: #666">
            • Mettre vos véhicules en location sur la plateforme
          </Text>
          <Text style="margin: 4px 0 0 0; color: #666">
            • Bénéficier d'une meilleure visibilité auprès des locataires
          </Text>
          <Text style="margin: 4px 0 0 0; color: #666">
            • Accéder à toutes les fonctionnalités propriétaire
          </Text>
        </Section>

        <Section style="text-align: center; margin: 20px 0">
          <Button
            :href="`${appUrl}/profile`"
            style="
              background-color: #28a745;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              margin: 5px;
            "
          >
            Voir mon profil
          </Button>
          <Button
            :href="`${appUrl}/vehicles/my-vehicles`"
            style="
              background-color: #007bff;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              margin: 5px;
            "
          >
            Ajouter un véhicule
          </Button>
        </Section>

        <Text
          style="
            color: #666;
            font-size: 14px;
            line-height: 1.6;
            margin-top: 30px;
            text-align: center;
          "
        >
          Merci de faire confiance à E-rentall !
        </Text>

        <Text
          style="
            color: #666;
            font-size: 14px;
            line-height: 1.6;
            margin-top: 10px;
            text-align: center;
          "
        >
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
    firstName: string
    lastName: string
    email: string
    appUrl: string
  }>()
</script>
