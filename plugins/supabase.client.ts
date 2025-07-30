import { createClient } from '@supabase/supabase-js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  // Le fichier étant suffixé ".client.ts", ce plugin s'exécute uniquement côté client.
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabaseKey as string

  // Activer la persistance de session avec localStorage (persistSession: true est la valeur par défaut)
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'car-rental-auth',
      detectSessionInUrl: true
    }
  })

  return {
    provide: {
      supabase
    }
  }
})
