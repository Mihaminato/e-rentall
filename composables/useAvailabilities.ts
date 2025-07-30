import dayjs from 'dayjs'
import { ref } from 'vue'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Availability } from '~/types'

export const useAvailabilities = () => {
  const supabase = useNuxtApp().$supabase as SupabaseClient

  // États réactifs
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const availabilities = ref<Availability[]>([])

  /**
   * Récupère toutes les disponibilités d'un véhicule
   */
  const fetchVehicleAvailabilities = async (vehicleId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('start_date', { ascending: true })

      if (supabaseError) throw supabaseError

      availabilities.value = data || []
      return { success: true, data }
    } catch (err) {
      console.error('Erreur lors de la récupération des disponibilités:', err)
      error.value = 'Erreur lors de la récupération des disponibilités'
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Ajoute une nouvelle période de disponibilité
   */
  const addAvailability = async (
    availability: Omit<Availability, 'id' | 'created_at' | 'updated_at'>
  ) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .insert(availability)
        .select()
        .single()

      if (supabaseError) throw supabaseError

      // Ajouter la nouvelle disponibilité à la liste
      if (data) {
        availabilities.value.push(data)
        // Trier les disponibilités par date de début
        availabilities.value.sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)))
      }

      return { success: true, data }
    } catch (err) {
      console.error("Erreur lors de l'ajout de la disponibilité:", err)
      error.value = "Erreur lors de l'ajout de la disponibilité"
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Met à jour une période de disponibilité existante
   */
  const updateAvailability = async (id: string, updates: Partial<Availability>) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (supabaseError) throw supabaseError

      // Mettre à jour la disponibilité dans la liste
      if (data) {
        const index = availabilities.value.findIndex(a => a.id === id)
        if (index !== -1) {
          availabilities.value[index] = data
          // Trier les disponibilités par date de début
          availabilities.value.sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)))
        }
      }

      return { success: true, data }
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la disponibilité:', err)
      error.value = 'Erreur lors de la mise à jour de la disponibilité'
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Supprime une période de disponibilité
   */
  const deleteAvailability = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { error: supabaseError } = await supabase.from('availabilities').delete().eq('id', id)

      if (supabaseError) throw supabaseError

      // Supprimer la disponibilité de la liste
      availabilities.value = availabilities.value.filter(a => a.id !== id)

      return { success: true }
    } catch (err) {
      console.error('Erreur lors de la suppression de la disponibilité:', err)
      error.value = 'Erreur lors de la suppression de la disponibilité'
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Vérifie si une période est disponible (pas de chevauchement)
   */
  const isPeriodAvailable = (
    startDate: Date | string,
    endDate: Date | string,
    excludeId?: string
  ) => {
    const start = dayjs(startDate).startOf('day')
    const end = dayjs(endDate).startOf('day')

    return !availabilities.value.some(availability => {
      // Exclure la disponibilité en cours de modification
      if (excludeId && availability.id === excludeId) return false

      const availStart = dayjs(availability.start_date).startOf('day')
      const availEnd = dayjs(availability.end_date).startOf('day')

      // Vérifier le chevauchement des périodes avec Day.js
      return (
        start.isBetween(availStart, availEnd, null, '[]') || // La date de début est dans une période existante
        end.isBetween(availStart, availEnd, null, '[]') || // La date de fin est dans une période existante
        (start.isSameOrBefore(availStart) && end.isSameOrAfter(availEnd)) // La période englobe une période existante
      )
    })
  }

  /**
   * Récupère toutes les disponibilités d'un véhicule sans modifier l'état interne
   */
  const fetchAllVehicleAvailabilities = async (vehicleId: string) => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('availabilities')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('start_date', { ascending: true })

      if (supabaseError) throw supabaseError

      return { success: true, data }
    } catch (err) {
      console.error('Erreur lors de la récupération des disponibilités:', err)
      return { success: false, error: err }
    }
  }

  return {
    isLoading,
    error,
    availabilities,
    fetchVehicleAvailabilities,
    fetchAllVehicleAvailabilities,
    addAvailability,
    updateAvailability,
    deleteAvailability,
    isPeriodAvailable
  }
}
