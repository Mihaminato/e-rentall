import { ref, computed } from 'vue'
import type { Profile, Document } from '~/types'
import { useAuthStore } from '~/stores/auth'
import { cleanCinNumber } from '~/utils/validation'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface DocumentUploadForm {
  type: string
  file: File | null
}

// --- Singleton State ---
// By defining state outside the function, it's created only once
// and shared across all components that use this composable.
const loading = ref(false)
const errorMessage = ref('')
const documents = ref<Document[]>([])
const documentTypes = {
  nif: 'Document NIF',
  stat: 'Document STAT'
}

/**
 * Propriété calculée qui retourne les types de documents que l'utilisateur n'a pas encore uploadés.
 * C'est la source de vérité pour savoir ce qui peut être ajouté.
 */
const missingDocumentTypes = computed(() => {
  const allTypes = Object.keys(documentTypes)
  const uploadedTypes = documents.value.map(doc => doc.type)
  return allTypes.filter(type => !uploadedTypes.includes(type))
})
// --------------------

export default function useProfile() {
  const supabase = useNuxtApp().$supabase as SupabaseClient
  const authStore = useAuthStore()

  // On retourne maintenant directement l'état partagé.
  // Les fonctions ci-dessous opéreront sur cet état.

  /**
   * Masque le champ is_admin d'un profil si l'utilisateur connecté n'est pas admin
   */
  const sanitizeProfile = (profile: Profile): Profile => {
    // Si l'utilisateur connecté est admin, retourner le profil complet
    if (authStore.profile?.is_admin) {
      return profile
    }

    // Sinon, masquer is_admin
    const { is_admin, ...sanitizedProfile } = profile
    return sanitizedProfile as Profile
  }

  /**
   * Masque le champ is_admin de plusieurs profils si l'utilisateur connecté n'est pas admin
   */
  const sanitizeProfiles = (profiles: Profile[]): Profile[] => {
    return profiles.map(profile => sanitizeProfile(profile))
  }

  /**
   * Récupère un profil public (masque is_admin si pas admin)
   */
  const getPublicProfile = async (userId: string) => {
    try {
      loading.value = true
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'id,first_name,last_name,email,phone,address,city,postal_code,avatar_url,cin_number,cin_issued_date,nif_number,stat_number,is_verified,is_admin,created_at,updated_at'
        )
        .eq('id', userId)
        .single()

      if (error) throw error

      // Masquer is_admin si l'utilisateur n'est pas admin
      return { data: sanitizeProfile(data), error: null }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      return { data: null, error: errorMsg }
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupère tous les profils publics (masque is_admin si pas admin)
   */
  const getAllPublicProfiles = async () => {
    try {
      loading.value = true
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'id,first_name,last_name,email,phone,address,city,postal_code,avatar_url,cin_number,cin_issued_date,nif_number,stat_number,is_verified,is_admin,created_at,updated_at'
        )
        .order('created_at', { ascending: false })

      if (error) throw error

      // Masquer is_admin si l'utilisateur n'est pas admin
      return { data: sanitizeProfiles(data), error: null }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      return { data: null, error: errorMsg }
    } finally {
      loading.value = false
    }
  }

  /**
   * Charge le profil utilisateur depuis Supabase
   */
  const loadUserProfile = async (id: string) => {
    // On se fie uniquement à l'id passé en paramètre, car le store peut ne pas être encore à jour.
    if (!id) {
      console.warn('[useProfile] loadUserProfile a été appelé sans ID.')
      return null
    }

    try {
      loading.value = true
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'id,first_name, last_name,email,phone,address,city,postal_code,avatar_url,cin_number,cin_issued_date,nif_number,stat_number,is_verified,is_admin'
        )
        .eq('id', id)
        .single()

      if (error) {
        // Ne pas jeter une erreur ici, car ça peut bloquer l'app au démarrage.
        // On log l'erreur et on s'assure que le profil est null.
        console.error(`Erreur lors du chargement du profil pour l'ID ${id}:`, error.message)
        authStore.setProfile(null)
        return null
      }

      authStore.setProfile(data)
      return data
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors du chargement du profil: ${errorMsg}`
      authStore.setProfile(null)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Met à jour le profil utilisateur dans Supabase
   */
  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!authStore.user?.id) return false

    try {
      loading.value = true

      // On exclut le champ avatarFile qui n'existe que côté frontend
      const { avatarFile, ...supabaseData } = profileData

      // Nettoyer le CIN si présent (supprimer les espaces)
      if (supabaseData.cin_number) {
        supabaseData.cin_number = cleanCinNumber(supabaseData.cin_number)
      }

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...supabaseData,
          updated_at: new Date().toISOString()
        })
        .eq('id', authStore.user.id)
        .select()

      if (error) {
        throw error
      }

      authStore.setProfile(data[0])
      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de la mise à jour du profil: ${errorMsg}`
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Génère un chemin de fichier unique pour un avatar
   */
  const generateAvatarPath = (file: File, profileId: string) => {
    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `${profileId}_${Date.now()}.${fileExt}`
    return `${profileId}/${fileName}`
  }

  /**
   * Upload un fichier dans le bucket 'avatars'
   * Respecte les règles RLS: seul le propriétaire peut uploader dans son dossier
   */
  const uploadAvatarFile = async (filePath: string, file: File) => {
    // Vérification que le chemin contient bien l'ID de l'utilisateur courant comme premier segment
    const pathSegments = filePath.split('/')
    const userId = authStore.user?.id

    if (pathSegments[0] !== userId) {
      throw new Error(
        "Violation de sécurité: vous ne pouvez pas uploader dans le dossier d'un autre utilisateur"
      )
    }

    // Vérifier d'abord que le bucket existe
    const bucketExists = await checkBucketExists(AVATAR_BUCKET)
    if (!bucketExists) {
      throw new Error(`Le bucket ${AVATAR_BUCKET} n'existe pas ou n'est pas accessible`)
    }

    const { error, data } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, file, {
      upsert: true,
      contentType: file.type
    })

    if (error) {
      console.error("Erreur d'upload:", error)
      // Vérifier le message d'erreur pour détecter un problème d'autorisation
      if (error.message && error.message.includes('permission denied')) {
        throw new Error("Accès refusé: vous n'avez pas les droits pour effectuer cette action")
      }
      throw error
    }

    return data
  }

  /**
   * Configuration du bucket avatars
   * À modifier si le nom du bucket est différent dans Supabase
   */
  const AVATAR_BUCKET = 'avatars'

  /**
   * Vérifie si un bucket existe et est accessible
   */
  const checkBucketExists = async (bucketName: string): Promise<boolean> => {
    try {
      // Tentative de liste pour vérifier l'existence et l'accès
      const { data, error } = await supabase.storage.from(bucketName).list('', { limit: 1 })

      if (error) {
        console.error(`Erreur d'accès au bucket ${bucketName}:`, error)
        return false
      }

      return true
    } catch (error) {
      console.error(`Erreur lors de la vérification du bucket ${bucketName}:`, error)
      return false
    }
  }

  /**
   * Obtient l'URL publique d'un avatar
   */
  const getAvatarPublicUrl = (filePath: string) => {
    // Vérifie qu'on n'a pas déjà une URL complète
    if (filePath.startsWith('http')) {
      return filePath
    }

    const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath)

    if (!data?.publicUrl) {
      console.error(`Impossible de générer l'URL publique pour ${filePath}`)
      throw new Error("Impossible de générer l'URL publique de l'avatar")
    }

    console.log(`URL publique générée: ${data.publicUrl}`)
    return data.publicUrl
  }

  /**
   * Met à jour l'URL de l'avatar dans le profil utilisateur
   */
  const updateProfileAvatar = async (profileId: string, avatarUrl: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', profileId)
      .select(
        'id,first_name,last_name,email,phone,address,city,postal_code,avatar_url,cin_number,cin_issued_date,nif_number,stat_number,is_verified,is_admin,created_at,updated_at'
      )

    if (error) throw error
    if (data?.[0]) authStore.setProfile(data[0])

    return data?.[0] || null
  }

  /**
   * Upload un avatar utilisateur dans Supabase Storage et met à jour le profil
   * @param file Le fichier d'avatar à uploader
   * @param userId L'ID de l'utilisateur (facultatif, utilise l'utilisateur connecté par défaut)
   * @returns L'URL de l'avatar uploadé ou null en cas d'erreur
   */
  const uploadAvatar = async (file: File, userId?: string) => {
    if (!file || !authStore.user?.id) return null
    const profileId = userId || authStore.user.id

    try {
      loading.value = true

      const filePath = generateAvatarPath(file, profileId)
      await uploadAvatarFile(filePath, file)
      const avatarUrl = getAvatarPublicUrl(filePath)
      await updateProfileAvatar(profileId, avatarUrl)

      return avatarUrl
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de l'upload de l'avatar: ${errorMsg}`
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Extrait le chemin du fichier depuis une URL d'avatar
   * @param avatarUrl URL de l'avatar (format complet ou court)
   * @returns Le chemin du fichier ou null si non reconnu
   */
  const extractFilePathFromUrl = (avatarUrl: string): string | null => {
    // Format complet: https://xxxx.supabase.co/storage/v1/object/public/avatars/user-id/file.jpg
    const fullUrlMatch = avatarUrl.match(/\/storage\/v1\/object\/public\/avatars\/(.+)$/)
    if (fullUrlMatch && fullUrlMatch[1]) {
      return decodeURIComponent(fullUrlMatch[1])
    }

    // Format court: /avatars/user-id/file.jpg
    const shortUrlMatch = avatarUrl.match(/\/avatars\/([^?]+)/)
    if (shortUrlMatch && shortUrlMatch[1]) {
      return decodeURIComponent(shortUrlMatch[1])
    }

    return null
  }

  /**
   * Vérifie si l'utilisateur a les droits pour supprimer un avatar
   * @param ownerId ID du propriétaire de l'avatar
   * @param currentUserId ID de l'utilisateur courant
   * @returns true si l'utilisateur a les droits, false sinon
   */
  const canDeleteAvatar = async (ownerId: string, currentUserId: string): Promise<boolean> => {
    // Si l'utilisateur est le propriétaire, autorisation automatique
    if (ownerId === currentUserId) return true

    // Sinon, vérifier si l'utilisateur est admin
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', currentUserId)
        .single()

      if (error) {
        console.error('Erreur lors de la vérification admin:', error)
        return false
      }

      return !!data?.is_admin
    } catch {
      return false
    }
  }

  /**
   * Supprime un avatar utilisateur de Supabase Storage
   * Respecte les règles RLS: seul le propriétaire ou un admin peut supprimer
   * @param avatarUrl L'URL de l'avatar à supprimer
   * @returns true si la suppression est réussie, false sinon
   */
  /**
   * Effectue la suppression physique d'un fichier du bucket
   * @param filePath Chemin du fichier à supprimer
   * @returns true si la suppression est réussie, false sinon
   */
  const performStorageDelete = async (filePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage.from(AVATAR_BUCKET).remove([filePath])

      if (error) {
        if (error.message?.includes('permission denied')) {
          errorMessage.value =
            "Accès refusé: vous n'avez pas les droits pour effectuer cette action"
          return false
        }
        throw error
      }

      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de la suppression de l'avatar: ${errorMsg}`
      console.error('Erreur de suppression:', error)
      return false
    }
  }

  /**
   * Supprime un avatar utilisateur de Supabase Storage
   * Respecte les règles RLS: seul le propriétaire ou un admin peut supprimer
   * @param avatarUrl L'URL de l'avatar à supprimer
   * @returns true si la suppression est réussie, false sinon
   */
  const deleteAvatar = async (avatarUrl?: string): Promise<boolean> => {
    // Vérifications préliminaires
    if (!avatarUrl || !authStore.user?.id) {
      errorMessage.value = "Impossible de supprimer l'avatar: informations manquantes"
      return false
    }

    const userId = authStore.user.id
    loading.value = true

    try {
      // 1. Extraire le chemin du fichier
      const filePath = extractFilePathFromUrl(avatarUrl)
      if (!filePath) {
        errorMessage.value = "Format d'URL non reconnu"
        console.error("Format d'URL non reconnu:", avatarUrl)
        return false
      }

      // 2. Vérifier les autorisations
      const pathSegments = filePath.split('/')
      const ownerId = pathSegments[0]
      const hasPermission = await canDeleteAvatar(ownerId, userId)

      if (!hasPermission) {
        errorMessage.value = "Vous n'avez pas l'autorisation de supprimer cet avatar"
        return false
      }

      // 3. Vérifier que le bucket existe
      const bucketExists = await checkBucketExists(AVATAR_BUCKET)
      if (!bucketExists) {
        errorMessage.value = `Le bucket ${AVATAR_BUCKET} n'existe pas ou n'est pas accessible`
        return false
      }

      // 4. Supprimer le fichier
      return await performStorageDelete(filePath)
    } finally {
      loading.value = false
    }
  }

  /**
   * Met à jour l'avatar de l'utilisateur (upload + mise à jour du profil)
   * @param file Le fichier d'avatar à uploader
   * @param oldAvatarUrl L'URL de l'ancien avatar à supprimer (facultatif)
   */
  const updateAvatar = async (file: File, oldAvatarUrl?: string) => {
    if (!file || !authStore.user?.id) return null

    try {
      // Si un ancien avatar existe, on le supprime d'abord
      if (oldAvatarUrl) {
        await deleteAvatar(oldAvatarUrl)
      }

      // Uploader le nouvel avatar
      return await uploadAvatar(file)
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de la mise à jour de l'avatar: ${errorMsg}`
      return null
    }
  }

  /**
   * Charge les documents de vérification depuis Supabase
   */
  const loadDocuments = async () => {
    if (!authStore.user?.id) return []

    try {
      loading.value = true
      // Utiliser directement authStore.user.id pour être cohérent avec l'insertion
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('profile_id', authStore.user.id)

      if (error) {
        console.error('Erreur lors du chargement des documents:', error)
        throw error
      }

      documents.value = data || []
      return data
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors du chargement des documents: ${errorMsg}`
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Charge les documents d'un utilisateur spécifique (pour les admins)
   * @param userId L'ID de l'utilisateur dont on veut charger les documents
   */
  const loadUserDocuments = async (userId: string) => {
    try {
      loading.value = true
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('profile_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      documents.value = data || []
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors du chargement des documents: ${errorMsg}`
      documents.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupère les informations de base d'un utilisateur spécifique
   * @param userId L'ID de l'utilisateur
   * @returns Les informations de base (nom, prénom, email) ou null en cas d'erreur
   */
  const fetchUserProfile = async (
    userId: string
  ): Promise<{
    first_name: string
    last_name: string
    email: string
  } | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      console.error(`Erreur lors de la récupération du profil utilisateur: ${errorMsg}`)
      return null
    }
  }

  /**
   * Renvoie le nom lisible d'un type de document
   */
  const getDocumentTypeName = (type: string): string => {
    return documentTypes[type as keyof typeof documentTypes] || 'Document inconnu'
  }

  /**
   * Génère un chemin de fichier unique pour un document
   */
  const generateDocumentPath = (userId: string, type: string, file: File): string => {
    const fileExt = file.name.split('.').pop() || 'pdf'
    return `${userId}/${type}_${Date.now()}.${fileExt}`
  }

  /**
   * Upload un fichier dans le bucket 'documents'
   */
  const uploadDocumentFile = async (filePath: string, file: File): Promise<boolean> => {
    try {
      const { error } = await supabase.storage.from('documents').upload(filePath, file)

      if (error) throw error
      return true
    } catch (error) {
      console.error("Erreur lors de l'upload du fichier:", error)
      throw error
    }
  }

  /**
   * Supprime un fichier document du bucket de storage
   */
  const deleteDocumentFile = async (filePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage.from('documents').remove([filePath])

      if (error) {
        console.error('Erreur lors de la suppression du fichier:', error)
        return false
      }
      return true
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error)
      return false
    }
  }

  /**
   * Crée une entrée document dans la base de données
   */
  const createDocumentRecord = async (
    profileId: string,
    type: string,
    filePath: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.from('documents').insert({
        profile_id: profileId,
        type,
        is_verified: false,
        file_path: filePath
      })

      if (error) throw error
      return true
    } catch (error) {
      console.error("Erreur lors de la création de l'entrée document:", error)
      throw error
    }
  }

  /**
   * Trouve et renvoie un document existant du même type pour un utilisateur
   */
  const findExistingDocumentByType = async (
    userId: string,
    documentType: string
  ): Promise<Document | null> => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('profile_id', userId)
        .eq('type', documentType)
        .maybeSingle()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erreur lors de la recherche de document existant:', error)
      return null
    }
  }

  /**
   * Télécharge un document à Supabase Storage et crée l'entrée en base
   * Si un document du même type existe déjà, il est supprimé avant
   */
  const uploadDocument = async (formData: DocumentUploadForm) => {
    // Vérifications de base
    if (!authStore.user?.id) return false
    if (!formData.type || !formData.file) {
      errorMessage.value = 'Veuillez sélectionner un type de document et un fichier'
      return false
    }

    const userId = authStore.user.id
    loading.value = true

    try {
      // 1. Vérifier s'il existe déjà un document du même type
      const existingDoc = await findExistingDocumentByType(userId, formData.type)

      // Si un document existe, supprimer le fichier et l'entrée
      if (existingDoc) {
        console.log('Document existant trouvé, suppression en cours...', existingDoc.file_path)

        // Supprimer l'ancien fichier du storage
        await deleteDocumentFile(existingDoc.file_path)

        // Supprimer l'ancienne entrée de la base de données
        await supabase.from('documents').delete().eq('id', existingDoc.id)
      }

      // 2. Générer le chemin du nouveau fichier
      const filePath = generateDocumentPath(userId, formData.type, formData.file)

      // 3. Uploader le nouveau fichier
      await uploadDocumentFile(filePath, formData.file)

      // 4. Créer la nouvelle entrée en base de données
      await createDocumentRecord(userId, formData.type, filePath)

      // 5. Recharger explicitement les documents
      await loadDocuments()
      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de l'upload du document: ${errorMsg}`
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Visualise un document (URL signée Supabase Storage)
   */
  const viewDocument = async (documentId: string, filePath: string) => {
    try {
      const { data, error } = await supabase.storage.from('documents').createSignedUrl(filePath, 60)

      if (error) {
        throw error
      }

      // Ouvrir dans un nouvel onglet
      window.open(data.signedUrl, '_blank')
      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de l'ouverture du document: ${errorMsg}`
      return false
    }
  }

  /**
   * Supprime un document (base de données et fichier dans le storage)
   */
  const deleteDocument = async (documentId: string, filePath: string) => {
    if (!authStore.user?.id) return false

    try {
      loading.value = true

      // 1. Supprimer le fichier dans le storage
      const { error: storageError } = await supabase.storage.from('documents').remove([filePath])

      if (storageError) {
        throw storageError
      }

      // 2. Supprimer l'entrée dans la base de données
      const { error: dbError } = await supabase.from('documents').delete().eq('id', documentId)

      if (dbError) {
        throw dbError
      }

      await loadDocuments()
      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de la suppression du document: ${errorMsg}`
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Met à jour le statut de vérification d'un document (utile pour les admins)
   */
  const updateDocumentStatus = async (documentId: string, isVerified: boolean) => {
    try {
      loading.value = true

      const { error } = await supabase
        .from('documents')
        .update({ is_verified: isVerified, updated_at: new Date().toISOString() })
        .eq('id', documentId)

      if (error) {
        throw error
      }

      // Rafraîchir la liste des documents
      await loadDocuments()
      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de la mise à jour du document: ${errorMsg}`
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Vérifie si l'utilisateur a tous les documents obligatoires pour louer un véhicule
   */
  const hasRequiredDocuments = (): boolean => {
    if (!authStore.profile) return false

    // Récupérer les documents depuis le store (déjà chargés)
    const userDocuments = documents.value || []

    // Types de documents requis
    const requiredTypes = Object.keys(documentTypes)

    // Vérifier que chaque type requis existe dans les documents de l'utilisateur
    return requiredTypes.every(requiredType => userDocuments.some(doc => doc.type === requiredType))
  }

  /**
   * Retourne la liste des documents manquants
   */
  const getMissingDocuments = (): string[] => {
    if (!authStore.profile) return Object.values(documentTypes)

    const userDocuments = documents.value || []
    const requiredTypes = Object.keys(documentTypes)

    return requiredTypes
      .filter(requiredType => !userDocuments.some(doc => doc.type === requiredType))
      .map(type => documentTypes[type as keyof typeof documentTypes])
  }

  /**
   * Vérifie et active un profil utilisateur (action réservée aux admins)
   */
  const verifyUserProfile = async (userId: string) => {
    // Sécurité : Vérifier si l'utilisateur connecté est bien un admin
    if (!authStore.profile?.is_admin) {
      errorMessage.value =
        'Action non autorisée. Seuls les administrateurs peuvent vérifier un profil.'
      return false
    }

    try {
      loading.value = true

      // Récupérer les informations de l'utilisateur à vérifier
      const userData = await fetchUserProfile(userId)

      // Appel de la nouvelle fonction RPC qui gère la transaction
      const { error } = await supabase.rpc('verify_user_and_documents', {
        p_user_id: userId
      })

      if (error) throw error

      // Mettre à jour localement l'état des documents si nécessaire
      documents.value = documents.value.map(doc => ({ ...doc, is_verified: true }))

      // Envoyer un email de confirmation à l'utilisateur
      if (userData) {
        try {
          await $fetch('/api/profile/send-verification-notification', {
            method: 'POST',
            body: {
              eventType: 'profile_verified',
              userData
            }
          })
          console.log('Email de vérification envoyé avec succès')
        } catch (emailError) {
          console.error("Erreur lors de l'envoi de l'email de vérification:", emailError)
          // Ne pas faire échouer l'opération principale si l'email échoue
        }
      }

      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de la vérification du profil: ${errorMsg}`
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Annule la vérification d'un profil utilisateur (action réservée aux admins)
   * @param userId L'ID de l'utilisateur dont on veut annuler la vérification
   */
  const unverifyUserProfile = async (userId: string) => {
    if (!authStore.profile?.is_admin) {
      errorMessage.value = 'Action non autorisée.'
      return false
    }
    try {
      loading.value = true

      // Récupérer les informations de l'utilisateur à déverifier
      const userData = await fetchUserProfile(userId)

      const { error } = await supabase
        .from('profiles')
        .update({
          is_verified: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) throw error

      // Envoyer un email de notification à l'utilisateur
      if (userData) {
        try {
          await $fetch('/api/profile/send-verification-notification', {
            method: 'POST',
            body: {
              eventType: 'profile_unverified',
              userData
            }
          })
          console.log('Email de déverification envoyé avec succès')
        } catch (emailError) {
          console.error("Erreur lors de l'envoi de l'email de déverification:", emailError)
          // Ne pas faire échouer l'opération principale si l'email échoue
        }
      }

      return true
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue'
      errorMessage.value = `Erreur lors de l'annulation de la vérification: ${errorMsg}`
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    // État (maintenant partagé)
    loading,
    errorMessage,
    documents,
    documentTypes,
    missingDocumentTypes,

    // Fonctions de base
    loadUserProfile,
    updateProfile,
    // Fonctions publiques (avec masquage is_admin)
    getPublicProfile,
    getAllPublicProfiles,
    sanitizeProfile,
    sanitizeProfiles,
    // Gestion avatar
    uploadAvatarFile,
    getAvatarPublicUrl,
    updateProfileAvatar,
    uploadAvatar,
    deleteAvatar,
    updateAvatar,
    // Gestion documents
    loadDocuments,
    loadUserDocuments,
    fetchUserProfile,
    uploadDocument,
    viewDocument,
    getDocumentTypeName,
    deleteDocument,
    updateDocumentStatus,
    hasRequiredDocuments,
    getMissingDocuments,
    verifyUserProfile,
    unverifyUserProfile
  }
}
