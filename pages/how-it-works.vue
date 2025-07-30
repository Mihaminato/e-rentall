<template>
  <div>
    <!-- Section Hero -->
    <div class="bg-base-200 py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-6">
          Comment fonctionne notre plateforme ?
        </h1>
        <p class="text-lg max-w-3xl mx-auto">
          Découvrez le processus simple de location de véhicules entre
          particuliers, de la recherche du véhicule idéal jusqu'à la
          restitution.
        </p>
      </div>
    </div>

    <!-- Processus de location en étapes -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Louer un véhicule en 3 étapes simples
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Étape 1 -->
          <div class="card bg-base-200">
            <div class="card-body items-center text-center">
              <div
                class="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4"
              >
                1
              </div>
              <h3 class="card-title text-2xl mb-2">Recherchez</h3>
              <p>
                Utilisez notre moteur de recherche pour trouver le véhicule qui
                correspond à vos besoins, à la date et au lieu qui vous
                conviennent.
              </p>
              <div class="mt-4">
                <img
                  src="https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=1470&auto=format&fit=crop"
                  alt="Recherche de véhicule"
                  class="rounded-lg h-48 w-full object-cover"
                />
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
              <h3 class="card-title text-2xl mb-2">Réservez</h3>
              <p>
                Sélectionnez votre véhicule, choisissez vos dates et options,
                puis effectuez votre demande de réservation en toute sécurité.
              </p>
              <div class="mt-4">
                <img
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1470&auto=format&fit=crop"
                  alt="Réservation en ligne"
                  class="rounded-lg h-48 w-full object-cover"
                />
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
              <h3 class="card-title text-2xl mb-2">Profitez</h3>
              <p>
                Récupérez votre véhicule, réalisez l'état des lieux avec le
                propriétaire, et profitez de votre location en toute
                tranquillité.
              </p>
              <div class="mt-4">
                <img
                  src="https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?q=80&w=1470&auto=format&fit=crop"
                  alt="Profitez de votre voyage"
                  class="rounded-lg h-48 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8">
          <NuxtLink to="/vehicles" class="btn btn-primary btn-lg"
            >Explorer les véhicules</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Pour les propriétaires -->
    <div class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Vous avez un véhicule à louer ?
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-2xl font-bold mb-4">
              Rentabilisez votre véhicule en toute sécurité
            </h3>
            <p class="mb-4">
              Votre véhicule reste immobilisé la plupart du temps ? Mettez-le en
              location et générez un revenu complémentaire tout en gardant le
              contrôle.
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
                <span>Vérification des profils des locataires</span>
              </li>
            </ul>

            <NuxtLink to="/auth/register" class="btn btn-primary"
              >Devenir propriétaire</NuxtLink
            >
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
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          Questions fréquentes
        </h2>

        <div class="max-w-3xl mx-auto">
          <div class="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Puis-je annuler ma réservation ?
            </div>
            <div class="collapse-content">
              <p>
                Oui, vous pouvez annuler gratuitement jusqu'à 24h avant le début
                de la location. En cas d'annulation moins de 24h avant, des
                frais peuvent s'appliquer. Le propriétaire peut également
                annuler, mais des pénalités sont appliquées pour garantir la
                fiabilité du service.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Comment les prix sont-ils fixés ?
            </div>
            <div class="collapse-content">
              <p>
                Les prix sont fixés librement par les propriétaires. Notre
                plateforme suggère des tarifs compétitifs basés sur le modèle du
                véhicule, son âge, ses options et sa localisation, mais le
                propriétaire reste maître de sa tarification.
              </p>
            </div>
          </div>

          <div class="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="faq-accordion" />
            <div class="collapse-title text-xl font-medium">
              Comment devenir propriétaire sur la plateforme ?
            </div>
            <div class="collapse-content">
              <p>
                Inscrivez-vous sur notre plateforme, complétez votre profil,
                téléchargez les documents nécessaires (pièce d'identité, permis,
                carte grise) et ajoutez les informations et photos de votre
                véhicule. Après une vérification rapide de nos équipes, votre
                annonce sera publiée et vous pourrez commencer à recevoir des
                demandes de location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-primary text-primary-content py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Prêt à rejoindre notre communauté ?
        </h2>
        <p class="mb-6 max-w-xl mx-auto">
          Que vous cherchiez à louer un véhicule ou à rentabiliser le vôtre,
          notre plateforme est faite pour vous.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/auth/register"
            class="btn bg-white text-primary hover:bg-gray-200"
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
