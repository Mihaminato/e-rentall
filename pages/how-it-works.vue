<template>
  <div>
    <!-- Section Hero -->
    <div class="bg-base-200 py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-6">Comment fonctionne notre plateforme ?</h1>
        <p class="text-lg max-w-3xl mx-auto">
          Découvrez le processus sécurisé de location de véhicules entre particuliers, de la
          recherche du véhicule idéal jusqu'à la finalisation de votre location.
        </p>
      </div>
    </div>

    <!-- Processus de location en étapes -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Louer un véhicule en 4 étapes sécurisées
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Étape 1 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                1
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Recherchez et réservez</h3>
              <p class="text-sm">
                Trouvez votre véhicule idéal avec nos filtres avancés. Remplissez le formulaire de
                réservation avec vos dates, destination et nombre de personnes. Votre demande est
                automatiquement envoyée au propriétaire.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Validation automatique :</strong></p>
                <ul class="text-left">
                  <li>• Vérification de disponibilité</li>
                  <li>• Calcul du prix total</li>
                  <li>• Notification au propriétaire</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Étape 2 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                2
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Le propriétaire approuve</h3>
              <p class="text-sm">
                Le propriétaire examine votre demande et peut l'approuver ou la refuser. En cas
                d'approbation, un acompte significatif est défini automatiquement.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Processus d'approbation :</strong></p>
                <ul class="text-left">
                  <li>• Vérification du profil</li>
                  <li>• Définition de l'acompte</li>
                  <li>• Notification de paiement</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Étape 3 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                3
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Paiement et validation</h3>
              <p class="text-sm">
                Vous recevez un email avec les instructions de paiement. Effectuez le virement avec
                la référence fournie. Notre équipe valide le paiement et confirme votre réservation.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Sécurité des paiements :</strong></p>
                <ul class="text-left">
                  <li>• Référence unique</li>
                  <li>• Validation par admin</li>
                  <li>• Confirmation automatique</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Étape 4 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                4
              </div>
              <h3 class="card-title text-xl mb-2 text-accent">Récupérez et profitez</h3>
              <p class="text-sm">
                Rendez-vous au point de rencontre convenu avec le propriétaire. Effectuez l'état des
                lieux, récupérez les clés et profitez de votre location. Marquez comme terminée à la
                fin.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Support disponible :</strong></p>
                <ul class="text-left">
                  <li>• Assistance 24/7</li>
                  <li>• Évaluation mutuelle</li>
                  <li>• Résolution de conflits</li>
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

    <!-- Statuts de réservation -->
    <div class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Suivi de votre réservation</h2>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Statut 1 -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-warning flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  ⏳
                </div>
                <h3 class="font-bold">En attente</h3>
                <p class="text-xs">Demande envoyée au propriétaire</p>
              </div>
            </div>

            <!-- Statut 2 -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-info flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  ✅
                </div>
                <h3 class="font-bold">Approuvé</h3>
                <p class="text-xs">Acompte de nombre de jours * 5000 Ar requis</p>
              </div>
            </div>

            <!-- Statut 3 -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  💳
                </div>
                <h3 class="font-bold">Confirmé</h3>
                <p class="text-xs">Paiement validé par admin</p>
              </div>
            </div>

            <!-- Statut 4 -->
            <div class="card bg-white">
              <div class="card-body text-center">
                <div
                  class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold mx-auto mb-2"
                >
                  🚗
                </div>
                <h3 class="font-bold">Actif</h3>
                <p class="text-xs">Location en cours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pour les propriétaires -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Vous avez un véhicule à louer ?</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-bold mb-4">Rentabilisez votre véhicule en toute sécurité</h3>
            <p class="mb-4">
              Votre véhicule reste immobilisé la plupart du temps ? Mettez-le en location et générez
              un revenu complémentaire tout en gardant le contrôle total sur vos réservations.
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
                <span>Vous choisissez vos locataires et fixez vos tarifs</span>
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
                <span>Vérification des profils et documents des locataires</span>
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
                <span>Paiements sécurisés avec validation par notre équipe</span>
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
                <span>Support 24/7 et assistance en cas de problème</span>
              </li>
            </ul>

            <NuxtLink to="/auth/register" class="btn btn-primary">Devenir propriétaire</NuxtLink>
          </div>

          <div class="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1534353140376-aeb5c9b57876?q=80&w=1470&auto=format&fit=crop"
              alt="Propriétaire de véhicule"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Questions fréquentes -->
    <div class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>

        <div class="max-w-3xl mx-auto">
          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">Comment fonctionne le paiement ?</div>
            <div class="collapse-content">
              <p>
                Après approbation par le propriétaire, vous recevez un email avec les instructions
                de paiement. Effectuez un virement avec la référence fournie. Notre équipe valide le
                paiement sous 24h et confirme automatiquement votre réservation. L'acompte
                représente nombre de jours * 5000 Ar.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">Puis-je annuler ma réservation ?</div>
            <div class="collapse-content">
              <p>
                Oui, vous pouvez annuler gratuitement jusqu'à 24h avant le début de la location. En
                cas d'annulation moins de 24h avant, des frais peuvent s'appliquer. Le propriétaire
                peut également annuler, mais des pénalités sont appliquées pour garantir la
                fiabilité du service.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Comment sont vérifiés les utilisateurs ?
            </div>
            <div class="collapse-content">
              <p>
                Tous les utilisateurs doivent fournir une pièce d'identité (CIN), un permis de
                conduire et une preuve d'adresse. Nos équipes vérifient ces documents avant
                d'approuver les comptes. Les propriétaires doivent également fournir la carte grise
                de leur véhicule.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-100 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Que se passe-t-il en cas de problème ?
            </div>
            <div class="collapse-content">
              <p>
                Notre équipe de support est disponible 24/7 pour vous aider. En cas de problème avec
                le véhicule, contactez-nous immédiatement. Nous disposons d'un système d'assurance
                et de garanties pour protéger tous les acteurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-primary text-primary-content py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Prêt à rejoindre notre communauté ?</h2>
        <p class="mb-6 max-w-xl mx-auto">
          Que vous cherchiez à louer un véhicule ou à rentabiliser le vôtre, notre plateforme
          sécurisée est faite pour vous.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/auth/register" class="btn bg-white text-primary hover:bg-gray-200"
            >S'inscrire gratuitement</NuxtLink
          >
          <NuxtLink
            to="/vehicles"
            class="btn btn-outline text-white border-white hover:bg-white hover:text-primary"
            >Explorer les véhicules</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Pas de logique particulière pour cette page informative
</script>
