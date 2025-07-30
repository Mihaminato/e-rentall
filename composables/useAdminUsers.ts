import type { SupabaseClient } from '@supabase/supabase-js'
import { ref } from 'vue'
import type { Profile } from '~/types'

export interface UserFilters {
  status: 'all' | 'verified' | 'pending'
  role: 'all' | 'admin' | 'user'
  searchQuery: string
}

export const useAdminUsers = () => {
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const users = ref<Profile[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchUsers = async (
    filters: UserFilters,
    page: number,
    pageSize: number
  ): Promise<{ data: Profile[]; count: number }> => {
    isLoading.value = true
    error.value = null
    try {
      let query = supabase.from('profiles').select('*', { count: 'exact' })

      // Filtres
      if (filters.searchQuery) {
        const search = `%${filters.searchQuery}%`
        query = query.or(
          `first_name.ilike.${search},last_name.ilike.${search},email.ilike.${search}`
        )
      }
      if (filters.status === 'verified') {
        query = query.eq('is_verified', true)
      } else if (filters.status === 'pending') {
        query = query.eq('is_verified', false)
      }
      if (filters.role === 'admin') {
        query = query.eq('is_admin', true)
      } else if (filters.role === 'user') {
        query = query.eq('is_admin', false)
      }

      // Tri
      query = query.order('created_at', { ascending: false })

      // Pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error: queryError, count } = await query

      if (queryError) throw queryError

      return { data: (data as Profile[]) || [], count: count || 0 }
    } catch (err) {
      const message = (err as Error).message
      error.value = message
      console.error('Erreur lors de la récupération des utilisateurs:', message)
      return { data: [], count: 0 }
    } finally {
      isLoading.value = false
    }
  }

  const updateUser = async (
    userId: string,
    updates: Partial<Profile>
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)

      if (updateError) throw updateError
      return { success: true, error: null }
    } catch (err) {
      const message = (err as Error).message
      console.error("Erreur lors de la mise à jour de l'utilisateur:", message)
      return { success: false, error: message }
    }
  }

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    updateUser
  }
}
