<template>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #58c7bf, #4ca9b1); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">Documents Soumis</h1>
      <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Nouvelle soumission de documents</p>
    </div>

    <!-- Content -->
    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <!-- User Info -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Informations de l'utilisateur</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #58c7bf;">
          <p style="margin: 5px 0; color: #555;">
            <strong>Nom :</strong> {{ userData.last_name }}
          </p>
          <p style="margin: 5px 0; color: #555;">
            <strong>Prénom :</strong> {{ userData.first_name }}
          </p>
          <p style="margin: 5px 0; color: #555;">
            <strong>Email :</strong> {{ userData.email }}
          </p>
        </div>
      </div>

      <!-- Documents Info -->
      <div style="margin-bottom: 25px;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Documents fournis</h2>
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
          <p style="margin: 0; color: #155724; font-weight: 500;">
            ✅ L'utilisateur <strong>{{ userData.first_name }} {{ userData.last_name }}</strong> a fourni les documents <strong>NIF</strong> et <strong>STAT</strong>
          </p>
        </div>
      </div>

      <!-- Action Required -->
      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 25px;">
        <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">Action requise</h3>
        <p style="margin: 0; color: #856404;">
          Veuillez vérifier et valider les documents soumis dans le panneau d'administration.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; margin: 0; font-size: 14px;">
          Cet email a été envoyé automatiquement par le système E-rentall
        </p>
        <p style="color: #999; margin: 5px 0 0 0; font-size: 12px;">
          {{ new Date().toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserData {
  first_name: string
  last_name: string
  email: string
}

defineProps<{
  userData: UserData
}>()
</script> 