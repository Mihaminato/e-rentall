import type { SupabaseClient } from '@supabase/supabase-js'
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

export interface RegistrationData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const useAuth = () => {
  // Store Pinia pour l'état global
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const notification = ref<{
    type: 'info' | 'success' | 'warning' | 'error'
    message: string
  } | null>(null)

  const register = async (formData: RegistrationData) => {
    const { email, password, firstName, lastName } = formData
    isLoading.value = true
    error.value = null

    try {
      // Créer un compte utilisateur avec les métadonnées (prénom/nom/CIN)
      // Le profil sera automatiquement créé par un trigger PostgreSQL qui utilise ces métadonnées
      const {
        data: { user: newUser },
        error: signUpError
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      })

      if (signUpError) throw signUpError
      if (!newUser) throw new Error("Échec de l'inscription, aucun utilisateur créé")

      // Connecter l'utilisateur pour obtenir une session valide
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      // Vérifier spécifiquement l'erreur de confirmation email
      if (signInError) {
        // Si c'est une erreur de confirmation d'email, on la traite comme une notification
        if (signInError.message.includes('Email not confirmed')) {
          notification.value = {
            type: 'info',
            message:
              'Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception.'
          }
          // On continue le flux sans bloquer
        } else {
          // Pour les autres erreurs, on bloque
          throw signInError
        }
      }

      // Le profil est automatiquement créé par le trigger PostgreSQL
      // avec les métadonnées first_name et last_name

      // En cas de confirmation d'email requise, on définit une notification de succès
      // sinon la notification est déjà définie par le code ci-dessus
      if (!notification.value) {
        notification.value = {
          type: 'success',
          message: 'Votre compte a bien été créé. Vous pouvez maintenant vous connecter.'
        }
      }

      return { success: true, notification: notification.value }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value, cause: err }
    } finally {
      isLoading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null

    try {
      const {
        data: { user: authUser },
        error: signInError
      } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError || !authUser) throw signInError

      // Le listener `onAuthStateChange` s'occupera de mettre à jour le store
      // et de charger le profil.

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const loginWithGoogle = async () => {
    isLoading.value = true
    error.value = null

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signInError) throw signInError

      // La redirection vers Google se produit ici, donc pas besoin de retourner un résultat
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError

      // Réinitialiser manuellement le store pour une déconnexion immédiate et fiable
      const authStore = useAuthStore()
      authStore.$reset()
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (email: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password?type=recovery`
      })

      if (resetError) throw resetError

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const updateUserPassword = async (password: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) throw updateError

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    notification,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserPassword
  }
}
