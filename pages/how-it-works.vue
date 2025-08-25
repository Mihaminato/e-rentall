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
                Vous recevez un email avec les instructions de paiement. Effectuez le paiement avec
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
                lieux et profitez de votre location.
              </p>
              <div class="mt-4 text-xs text-base-content/70">
                <p><strong>Support disponible :</strong></p>
                <ul class="text-left">
                  <li>• Assistance réactive</li>
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
            <h3 class="text-2xl font-bold mb-4">Maximisez la rentabilité de votre flotte en toute sécurité</h3>
            <p class="mb-4">
              Optimisez l'utilisation de votre flotte et élargissez votre clientèle grâce à une plateforme conçue 
              pour les professionnels de la location.
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
                <span>Gérez l'intégralité de votre activité via une interface simple et intuitive.</span>
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
                <span>Optimisez la rentabilité de votre flotte en accédant à une clientèle élargie.</span>
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
                <span>Collaborez en toute confiance grâce à notre processus de vérification rigoureux des clients.</span>
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
                <span>Bénéficiez d'un support dédié et réactif pour une expérience sans accroc.</span>
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
                de paiement. Effectuez un paiement par mobile money avec le numero fourni. Notre équipe valide le
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
                Oui, vous pouvez annuler gratuitement avant le paiement de l'acompte.
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
                Tous les utilisateurs doivent fournir une pièce d'identité (CIN). Nos équipes vérifient ce document avant
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
                Notre équipe de support est disponible pour vous aider.
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
