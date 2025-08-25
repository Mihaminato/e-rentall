<template>
  <div>
    <!-- Section Hero -->
    <div class="bg-base-200 py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-6">Conditions Générales d'Utilisation</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Découvrez les règles et conditions qui régissent l'utilisation de notre plateforme de location de véhicules entre particuliers.
        </p>
      </div>
    </div>

    <!-- Articles principaux -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Nos conditions en 4 sections principales
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Section 1 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                1
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Accès et Compte</h3>
              <p class="text-sm">
                Création de compte, informations requises, confidentialité des identifiants et âge minimum pour accéder à la plateforme.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Obligations :</strong></p>
                <ul class="text-left">
                  <li>• Informations exactes</li>
                  <li>• Âge minimum 18 ans</li>
                  <li>• Confidentialité</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Section 2 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                2
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Utilisation des Services</h3>
              <p class="text-sm">
                Droits et obligations des réservataires et fournisseurs, exécution des services, annulations et évaluations.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Pour tous :</strong></p>
                <ul class="text-left">
                  <li>• Respect des règles</li>
                  <li>• Ponctualité</li>
                  <li>• Évaluations</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Section 3 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                3
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Paiements et Commission</h3>
              <p class="text-sm">
                Acompte obligatoire via Mobile Money, montant fixé à 5000 Ar par jour, commission E-RENTALL et règlement du solde.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Sécurité :</strong></p>
                <ul class="text-left">
                  <li>• Mobile Money</li>
                  <li>• Validation admin</li>
                  <li>• Commission fixe</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Section 4 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                4
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Responsabilités</h3>
              <p class="text-sm">
                Responsabilité d'E-RENTALL en tant qu'intermédiaire, obligations des utilisateurs, protection des données et sanctions.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Protection :</strong></p>
                <ul class="text-left">
                  <li>• Données personnelles</li>
                  <li>• Propriété intellectuelle</li>
                  <li>• Suspension possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <NuxtLink to="/vehicles" class="btn btn-primary btn-lg">Explorer les véhicules</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Types d'utilisateurs -->
    <div class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Obligations par type d'utilisateur</h2>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Réservataire -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-info flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  👤
                </div>
                <h3 class="font-bold">Réservataire</h3>
                <p class="text-xs">Paiement de l'acompte obligatoire</p>
              </div>
            </div>

            <!-- Fournisseur -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  🚗
                </div>
                <h3 class="font-bold">Fournisseur</h3>
                <p class="text-xs">NIF, STAT et documents requis</p>
              </div>
            </div>

            <!-- Propriétaire -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-warning flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  📋
                </div>
                <h3 class="font-bold">Documents</h3>
                <p class="text-xs">Carte grise et assurances</p>
              </div>
            </div>

            <!-- Plateforme -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  🏢
                </div>
                <h3 class="font-bold">E-RENTALL</h3>
                <p class="text-xs">Intermédiaire technique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Détails des articles -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Détails des conditions</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 class="text-2xl font-bold mb-4">Vos droits et obligations</h3>
            <p class="mb-4">
              En utilisant E-RENTALL, vous acceptez ces conditions générales qui protègent tous les utilisateurs et garantissent un service de qualité.
            </p>

            <ul class="space-y-3 mb-6">
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary mr-2 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Accès gratuit à la plateforme avec création de compte obligatoire</span>
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary mr-2 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Paiement sécurisé via Mobile Money avec validation par notre équipe</span>
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary mr-2 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Protection des données personnelles conformément à la loi</span>
              </li>
              <li class="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary mr-2 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Support 24/7 et assistance en cas de litige</span>
              </li>
            </ul>

            <NuxtLink to="/auth/register" class="btn btn-primary">S'inscrire maintenant</NuxtLink>
          </div>

          <div class="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1470&auto=format&fit=crop"
              alt="Conditions d'utilisation"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Questions fréquentes -->
    <div class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Questions sur nos conditions</h2>

        <div class="max-w-3xl mx-auto">
          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">Que se passe-t-il si je ne respecte pas les conditions ?</div>
            <div class="collapse-content">
              <p>
                En cas de violation des CGU, E-RENTALL peut suspendre ou supprimer votre compte sans préavis. 
                Les comportements frauduleux ou contraires aux bonnes mœurs sont strictement interdits et 
                peuvent entraîner des poursuites judiciaires.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">Puis-je annuler mon compte à tout moment ?</div>
            <div class="collapse-content">
              <p>
                Oui, vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil. 
                Attention : cette action est irréversible et supprimera toutes vos données. Assurez-vous 
                d'avoir terminé toutes vos réservations en cours.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Comment sont protégées mes données personnelles ?
            </div>
            <div class="collapse-content">
              <p>
                Vos données sont protégées conformément à la législation malgache. Nous ne partageons 
                vos informations qu'avec les prestataires techniques nécessaires et les autorités en 
                cas d'obligation légale. Vous pouvez exercer vos droits d'accès, rectification et suppression.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Les conditions peuvent-elles être modifiées ?
            </div>
            <div class="collapse-content">
              <p>
                E-RENTALL peut modifier ces conditions à tout moment. Les nouvelles CGU seront publiées 
                sur la plateforme et vous serez notifié par email. La poursuite de l'utilisation vaut 
                acceptation des nouvelles conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-primary text-primary-content py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Prêt à utiliser notre plateforme ?</h2>
        <p class="mb-6 max-w-xl mx-auto">
          En utilisant E-RENTALL, vous acceptez ces conditions générales d'utilisation qui garantissent un service sécurisé et de qualité.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/auth/register" class="btn bg-white text-primary hover:bg-gray-200">
            S'inscrire gratuitement
          </NuxtLink>
          <NuxtLink to="/vehicles" class="btn btn-outline text-white border-white hover:bg-white hover:text-primary">
            Explorer les véhicules
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aucune logique spécifique n'est nécessaire pour cette page statique
</script>
