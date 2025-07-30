<!-- Page de réinitialisation / mise à jour du mot de passe -->
<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h1 class="card-title text-2xl font-bold mb-6 justify-center">
            {{ isRecovery ? 'Définir un nouveau mot de passe' : 'Réinitialiser le mot de passe' }}
          </h1>
          
          <!-- Message d'erreur -->
          <div v-if="error" class="alert alert-error mb-4">
            <Icon name="mdi:close-circle-outline" class="h-6 w-6 shrink-0 stroke-current" />
            <span>{{ error }}</span>
            <button class="btn btn-circle btn-xs btn-ghost" @click="error = null">✕</button>
          </div>

          <!-- Étape 1 : Demander l'envoi de l'email -->
          <div v-if="!isRecovery && !resetSent">
            <p class="mb-4 text-center">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </p>

            <form class="space-y-4" @submit.prevent="sendResetEmail">
              <div class="form-control">
                <label
                  class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
                >
                  <Icon name="mdi:email-outline" class="h-4 w-4 opacity-70" />
                  <input
                    v-model="email"
                    type="email"
                    class="grow"
                    placeholder="Votre adresse email"
                    required
                  />
                </label>
              </div>

              <div class="form-control mt-6">
                <button type="submit" class="btn btn-primary w-full" :disabled="loading">
                  {{ loading ? 'Envoi en cours...' : 'Envoyer le lien' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Message après envoi -->
          <div v-else-if="!isRecovery && resetSent" class="text-center">
            <div class="alert alert-success mb-6">
              <Icon name="mdi:check-circle-outline" class="h-6 w-6 shrink-0 stroke-current" />
              <span>Email envoyé avec succès !</span>
            </div>
            
            <div class="card bg-base-200 p-4 mb-6">
              <p class="mb-2">Un lien de réinitialisation a été envoyé à :</p>
              <p class="font-semibold">{{ email }}</p>
            </div>
            
            <p class="mb-4 text-sm text-base-content/70">
              Consultez votre boîte de réception et suivez les instructions du mail.
            </p>
            
            <NuxtLink to="/auth/login" class="btn btn-outline mt-2 w-full">
              Retour à la connexion
            </NuxtLink>
          </div>

          <!-- Étape 2 : Formulaire de nouveau mot de passe -->
          <div v-else-if="isRecovery">
            <p class="mb-4 text-center">
              Définissez votre nouveau mot de passe sécurisé.
            </p>
            <form class="space-y-4" @submit.prevent="updatePassword">
              <div class="form-control">
                <label
                  class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
                >
                  <Icon name="mdi:key-outline" class="h-4 w-4 opacity-70" />
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="grow"
                    placeholder="Nouveau mot de passe"
                    minlength="6"
                    required
                  />
                  <button
                    class="btn btn-ghost btn-xs"
                    type="button"
                    @click="showPassword = !showPassword"
                  >
                    <Icon 
                      v-if="!showPassword" 
                      name="mdi:eye-outline" 
                      class="h-4 w-4" 
                    />
                    <Icon 
                      v-else 
                      name="mdi:eye-off-outline" 
                      class="h-4 w-4" 
                    />
                  </button>
                </label>
              </div>
              <div class="form-control">
                <label
                  class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
                >
                  <Icon name="mdi:key-outline" class="h-4 w-4 opacity-70" />
                  <input
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="grow"
                    placeholder="Confirmer le mot de passe"
                    minlength="6"
                    required
                  />
                  <button
                    class="btn btn-ghost btn-xs"
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <Icon 
                      v-if="!showConfirmPassword" 
                      name="mdi:eye-outline" 
                      class="h-4 w-4" 
                    />
                    <Icon 
                      v-else 
                      name="mdi:eye-off-outline" 
                      class="h-4 w-4" 
                    />
                  </button>
                </label>
              </div>
              <button type="submit" class="btn btn-primary w-full" :disabled="loading">
                {{ loading ? 'Mise à jour...' : 'Mettre à jour mon mot de passe' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from '#imports'
  const route = useRoute()
  const router = useRouter()

  // Récupération du composable d'authentification
  const { resetPassword: authResetPassword, updateUserPassword } = useAuth()

  // Étape 1 — envoi email
  const email = ref('')
  const resetSent = ref(false)
  // Étape 2 — recovery
  const isRecovery = ref(route.query.type === 'recovery')
  const password = ref('')
  const confirmPassword = ref('')

  // États pour afficher/masquer les mots de passe
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const loading = ref(false)
  const error = ref<string | null>(null)

  // Garder le flag à jour si l'utilisateur revient sans recharger la page
  watch(
    () => route.query.type,
    val => {
      isRecovery.value = val === 'recovery'
    }
  )

  // 1. Demande d'email
  const sendResetEmail = async () => {
    error.value = null
    loading.value = true
    try {
      const result = await authResetPassword(email.value)
      if (!result.success) {
        throw new Error(result.error || 'Erreur inconnue lors de la réinitialisation')
      }
      resetSent.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la demande.'
    } finally {
      loading.value = false
    }
  }

  // 2. Mise à jour du mot de passe
  const updatePassword = async () => {
    error.value = null
    if (password.value !== confirmPassword.value) {
      error.value = 'Les mots de passe ne correspondent pas'
      return
    }
    loading.value = true
    try {
      const result = await updateUserPassword(password.value)
      if (!result.success) {
        throw new Error(result.error || 'Erreur inconnue lors de la mise à jour')
      }
      // Succès : rediriger vers la page de connexion
      router.push('/auth/login')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la mise à jour.'
    } finally {
      loading.value = false
    }
  }
</script>
