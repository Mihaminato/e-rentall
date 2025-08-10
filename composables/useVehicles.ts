import { ref } from 'vue'
import type { Vehicle, VehiclePhoto, SearchFilters, PaginatedResponse } from '~/types'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface AdminFilters {
  status: boolean | ''
  type: string
  location: string
  searchTerm: string
}

/**
 * Composable pour toutes les opérations liées aux véhicules.
 * La gestion de session est maintenant gérée globalement par `auth-listener.client.ts`.
 */
export const useVehicles = () => {
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const vehicles = ref<Vehicle[]>([])
  const vehicle = ref<Vehicle | null>(null)
  const vehiclePhotos = ref<VehiclePhoto[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const ownerVehicles = ref<Vehicle[]>([])

  const VEHICLE_DOCUMENTS_BUCKET = 'documents'

  // Objet contenant des fonctions pour appliquer chaque type de filtre
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterHandlers: Record<string, (query: any, value: any) => any> = {
    province: (query, value) => query.eq('province', value),
    vehicleType: (query, value) => query.eq('vehicle_type', value),
    transmission: (query, value) => query.eq('transmission', value),
    fuelType: (query, value) => query.eq('fuel_type', value),
    seats: (query, value) => {
      const seatsNum = parseInt(value)
      return !isNaN(seatsNum) ? query.gte('seats', seatsNum) : query
    },
    maxPrice: (query, value) => {
      if (typeof value === 'string' && value.includes('-')) {
        const [min, max] = value.split('-').map(Number)
        if (!isNaN(min) && !isNaN(max)) {
          return query.gte('price_per_day', min).lte('price_per_day', max)
        }
      }
      return query
    },
    maxConsumption: (query, value) => {
      const cons = parseInt(value)
      return !isNaN(cons) ? query.lte('consumption', cons) : query
    },
    keywords: (query, value) => {
      const kw = `%${value}%`
      return query.or(`make.ilike.${kw},model.ilike.${kw},description.ilike.${kw}`)
    }
  }

  // Helper: Appliquer les filtres à une requête en utilisant les handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyFilters = (query: any, filters?: SearchFilters) => {
    if (!filters) {
      return query
    }

    return Object.entries(filters).reduce((currentQuery, [key, value]) => {
      if (value && filterHandlers[key]) {
        return filterHandlers[key](currentQuery, value)
      }
      return currentQuery
    }, query)
  }

  // Helper: Appliquer le tri à une requête
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applySorting = (query: any, sortBy: string) => {
    switch (sortBy) {
      case 'price_asc':
        return query.order('price_per_day', { ascending: true })
      case 'price_desc':
        return query.order('price_per_day', { ascending: false })
      case 'newest':
        return query.order('created_at', { ascending: false })
      case 'rating_desc':
        return query.order('created_at', { ascending: false })
      default:
        return query.order('created_at', { ascending: false })
    }
  }

  const processVehicleData = (data: Vehicle[]) => {
    return (
      data?.map(v => {
        // if (v.type === 'sedan' && v.model.toLowerCase().includes('corolla')) {
        //   console.log('COROLLA TROUVEE', v)
        // }
        const primaryPhoto = v.vehicle_photos?.find(photo => photo.is_primary)

        // Vérifier si le véhicule a des disponibilités
        const hasAvailabilities = v.availabilities && v.availabilities.length > 0

        return {
          ...v,
          image_url: primaryPhoto?.file_path
            ? supabase.storage.from('cars').getPublicUrl(primaryPhoto.file_path).data.publicUrl
            : undefined,
          vehicle_photos: v.vehicle_photos || [],
          availabilities: v.availabilities || [],
          isCurrentlyAvailable: hasAvailabilities
        }
      }) || []
    )
  }

  // Helper: Filtrer par disponibilités
  const filterByAvailabilities = async (filters: SearchFilters) => {
    const { data: availableVehicleIds, error: availabilitiesError } = await supabase
      .from('availabilities')
      .select('vehicle_id')
      .lte('start_date', filters.endDate)
      .gte('end_date', filters.startDate)

    if (availabilitiesError) {
      console.error('Erreur lors de la récupération des availabilities:', availabilitiesError)
      throw availabilitiesError
    }

    return availableVehicleIds?.map(av => av.vehicle_id) || []
  }

  // Helper: Exécuter la requête principale
  const executeMainQuery = async (
    filters?: SearchFilters,
    sortBy: string = 'price_asc',
    page: number = 1,
    pageSize: number = 12
  ) => {
    let query = supabase
      .from('vehicles')
      .select(
        `id, make, model, year, transmission, seats, price_per_day, vehicle_type, 
        province, license_plate, consumption, description, fuel_type, mileage, created_at, is_active,
        vehicle_photos!left (id, file_path, is_primary),
        availabilities!left (id, start_date, end_date)`,
        { count: 'exact' }
      )
      .eq('is_active', true)

    query = applyFilters(query, filters)
    query = applySorting(query, sortBy)

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    return await query
  }

  // Helper: Gérer le filtrage par dates
  const handleDateFiltering = async (filters: SearchFilters) => {
    const availableIds = await filterByAvailabilities(filters)

    if (availableIds.length === 0) {
      vehicles.value = []
      return { data: [], count: 0, from: 0, to: 0, total: 0 }
    }

    const filteredVehicles = vehicles.value.filter(vehicle => availableIds.includes(vehicle.id))
    vehicles.value = filteredVehicles

    return {
      data: vehicles.value,
      count: vehicles.value.length,
      from: 0,
      to: vehicles.value.length - 1,
      total: vehicles.value.length
    }
  }

  // Helper: Créer la réponse normale
  const createNormalResponse = (count: number, page: number, pageSize: number) => {
    return {
      data: vehicles.value,
      count: count || 0,
      from: (page - 1) * pageSize,
      to: Math.min((page - 1) * pageSize + pageSize - 1, (count || 0) - 1),
      total: count || 0
    }
  }

  // Charger tous les véhicules disponibles avec filtres et pagination (version optimisée)
  // eslint-disable-next-line complexity
  const fetchVehiclesWithPagination = async (
    filters?: SearchFilters,
    sortBy: string = 'price_asc',
    page: number = 1,
    pageSize: number = 12
  ): Promise<PaginatedResponse<Vehicle>> => {
    isLoading.value = true
    error.value = null

    try {
      const {
        data,
        error: fetchError,
        count
      } = await executeMainQuery(filters, sortBy, page, pageSize)

      if (fetchError) throw fetchError

      const result = processVehicleData(data as unknown as Vehicle[])
      vehicles.value = result

      if (filters?.startDate && filters?.endDate) {
        try {
          return await handleDateFiltering(filters)
        } catch (availabilityError) {
          console.error('Erreur lors du filtrage par dates:', availabilityError)
        }
      }

      return createNormalResponse(count || 0, page, pageSize)
    } catch (err) {
      error.value = (err as Error).message
      vehicles.value = [] // Reset les véhicules en cas d'erreur
      return { data: [], count: 0, from: 0, to: 0, total: 0 }
    } finally {
      isLoading.value = false
    }
  }

  // Charger un véhicule spécifique par ID avec toutes ses relations
  const fetchVehicleById = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select(
          `
            *,
        owner:profiles!owner_id(id, first_name, last_name, avatar_url, is_verified, address, city, postal_code, created_at),
        vehicle_photos(id, file_path, is_primary),
        availabilities(*)
          `
        )
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      vehicle.value = data as Vehicle
      return { vehicle: vehicle.value }
    } catch (err) {
      error.value = (err as Error).message
      vehicle.value = null
      return { vehicle: null, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Charger les photos d'un véhicule
  const fetchVehiclePhotos = async (vehicleId: string) => {
    try {
      const { data, error: photosError } = await supabase
        .from('vehicle_photos')
        .select('id,vehicle_id,file_path,is_primary')
        .eq('vehicle_id', vehicleId)
        .order('is_primary', { ascending: false })

      if (photosError) throw photosError

      vehiclePhotos.value = data as VehiclePhoto[]
      return { photos: vehiclePhotos.value }
    } catch (err) {
      error.value = (err as Error).message
      vehiclePhotos.value = []
      return { photos: [], error: error.value }
    }
  }

  // Récupérer les véhicules d'un propriétaire avec leurs photos
  const fetchMyVehicles = async (
    ownerId: string,
    publicView: boolean = false,
    statuses: boolean[] = [true, false],
    page: number = 1,
    limit: number = 6
  ) => {
    isLoading.value = true
    error.value = null

    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      let query = supabase
        .from('vehicles')
        .select(
          `id,owner_id,make,model,year,transmission,seats,price_per_day,vehicle_type,province,license_plate,consumption,is_active,
            description,fuel_type,created_at,updated_at,
            vehicle_photos (id,vehicle_id,file_path,is_primary),
            availabilities (id,vehicle_id,start_date,end_date)`,
          { count: 'exact' }
        )
        .eq('owner_id', ownerId)
        .in('is_active', statuses)
        .range(from, to)
        .order('created_at', { ascending: false })

      // Pour la vue publique, afficher seulement les véhicules actifs
      if (publicView) {
        query = query.eq('is_active', true)
      }

      const { data, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      // Traiter les données des véhicules pour générer les URLs des photos
      const processedVehicles = processVehicleData(data as unknown as Vehicle[])

      vehicles.value = processedVehicles

      return { vehicles: processedVehicles, error: null, totalCount: count }
    } catch (err) {
      error.value = (err as Error).message
      return { vehicles: [], error: error.value, totalCount: 0 }
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer les véhicules d'un propriétaire avec leurs photos (style similaire à fetchMyVehicles)
  const fetchOwnerVehiclesWithPhotos = async (
    ownerId: string,
    page: number = 1,
    limit: number = 6,
    statuses: boolean[] = [true, false]
  ): Promise<{ vehicles: Vehicle[]; error: string | null; totalCount: number | null }> => {
    isLoading.value = true
    error.value = null

    const from = (page - 1) * limit
    const to = from + limit - 1

    try {
      const {
        data,
        error: fetchError,
        count
      } = await supabase
        .from('vehicles')
        .select(
          `id,owner_id,make,model,year,transmission,seats,price_per_day,vehicle_type,province,license_plate,consumption,is_active,
            description,fuel_type,created_at,updated_at,
            vehicle_photos (id,vehicle_id,file_path,is_primary),
            availabilities (id,vehicle_id,start_date,end_date)`,
          { count: 'exact' }
        )
        .eq('owner_id', ownerId)
        .in('is_active', statuses)
        .range(from, to)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      const processedVehicles = processVehicleData(data as unknown as Vehicle[])
      ownerVehicles.value = processedVehicles
      return { vehicles: processedVehicles, error: null, totalCount: count || 0 }
    } catch (err) {
      error.value = (err as Error).message
      return { vehicles: [], error: error.value, totalCount: 0 }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupère le nombre total de véhicules pour un propriétaire, groupés par statut.
   * @param ownerId L'ID du propriétaire
   */
  const getMyVehiclesCounts = async (
    ownerId: string
  ): Promise<{
    counts: { active: number; inactive: number }
    error: string | null
  }> => {
    try {
      const statusMap: Record<string, boolean[]> = {
        active: [true],
        inactive: [false]
      }

      const countsPromises = Object.keys(statusMap).map(async key => {
        const { count, error } = await supabase
          .from('vehicles')
          .select('id', { count: 'exact', head: true })
          .eq('owner_id', ownerId)
          .in('is_active', statusMap[key])

        if (error) {
          console.error(`Erreur lors du comptage pour le statut ${key}:`, error)
          return { [key]: 0 }
        }
        return { [key]: count || 0 }
      })

      const countsArray = await Promise.all(countsPromises)
      const counts = countsArray.reduce((acc, current) => ({ ...acc, ...current }), {
        active: 0,
        inactive: 0
      }) as { active: number; inactive: number }

      return { counts, error: null }
    } catch (err) {
      console.error('Erreur lors du comptage des véhicules:', err)
      return { counts: { active: 0, inactive: 0 }, error: (err as Error).message }
    }
  }

  // Ajouter un nouveau véhicule
  const addVehicle = async (
    vehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>,
    documents: { vehicleRegistrationFile: File | null; technicalInspectionFile: File | null }
  ) => {
    isLoading.value = true
    error.value = null

    try {
      // 1. Insérer les données du véhicule
      const { data, error: insertError } = await supabase
        .from('vehicles')
        .insert([vehicleData])
        .select()
        .maybeSingle()

      if (insertError) throw insertError
      if (!data)
        throw new Error(
          "Le véhicule a été créé, mais n'a pas pu être récupéré. Vérifiez les politiques RLS."
        )

      const newVehicle = data as Vehicle

      // 2. Uploader les documents si présents
      if (documents.vehicleRegistrationFile) {
        await uploadVehicleDocument(
          newVehicle.id,
          newVehicle.owner_id,
          'vehicle_registration',
          documents.vehicleRegistrationFile
        )
      }
      if (documents.technicalInspectionFile) {
        await uploadVehicleDocument(
          newVehicle.id,
          newVehicle.owner_id,
          'technical_inspection',
          documents.technicalInspectionFile
        )
      }

      return { vehicle: newVehicle }
    } catch (err) {
      error.value = (err as Error).message
      return { vehicle: null, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Mettre à jour un véhicule existant
  const updateVehicle = async (
    id: string,
    updates: Partial<Vehicle>,
    documents: { vehicleRegistrationFile: File | null; technicalInspectionFile: File | null }
  ) => {
    isLoading.value = true
    error.value = null

    try {
      // 1. Mettre à jour les données de base du véhicule
      const { data: updatedVehicle, error: updateError } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .select()
        .maybeSingle()

      if (updateError) throw updateError
      if (!updatedVehicle)
        throw new Error(
          "Le véhicule a été mis à jour, mais n'a pas pu être récupéré. Vérifiez les politiques RLS."
        )

      // 2. Gérer les documents
      const handleDocumentUpdate = async (docType: string, newFile: File | null) => {
        if (!newFile) return // Pas de nouveau fichier, on ne fait rien

        // Chercher s'il y a un document existant de ce type
        const { data: existingDocs, error: fetchError } = await supabase
          .from('vehicle_documents')
          .select('id')
          .eq('vehicle_id', id)
          .eq('type', docType)

        if (fetchError) {
          console.error(`Error fetching existing ${docType}:`, fetchError)
          return // On continue malgré l'erreur pour ne pas bloquer
        }

        // Supprimer les anciens documents du même type
        if (existingDocs && existingDocs.length > 0) {
          for (const doc of existingDocs) {
            await deleteVehicleDocument(doc.id)
          }
        }

        // Uploader le nouveau document
        await uploadVehicleDocument(id, updatedVehicle.owner_id, docType, newFile)
      }

      await handleDocumentUpdate('vehicle_registration', documents.vehicleRegistrationFile)
      await handleDocumentUpdate('technical_inspection', documents.technicalInspectionFile)

      return { vehicle: updatedVehicle }
    } catch (err) {
      error.value = (err as Error).message
      return { vehicle: null, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer les chemins de fichiers des photos d'un véhicule
  const getVehiclePhotoPaths = async (vehicleId: string) => {
    try {
      const { data: photosData, error: photosError } = await supabase
        .from('vehicle_photos')
        .select('id, file_path')
        .eq('vehicle_id', vehicleId)

      if (photosError) throw photosError
      return { success: true, photos: photosData || [] }
    } catch (err) {
      const errorMsg = (err as Error).message
      console.error('Erreur lors de la récupération des photos:', errorMsg)
      return { success: false, error: errorMsg, photos: [] }
    }
  }

  // Supprimer les photos d'un véhicule directement par ID de véhicule
  const deleteVehiclePhotos = async (vehicleId: string) => {
    try {
      // 1. Récupérer les photos du véhicule
      const { success, photos, error: getError } = await getVehiclePhotoPaths(vehicleId)

      if (!success) {
        console.error('Erreur lors de la récupération des photos:', getError)
        return { success: false, error: getError }
      }

      // 2. Supprimer les fichiers physiques du stockage
      if (photos.length > 0) {
        const filePaths = photos.map(photo => photo.file_path)
        await deleteFileFromStorage(filePaths) // On peut ignorer les erreurs ici
      }

      // 3. Supprimer les enregistrements en base de données
      const { error: deleteRecordsError } = await supabase
        .from('vehicle_photos')
        .delete()
        .eq('vehicle_id', vehicleId)

      if (deleteRecordsError) {
        console.error('Erreur lors de la suppression des enregistrements:', deleteRecordsError)
        return { success: false, error: deleteRecordsError.message }
      }

      return { success: true }
    } catch (err) {
      const errorMsg = (err as Error).message
      return { success: false, error: errorMsg }
    }
  }

  // Supprimer un véhicule et ses photos associées
  const deleteVehicle = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      // 1. Supprimer toutes les photos associées au véhicule
      const photoResult = await deleteVehiclePhotos(id)

      if (!photoResult.success) {
        console.error('Erreur lors de la suppression des photos:', photoResult.error)
        // On continue quand même pour essayer de supprimer le véhicule
      }

      // 2. Supprimer le véhicule lui-même
      const { error: deleteVehicleError } = await supabase.from('vehicles').delete().eq('id', id)

      if (deleteVehicleError) throw deleteVehicleError

      // 3. Mettre à jour l'état local
      vehicles.value = vehicles.value.filter(v => v.id !== id)
      if (vehicle.value?.id === id) {
        vehicle.value = null
      }

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Ajouter une photo à un véhicule
  const addVehiclePhoto = async (
    vehicleId: string,
    filePath: string,
    isPrimary: boolean = false
  ) => {
    try {
      const { data, error: addPhotoError } = await supabase
        .from('vehicle_photos')
        .insert({
          vehicle_id: vehicleId,
          file_path: filePath,
          is_primary: isPrimary,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (addPhotoError) throw addPhotoError

      // Ajouter la nouvelle photo à la liste
      if (data) {
        vehiclePhotos.value = [data as VehiclePhoto, ...vehiclePhotos.value]
      }

      return { success: true, photo: data as VehiclePhoto }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    }
  }

  // Supprimer un ou plusieurs fichiers physiques dans le bucket de stockage par leur(s) chemin(s)
  const deleteFileFromStorage = async (filePath: string | string[]) => {
    try {
      const paths = Array.isArray(filePath) ? filePath : [filePath]

      if (paths.length === 0) return { success: true }

      const { error: deleteFileError } = await supabase.storage.from('cars').remove(paths)

      if (deleteFileError) {
        console.error('Erreur lors de la suppression des fichiers:', deleteFileError)
        return { success: false, error: deleteFileError }
      }

      return { success: true }
    } catch (err) {
      const errorMsg = (err as Error).message
      console.error('Erreur lors de la suppression des fichiers:', errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // Supprimer une entrée de photo de la base de données par son ID
  const deletePhotoFromDatabase = async (photoId: string) => {
    try {
      const { error: deletePhotoError } = await supabase
        .from('vehicle_photos')
        .delete()
        .eq('id', photoId)

      if (deletePhotoError) throw deletePhotoError

      // Supprimer la photo de la liste
      vehiclePhotos.value = vehiclePhotos.value.filter(p => p.id !== photoId)

      return { success: true }
    } catch (err) {
      const errorMsg = (err as Error).message
      console.error('Erreur lors de la suppression de la photo en base:', errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // Obtenir le chemin du fichier pour une photo par son ID
  const getPhotoFilePath = async (photoId: string) => {
    try {
      const { data: photoData, error: getPhotoError } = await supabase
        .from('vehicle_photos')
        .select('file_path')
        .eq('id', photoId)
        .maybeSingle()

      if (getPhotoError) throw getPhotoError

      return { success: true, filePath: photoData?.file_path || null }
    } catch (err) {
      const errorMsg = (err as Error).message
      console.error('Erreur lors de la récupération du chemin de fichier:', errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // Supprimer une photo de véhicule (combinaison des fonctions précédentes)
  const deleteVehiclePhoto = async (photoId: string) => {
    try {
      // 1. Récupérer le chemin du fichier
      const photoPathResult = await getPhotoFilePath(photoId)

      if (!photoPathResult.success) {
        error.value = photoPathResult.error || 'Erreur lors de la récupération du chemin'
        return { success: false, error: error.value }
      }

      // 2. Supprimer le fichier physique
      if (photoPathResult.filePath) {
        await deleteFileFromStorage(photoPathResult.filePath)
        // On continue même en cas d'échec
      }

      // 3. Supprimer l'entrée dans la base de données
      const dbResult = await deletePhotoFromDatabase(photoId)
      if (!dbResult.success) {
        error.value = dbResult.error || 'Erreur lors de la suppression en base de données'
        return { success: false, error: error.value }
      }

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    }
  }

  // Définir une photo comme principale
  const setMainPhoto = async (photoId: string, vehicleId: string) => {
    try {
      // D'abord, réinitialiser toutes les photos pour ne pas être principales
      const { error: resetError } = await supabase
        .from('vehicle_photos')
        .update({ is_primary: false })
        .eq('vehicle_id', vehicleId)

      if (resetError) throw resetError

      // Ensuite, définir la photo sélectionnée comme principale
      const { error: updateError } = await supabase
        .from('vehicle_photos')
        .update({ is_primary: true })
        .eq('id', photoId)

      if (updateError) throw updateError

      // Mettre à jour l'état local
      vehiclePhotos.value = vehiclePhotos.value.map(p => ({
        ...p,
        is_primary: p.id === photoId
      }))

      return { success: true }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // eslint-disable-next-line complexity
  const fetchAllVehicles = async (
    page: number = 1,
    pageSize: number = 10,
    filters?: AdminFilters
  ): Promise<{ data: Vehicle[]; count: number | null }> => {
    isLoading.value = true
    error.value = null

    try {
      let query = supabase.from('vehicles').select(
        `
        *,
        owner:profiles!owner_id(id, first_name, last_name, email, avatar_url),
        vehicle_photos(file_path, is_primary)
        `,
        { count: 'exact' }
      )

      if (filters) {
        if (typeof filters.status === 'boolean') {
          query = query.eq('is_active', filters.status)
        }
        if (filters.type) {
          query = query.eq('vehicle_type', filters.type)
        }
        if (filters.location) {
          query = query.ilike('province', `%${filters.location}%`)
        }
        if (filters.searchTerm) {
          const st = `%${filters.searchTerm}%`
          query = query.or(`make.ilike.${st},model.ilike.${st},owner_id.email.ilike.${st}`)
        }
      }

      const from = (page - 1) * pageSize
      const to = page * pageSize - 1
      query = query.range(from, to).order('created_at', { ascending: false })

      const { data, error: fetchError, count } = await query

      if (fetchError) throw fetchError

      // Traitement pour ajouter l'URL de l'image principale
      const processedData =
        data?.map(vehicle => {
          const primaryPhoto =
            vehicle.vehicle_photos?.find((p: VehiclePhoto) => p.is_primary) ||
            vehicle.vehicle_photos?.[0]
          return {
            ...vehicle,
            image_url: primaryPhoto?.file_path
              ? supabase.storage.from('cars').getPublicUrl(primaryPhoto.file_path).data.publicUrl
              : undefined
          }
        }) || []

      return { data: processedData, count }
    } catch (err) {
      error.value = (err as Error).message
      return { data: [], count: 0 }
    } finally {
      isLoading.value = false
    }
  }

  const fetchVehicleCountByStatus = async (isActive: boolean): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', isActive)

      if (error) throw error
      return count || 0
    } catch (err) {
      console.error('Error fetching vehicle count by status:', err)
      return 0
    }
  }

  // Modérer un véhicule (activer/désactiver) - Admin seulement
  const moderateVehicle = async (vehicleId: string, isActive: boolean) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await supabase
        .from('vehicles')
        .update({
          is_active: isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', vehicleId)
        .select()
        .maybeSingle()

      if (updateError) throw updateError

      // Mettre à jour l'état local
      if (data) {
        vehicles.value = vehicles.value.map(v =>
          v.id === vehicleId ? { ...v, is_active: isActive } : v
        )
        if (vehicle.value?.id === vehicleId) {
          vehicle.value = { ...vehicle.value, is_active: isActive }
        }
      }

      return { success: true, vehicle: data as Vehicle }
    } catch (err) {
      error.value = (err as Error).message
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const fetchVehicleDocuments = async (vehicleId: string) => {
    const { data, error } = await supabase
      .from('vehicle_documents')
      .select('*')
      .eq('vehicle_id', vehicleId)

    if (error) {
      console.error('Error fetching vehicle documents:', error)
      return { error, data: [] }
    }
    return { error: null, data }
  }

  const uploadVehicleDocument = async (
    vehicleId: string,
    ownerId: string,
    documentType: string,
    file: File
  ): Promise<{ error: Error | null }> => {
    const filePath = `${ownerId}/vehicles/${vehicleId}/${documentType}_${Date.now()}.${file.name
      .split('.')
      .pop()}`

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from(VEHICLE_DOCUMENTS_BUCKET)
      .upload(filePath, file)

    if (uploadError) {
      return { error: uploadError }
    }

    // Create record in the database
    const { error: dbError } = await supabase.from('vehicle_documents').insert({
      vehicle_id: vehicleId,
      type: documentType,
      file_path: filePath
    })

    if (dbError) {
      return { error: dbError }
    }

    return { error: null }
  }

  const deleteVehicleDocument = async (documentId: string) => {
    // First, get the file path to delete from storage
    const { data: doc, error: fetchError } = await supabase
      .from('vehicle_documents')
      .select('file_path')
      .eq('id', documentId)
      .maybeSingle()

    if (fetchError) {
      return { error: fetchError }
    }
    // Si le document n'existe plus, on considère que la suppression a réussi
    if (!doc) {
      return { error: null }
    }

    // Delete file from storage
    const { error: storageError } = await supabase.storage
      .from(VEHICLE_DOCUMENTS_BUCKET)
      .remove([doc.file_path])

    if (storageError) {
      return { error: storageError }
    }

    // Delete record from database
    const { error: dbError } = await supabase
      .from('vehicle_documents')
      .delete()
      .eq('id', documentId)

    if (dbError) {
      return { error: dbError }
    }

    return { error: null }
  }

  return {
    vehicles,
    vehicle,
    vehiclePhotos,
    isLoading,
    error,
    ownerVehicles,
    fetchVehiclesWithPagination,
    fetchVehicleById,
    fetchVehiclePhotos,
    fetchMyVehicles,
    fetchOwnerVehiclesWithPhotos,
    getMyVehiclesCounts,
    fetchAllVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addVehiclePhoto,
    deleteVehiclePhoto,
    setMainPhoto,
    moderateVehicle,
    fetchVehicleCountByStatus,
    fetchVehicleDocuments,
    uploadVehicleDocument,
    deleteVehicleDocument
  }
}
