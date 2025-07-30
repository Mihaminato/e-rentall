import type { Session, SupabaseClient } from '@supabase/supabase-js'
import { useAuthStore } from '~/stores/auth'
import useProfile from '~/composables/useProfile'

export default defineNuxtPlugin(async nuxtApp => {
  const supabase = nuxtApp.$supabase as SupabaseClient
  const authStore = useAuthStore()
  const { loadUserProfile } = useProfile()

  // Cette fonction sera appelée à chaque changement d'état d'authentification
  const handleAuthStateChange = async (event: string, session: Session | null) => {
    // Si l'utilisateur est connecté
    if (session) {
      // Mettre à jour l'utilisateur dans le store Pinia
      authStore.setUser({ id: session.user.id, email: session.user.email ?? '' })

      // On charge le profil sans attendre (ne bloque pas le rendu de l'app)
      loadUserProfile(session.user.id)
        .then(profile => {
          if (profile) {
            console.info('[Auth Listener] Profil chargé avec succès en arrière-plan pour')
          } else {
            console.warn(
              "[Auth Listener] Le chargement du profil en arrière-plan a échoué ou n'a retourné aucun profil."
            )
          }
        })
        .catch(error => {
          console.error(
            '[Auth Listener] Erreur non capturée lors du chargement du profil en arrière-plan:',
            error
          )
        })
    } else {
      // Si l'utilisateur est déconnecté, réinitialiser le store
      console.info('[Auth Listener] Utilisateur déconnecté, réinitialisation du state.')
      authStore.resetState()
    }
  }

  // Lancer l'écouteur d'événements d'authentification
  supabase.auth.onAuthStateChange(handleAuthStateChange)

  // L'écouteur est automatiquement géré par le cycle de vie du plugin Nuxt.
  // Le nettoyage se fera à la destruction de l'instance de l'app.

  // Vérifier la session initiale au chargement de l'app
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()
    if (session) {
      console.info('[Auth Listener] Session initiale détectée, déclenchement manuel.')
      // Déclencher manuellement pour l'état initial
      await handleAuthStateChange('INITIAL_SESSION', session)
    } else {
      console.info('[Auth Listener] Pas de session initiale.')
    }
  } catch (error) {
    console.error('[Auth Listener] Erreur lors de la récupération de la session initiale:', error)
  }
})
