import { ref, computed, type Ref } from 'vue'

export interface PaginationOptions {
  pageSize?: number
  defaultPage?: number
}

export interface PaginationState {
  currentPage: Ref<number>
  pageSize: Ref<number>
  totalItems: Ref<number>
  totalPages: Ref<number>
  isLoading: Ref<boolean>
}

export interface PaginationMethods {
  goToPage: (page: number) => void
  changePageSize: (size: number) => void
  getSupabaseRange: () => { from: number; to: number }
  reset: () => void
}

export type UsePaginationReturn = PaginationState & PaginationMethods

/**
 * Composable pour gérer la pagination compatible avec Supabase
 *
 * @example
 * const pagination = usePagination({ pageSize: 20 })
 *
 * const { from, to } = pagination.getSupabaseRange()
 * const { data, error, count } = await supabase
 *   .from('vehicles')
 *   .select('*', { count: 'exact' })
 *   .range(from, to)
 *
 * pagination.totalItems.value = count || 0
 */
export function usePagination(options: PaginationOptions = {}): UsePaginationReturn {
  const { pageSize: defaultPageSize = 12, defaultPage = 1 } = options

  // État réactif
  const currentPage = ref(defaultPage)
  const pageSize = ref(defaultPageSize)
  const totalItems = ref(0)
  const isLoading = ref(false)

  // Calculs
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

  // Méthodes
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const changePageSize = (size: number) => {
    pageSize.value = size
    currentPage.value = 1 // Reset à la première page
  }

  /**
   * Retourne les paramètres from/to pour Supabase .range()
   * Supabase utilise un range inclusif : range(from, to)
   */
  const getSupabaseRange = () => {
    const from = (currentPage.value - 1) * pageSize.value
    const to = from + pageSize.value - 1
    return { from, to }
  }

  const reset = () => {
    currentPage.value = defaultPage
    pageSize.value = defaultPageSize
    totalItems.value = 0
  }

  return {
    // État
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    isLoading,
    // Méthodes
    goToPage,
    changePageSize,
    getSupabaseRange,
    reset
  }
}

/**
 * Exemple d'utilisation avec useVehicles
 *
 * const pagination = usePagination({ pageSize: 20 })
 * const { vehicles, loading, searchVehicles } = useVehicles()
 *
 * const loadVehicles = async (filters = {}) => {
 *   pagination.isLoading.value = true
 *   const { from, to } = pagination.getSupabaseRange()
 *
 *   const { data, count } = await searchVehicles({
 *     ...filters,
 *     from,
 *     to
 *   })
 *
 *   pagination.totalItems.value = count || 0
 *   pagination.isLoading.value = false
 * }
 *
 * // Watchers pour recharger quand pagination change
 * watch([pagination.currentPage, pagination.pageSize], () => {
 *   loadVehicles(currentFilters.value)
 * })
 */
