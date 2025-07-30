<!-- Page de connexion -->
<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h1 class="card-title text-2xl font-bold mb-6 justify-center">Connexion</h1>

          <!-- Notification après inscription -->
          <div v-if="notification" :class="`alert alert-${notification.type} mb-4`">
            <Icon name="mdi:information-outline" class="stroke-current shrink-0 h-6 w-6" />
            <span>{{ notification.message }}</span>
          </div>

          <!-- Alertes de validation -->
          <div v-if="showValidationError && v$.$errors.length > 0" class="alert alert-warning mb-4">
            <Icon name="mdi:alert-outline" class="h-6 w-6 shrink-0 stroke-current" />
            <span>{{ v$.$errors[0].$message }}</span>
            <button class="btn btn-circle btn-xs btn-ghost" @click="showValidationError = false">
              ✕
            </button>
          </div>

          <!-- Alerte d'erreur générale -->
          <div v-if="error" class="alert alert-error mb-4">
            <Icon name="mdi:close-circle-outline" class="h-6 w-6 shrink-0 stroke-current" />
            <span>{{ error }}</span>
            <button class="btn btn-circle btn-xs btn-ghost" @click="error = null">✕</button>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="form-control">
              <label
                class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
              >
                <Icon name="mdi:email-outline" class="h-4 w-4 opacity-70" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="votre@email.com"
                  class="grow"
                  autocomplete="email"
                  :class="{ 'input-error': v$.email.$error }"
                  @blur="v$.email.$touch()"
                />
              </label>
              <span v-if="v$.email.$error" class="text-error text-sm mt-1">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>

            <div class="form-control mt-4">
              <label
                class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
              >
                <Icon name="mdi:key-outline" class="h-4 w-4 opacity-70" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Mot de passe"
                  class="grow"
                  autocomplete="current-password"
                  :class="{ 'input-error': v$.password.$error }"
                  @blur="v$.password.$touch()"
                />
                <button
                  class="btn btn-ghost btn-xs"
                  type="button"
                  @click="showPassword = !showPassword"
                >
                  <Icon v-if="!showPassword" name="mdi:eye-outline" class="h-4 w-4" />
                  <Icon v-else name="mdi:eye-off-outline" class="h-4 w-4" />
                </button>
              </label>
              <span v-if="v$.password.$error" class="text-error text-sm mt-1">
                {{ v$.password.$errors[0].$message }}
              </span>
              <div class="flex justify-end mt-4">
                <NuxtLink to="/auth/reset-password" class="label-text-alt link link-hover">
                  Mot de passe oublié?
                </NuxtLink>
              </div>
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary w-full"
                :disabled="loading || v$.$invalid"
              >
                {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
              </button>
            </div>
          </form>
          <!-- 
          <div class="divider">OU</div>

          <button class="btn btn-outline" :disabled="loading" @click="signInWithGoogle">
            <Icon name="mdi:google" class="mr-2 h-5 w-5" />
            Continuer avec Google
          </button> -->

          <div class="text-center mt-4">
            <span>Vous n'avez pas de compte? </span>
            <NuxtLink to="/auth/register" class="link link-primary"> S'inscrire </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAuth } from '~/composables/useAuth'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email as emailValidator, helpers } from '@vuelidate/validators'

  const router = useRouter()
  const { login } = useAuth()

  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const notification = ref(null)
  const error = ref(null)
  const showPassword = ref(false)
  const showValidationError = ref(true)

  // Règles de validation Vuelidate
  const rules = {
    email: {
      required: helpers.withMessage("L'email est requis", required),
      email: helpers.withMessage("Format d'email invalide", emailValidator)
    },
    password: {
      required: helpers.withMessage('Le mot de passe est requis', required)
    }
  }

  // Initialiser Vuelidate
  const v$ = useVuelidate(rules, {
    email,
    password
  })

  const checkNotification = () => {
    const storedNotification = localStorage.getItem('authNotification')
    if (storedNotification) {
      try {
        notification.value = JSON.parse(storedNotification)
        // Supprimer la notification du localStorage après l'avoir récupérée
        localStorage.removeItem('authNotification')

        // Faire disparaître la notification au bout de 10 secondes
        setTimeout(() => {
          notification.value = null
        }, 10000)
      } catch (err) {
        console.error('Erreur lors de la lecture de la notification:', err)
        localStorage.removeItem('authNotification')
      }
    }
  }

  // Récupérer la notification depuis le localStorage au chargement
  onMounted(() => {
    checkNotification()
  })

  const handleLogin = async () => {
    error.value = null
    showValidationError.value = true

    // Valider le formulaire
    const isFormValid = await v$.value.$validate()
    if (!isFormValid) {
      return
    }

    loading.value = true

    try {
      const { success, error: loginError } = await login(email.value, password.value)

      if (success) {
        router.push('/profile')
      } else {
        error.value = loginError
      }
    } catch (err) {
      error.value = err.message || 'Une erreur est survenue lors de la connexion'
    } finally {
      loading.value = false
    }
  }

  const signInWithGoogle = async () => {
    loading.value = true
    try {
      // Authentification OAuth avec Google via Supabase
      console.log('Connexion avec Google')
    } catch (error) {
      console.error('Erreur de connexion Google:', error)
    } finally {
      loading.value = false
    }
  }
</script>
