<!-- Page d'inscription -->
<template>
  <div class="flex min-h-screen items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <!-- Alerte d'erreur -->
          <!-- Alerte d'erreur générale -->
          <div v-if="error" class="alert alert-error mb-4">
            <Icon name="mdi:close-circle-outline" class="h-6 w-6 shrink-0 stroke-current" />
            <span>{{ error }}</span>
            <button class="btn btn-circle btn-xs btn-ghost" @click="error = null">✕</button>
          </div>

          <!-- Alertes de validation -->
          <div v-if="showValidationError && v$.$errors.length > 0" class="alert alert-warning mb-4">
            <Icon name="mdi:alert-outline" class="h-6 w-6 shrink-0 stroke-current" />
            <span>{{ v$.$errors[0].$message }}</span>
            <button class="btn btn-circle btn-xs btn-ghost" @click="showValidationError = false">
              ✕
            </button>
          </div>
          <h1 class="card-title text-2xl font-bold mb-6 justify-center">Créer un compte</h1>

          <form @submit.prevent="handleRegister">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label
                  class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
                >
                  <Icon name="mdi:account-outline" class="h-4 w-4 opacity-70" />
                  <input
                    v-model="firstName"
                    type="text"
                    placeholder="Prénom"
                    class="grow"
                    autocomplete="given-name"
                    :class="{ 'input-error': v$.firstName.$error }"
                    @blur="v$.firstName.$touch()"
                  />
                </label>
                <span v-if="v$.firstName.$error" class="text-error text-sm mt-1">{{
                  v$.firstName.$errors[0].$message
                }}</span>
              </div>

              <div class="form-control">
                <label
                  class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
                >
                  <Icon name="mdi:account-outline" class="h-4 w-4 opacity-70" />
                  <input
                    v-model="lastName"
                    type="text"
                    placeholder="Nom"
                    class="grow"
                    :class="{ 'input-error': v$.lastName.$error }"
                    @blur="v$.lastName.$touch()"
                  />
                </label>
                <span v-if="v$.lastName.$error" class="text-error text-sm mt-1">{{
                  v$.lastName.$errors[0].$message
                }}</span>
              </div>
            </div>

            <div class="form-control mt-4">
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
              <span v-if="v$.email.$error" class="text-error text-sm mt-1">{{
                v$.email.$errors[0].$message
              }}</span>
            </div>

            <div class="form-control mt-4">
              <label
                class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
              >
                <Icon name="mdi:key-outline" class="h-4 w-4 opacity-70" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Minimum 8 caractères"
                  class="grow"
                  autocomplete="new-password"
                  :class="{ 'input-error': v$.password.$error }"
                  @input="v$.password.$touch()"
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
              <span v-if="v$.password.$error" class="text-error text-sm mt-1">{{
                v$.password.$errors[0].$message
              }}</span>
            </div>

            <div class="form-control mt-4">
              <label
                class="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 w-full"
              >
                <Icon name="mdi:key-outline" class="h-4 w-4 opacity-70" />
                <input
                  v-model="passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  placeholder="Confirmer le mot de passe"
                  class="grow"
                  autocomplete="new-password"
                  :class="{ 'input-error': v$.passwordConfirm.$error }"
                  @input="v$.passwordConfirm.$touch()"
                />
                <button
                  class="btn btn-ghost btn-xs"
                  type="button"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                >
                  <Icon v-if="!showPasswordConfirm" name="mdi:eye-outline" class="h-4 w-4" />
                  <Icon v-else name="mdi:eye-off-outline" class="h-4 w-4" />
                </button>
              </label>
              <span v-if="v$.passwordConfirm.$error" class="text-error text-sm mt-1">{{
                v$.passwordConfirm.$errors[0].$message
              }}</span>
            </div>

            <div class="form-control mt-4">
              <label class="label cursor-pointer justify-start gap-2">
                <input
                  v-model="termsAccepted"
                  type="checkbox"
                  class="checkbox"
                  :class="{ 'checkbox-error': v$.termsAccepted.$error }"
                  @blur="v$.termsAccepted.$touch()"
                />
                <span class="label-text"
                  >J'accepte les
                  <NuxtLink to="/terms" class="link link-neutral"
                    >conditions d'utilisation</NuxtLink
                  ></span
                >
              </label>
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-primary w-full"
                :disabled="isLoading || v$.$invalid"
              >
                {{ isLoading ? 'Création en cours...' : 'Créer mon compte' }}
              </button>
            </div>
          </form>

          <!-- <div class="divider">OU</div>

          <button
            class="btn btn-outline"
            :disabled="isLoading || !termsAccepted"
            @click="signUpWithGoogle"
          >
            <Icon name="mdi:google" class="mr-2 h-5 w-5" />
            Continuer avec Google
          </button> -->

          <div class="text-center mt-4">
            <span>Vous avez déjà un compte? </span>
            <NuxtLink to="/auth/login" class="link link-primary"> Se connecter </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email as emailValidator, minLength, helpers } from '@vuelidate/validators'
  import { useAuth } from '~/composables/useAuth'
  import {
    validateCinNumber,
    validateCinIssuedDate,
    CIN_VALIDATION_MESSAGES
  } from '~/utils/validation'

  definePageMeta({
    middleware: ['auth']
  })

  const router = useRouter()
  const { register, isLoading } = useAuth()

  const error = ref<string | null>(null)

  // Définir les champs du formulaire
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const cinNumber = ref('')
  const cinIssuedDate = ref('')
  const termsAccepted = ref(false)

  // Validation personnalisée pour mot de passe contenant un chiffre
  const containsNumber = helpers.withMessage(
    'Le mot de passe doit contenir au moins un chiffre',
    value => /\d/.test(value as string)
  )

  // Validations personnalisées pour CIN
  const cinNumberValidator = helpers.withMessage(
    CIN_VALIDATION_MESSAGES.INVALID_FORMAT,
    value => !value || validateCinNumber(value as string)
  )

  const cinDateValidator = helpers.withMessage(
    CIN_VALIDATION_MESSAGES.INVALID_DATE,
    value => !value || validateCinIssuedDate(value as string)
  )

  // Règles de validation Vuelidate
  const rules = {
    firstName: {
      required: helpers.withMessage('Le prénom est requis', required),
      minLength: helpers.withMessage('Le prénom doit contenir au moins 2 caractères', minLength(2))
    },
    lastName: {
      required: helpers.withMessage('Le nom est requis', required),
      minLength: helpers.withMessage('Le nom doit contenir au moins 2 caractères', minLength(2))
    },
    email: {
      required: helpers.withMessage("L'email est requis", required),
      email: helpers.withMessage("Format d'email invalide", emailValidator)
    },
    password: {
      required: helpers.withMessage('Le mot de passe est requis', required),
      minLength: helpers.withMessage(
        'Le mot de passe doit contenir au moins 8 caractères',
        minLength(8)
      ),
      containsNumber
    },
    passwordConfirm: {
      required: helpers.withMessage('La confirmation du mot de passe est requise', required),
      sameAsPassword: helpers.withMessage(
        'Les mots de passe ne correspondent pas',
        value => value === password.value
      )
    },
    cinNumber: {
      cinNumberValidator
    },
    cinIssuedDate: {
      cinDateValidator
    },
    termsAccepted: {
      isAccepted: helpers.withMessage(
        "Vous devez accepter les conditions d'utilisation",
        value => value === true
      )
    }
  }

  // Initialiser Vuelidate
  const v$ = useVuelidate(rules, {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    cinNumber,
    cinIssuedDate,
    termsAccepted
  })

  // États pour afficher/masquer les mots de passe
  const showPassword = ref(false)
  const showPasswordConfirm = ref(false)

  // Afficher les erreurs de validation en direct
  const showValidationError = ref(true)

  const handleRegister = async () => {
    error.value = null
    showValidationError.value = true

    // Valider le formulaire avant soumission
    const isValid = await v$.value.$validate()
    if (!isValid) {
      return
    }

    // Envoyer les données à Supabase
    const {
      success,
      error: registerError,
      notification
    } = await register({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value
    })

    if (success) {
      // Réinitialiser les champs du formulaire
      email.value = ''
      password.value = ''
      passwordConfirm.value = ''
      firstName.value = ''
      lastName.value = ''
      cinNumber.value = ''
      cinIssuedDate.value = ''
      termsAccepted.value = false

      // Reset la validation
      v$.value.$reset()

      // Stocker la notification dans localStorage pour l'afficher sur la page de login
      if (notification) {
        localStorage.setItem('authNotification', JSON.stringify(notification))
      }

      // Redirection vers la page de login après inscription réussie
      router.push('/auth/login')
    } else {
      error.value = registerError || "Une erreur est survenue lors de l'inscription"
    }
  }
</script>
