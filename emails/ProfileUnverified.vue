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
          ⚠️ Vérification de profil retirée
        </Heading>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Bonjour {{ firstName }} {{ lastName }},
        </Text>

        <Text style="color: #666; font-size: 16px; line-height: 1.6">
          Nous vous informons que la vérification de votre profil a été <strong>retirée</strong> par
          notre équipe administrative.
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
          <Text style="margin: 0; color: #333; font-weight: 600">
            🔒 Statut de vérification retiré
          </Text>
          <Text style="margin: 8px 0 0 0; color: #856404">
            Votre badge de vérification a été supprimé et certaines fonctionnalités peuvent être
            temporairement limitées.
          </Text>
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
          <Text style="margin: 0; color: #333; font-weight: 600">
            📋 Restrictions appliquées :
          </Text>
          <Text style="margin: 8px 0 0 0; color: #721c24">
            • Vos véhicules peuvent être désactivés temporairement
          </Text>
          <Text style="margin: 4px 0 0 0; color: #721c24">
            • Visibilité réduite sur la plateforme
          </Text>
          <Text style="margin: 4px 0 0 0; color: #721c24">
            • Limitation de certaines fonctionnalités
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
            🔄 Pour retrouver votre vérification :
          </Text>
          <Text style="margin: 8px 0 0 0; color: #1e5582">
            • Vérifiez que vos documents sont à jour
          </Text>
          <Text style="margin: 4px 0 0 0; color: #1e5582">
            • Contactez notre support si nécessaire
          </Text>
          <Text style="margin: 4px 0 0 0; color: #1e5582">
            • Respectez les conditions d'utilisation
          </Text>
        </Section>

        <Section style="text-align: center; margin: 30px 0">
          <Button
            :href="`${appUrl}/profile`"
            style="
              background-color: #ffc107;
              color: #212529;
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
            :href="`${appUrl}/contact`"
            style="
              background-color: #6c757d;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: 500;
              margin: 5px;
            "
          >
            Contacter le support
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
          Pour toute question, n'hésitez pas à nous contacter.
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
