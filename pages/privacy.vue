<template>
  <div class="min-h-screen bg-base-100">
    <!-- Header -->
    <div class="bg-primary text-primary-content py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Politique de Confidentialité - E-Rentall</h1>
        <p class="text-lg opacity-90">
          Protection de vos données personnelles
        </p>
      </div>
    </div>

    <!-- Contenu -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto prose prose-lg">
        <div class="bg-base-200 p-8 rounded-lg shadow-lg">
          <p class="text-base-content/80 mb-8">
            Cette politique de confidentialité décrit comment E-Rentall collecte, utilise et protège vos données personnelles 
            lors de l'utilisation de notre plateforme de location de véhicules entre particuliers.
          </p>

          <!-- 2. Introduction -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p class="text-base-content/80">
              E-Rentall est une plateforme de location de véhicules entre particuliers à Madagascar qui attache une grande importance à la protection des données personnelles.
            </p>
          </div>

          <!-- 2. Données collectées -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">2. Données collectées</h2>
            <ul class="space-y-2 text-base-content/80">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Identifiants :</strong> nom, prénom, téléphone, email.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Localisation :</strong> lors des réservations.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Données d'utilisation :</strong> de la Plateforme.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Données de paiement :</strong> (traitées par prestataires Mobile Money).</span>
              </li>
            </ul>
          </div>

          <!-- 3. Finalités -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">3. Finalités</h2>
            <ul class="space-y-2 text-base-content/80">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Gestion des réservations</strong> et mise en relation.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Qualité et sécurité</strong> des services.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Amélioration</strong> de l'expérience utilisateur.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Prévention</strong> de la fraude.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Communication</strong> (offres, support).</span>
              </li>
            </ul>
          </div>

          <!-- 4. Partage des données -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">4. Partage des données</h2>
            <ul class="space-y-2 text-base-content/80">
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Aux Fournisseurs</strong> pour exécution des prestations.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Aux prestataires techniques</strong> et de paiement.</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary mr-2">•</span>
                <span><strong>Aux autorités</strong> en cas d'obligation légale.</span>
              </li>
            </ul>
          </div>

          <!-- 5. Conservation -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">5. Conservation</h2>
            <p class="text-base-content/80">
              Conservation limitée à la durée nécessaire aux finalités et conforme à la loi.
            </p>
          </div>

          <!-- 6. Sécurité -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">6. Sécurité</h2>
            <p class="text-base-content/80">
              Mesures techniques et organisationnelles pour protéger les données.
            </p>
          </div>

          <!-- 7. Droits des Utilisateurs -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">7. Droits des Utilisateurs</h2>
            <p class="text-base-content/80 mb-4">
              Droits d'accès, rectification, suppression, opposition, retrait du consentement.
            </p>
            <div class="bg-base-100 p-4 rounded-lg">
              <p class="text-base-content/80">
                <strong>Contact :</strong> 
                <a href="mailto:contact@e-rentall.mg" class="text-primary hover:underline">
                  support@erentall.market
                </a>
              </p>
            </div>
          </div>

          <!-- 8. Modifications -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">8. Modifications</h2>
            <p class="text-base-content/80">
              Politique susceptible d'être modifiée. Notification et publication sur la Plateforme.
            </p>
          </div>

          <!-- Date de mise à jour -->
          <div class="mt-12 pt-8 border-t border-base-300">
            <p class="text-sm text-base-content/60">
              <strong>Dernière mise à jour :</strong> Août 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Définir les métadonnées de la page
  useHead({
    title: 'Politique de Confidentialité - E-Rentall',
    meta: [
      {
        name: 'description',
        content: 'Politique de confidentialité d\'E-Rentall - Protection de vos données personnelles sur notre plateforme de location de véhicules entre particuliers à Madagascar.'
      }
    ]
  })
</script>
