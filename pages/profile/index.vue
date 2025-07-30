<template>
  <div>
    <!-- Toast pour les notifications utilisateur -->
    <UiToast
      :visible="toastVisible"
      :message="toastMessage"
      :type="toastType"
      @close="toastVisible = false"
    />

    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Mon profil</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Carte de profil avec upload photo intégré -->
        <ProfileCard
          :first-name="profile?.first_name"
          :last-name="profile?.last_name"
          :email="email"
          :is-verified="profile?.is_verified"
          :profile-image-url="profile?.avatar_url"
          :is-editing="isEditing"
          @edit="isEditing = true"
          @update:image="handleAvatarChange"
        />

        <!-- Informations du profil / Formulaire de modification -->
        <div class="lg:col-span-2">
          <ProfileForm
            :profile="profile"
            :model-value="profileForm"
            :is-editing="isEditing"
            :loading="loading"
            :email="email"
            @update:model-value="profileForm = $event"
            @save="handleUpdateProfile"
            @cancel="cancelEdit"
            @file-change="handleFileChange"
          />

          <!-- Documents de vérification -->
          <ProfileDocuments
            :is-profile-complete="isProfileComplete"
            :documents="documents"
            :document-types="documentTypes"
            @show-upload-modal="showUploadModal = true"
            @view-document="handleViewDocument"
            @delete-success="message => showToast(message, 'success')"
            @delete-error="message => showToast(message, 'error')"
          />
        </div>
      </div>
    </div>

    <!-- Modal pour l'upload de documents -->
    <ProfileDocumentUploadModal
      :visible="showUploadModal"
      :loading="loading"
      @upload-success="handleUploadDocuments"
      @close="showUploadModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Profile } from '~/types'
  import { useAuthStore } from '~/stores/auth'
  import useProfile from '~/composables/useProfile'

  definePageMeta({
    middleware: ['auth']
  })

  // --- État UI ---
  const isEditing = ref(false)
  const showUploadModal = ref(false)

  // --- Toast ---
  const toastVisible = ref(false)
  const toastType = ref<'info' | 'success' | 'warning' | 'error'>('info')
  const toastMessage = ref('')

  // --- Store et composables ---
  const authStore = useAuthStore()
  const {
    loading,
    documentTypes,
    errorMessage,
    documents,
    missingDocumentTypes,
    updateProfile,
    updateAvatar,
    loadDocuments,
    uploadDocument,
    viewDocument
  } = useProfile()

  // --- Données ---
  const email = computed(() => authStore.user?.email || '')
  const profile = computed(() => authStore.profile)
  const profileForm = ref<Partial<Profile>>({})

  // --- Validation ---
  const isProfileComplete = computed(() => {
    if (!profile.value) return false
    const requiredFields: (keyof Profile)[] = [
      'first_name',
      'last_name',
      'phone',
      'address',
      'postal_code',
      'phone',
      'cin_number',
      'nif_number',
      'stat_number'
    ]
    return requiredFields.every(field => {
      const value = profile.value?.[field]
      return value !== null && value !== undefined && String(value).trim() !== ''
    })
  })

  // --- Initialisation ---
  onMounted(async () => {
    await loadDocuments()
    resetProfileForm()
  })

  // Fonctions
  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    toastMessage.value = message
    toastType.value = type
    toastVisible.value = true
    setTimeout(() => {
      toastVisible.value = false
    }, 5000)
  }

  const resetProfileForm = () => {
    if (profile.value) profileForm.value = { ...profile.value }
  }

  const cancelEdit = () => {
    isEditing.value = false
    resetProfileForm()
  }

  const handleUpdateProfile = async () => {
    if (!profileForm.value) return

    // Afficher les données du formulaire pour vérification
    console.log('Données du formulaire à envoyer:', profileForm.value)

    try {
      // Envoyer les données à Supabase
      const success = await updateProfile(profileForm.value)
      console.log('Résultat de la mise à jour:', success)

      if (success) {
        isEditing.value = false
        showToast('Profil mis à jour avec succès', 'success')
      } else {
        console.error('Erreur de mise à jour:', errorMessage.value)
        showToast(errorMessage.value || 'Erreur lors de la mise à jour du profil', 'error')
      }
    } catch (error) {
      console.error('Exception lors de la mise à jour du profil:', {
        cause: error
      })
      showToast('Erreur lors de la mise à jour du profil', 'error')
    }
  }

  const handleAvatarChange = async (file: File) => {
    if (!file) return

    try {
      const oldAvatarUrl = authStore.profile?.avatar_url

      // Utiliser la fonction updateAvatar du composable useProfile
      const newAvatarUrl = await updateAvatar(file, oldAvatarUrl)

      if (newAvatarUrl && profileForm.value) {
        // Mise à jour du formulaire avec la nouvelle URL et le fichier
        profileForm.value.avatarFile = file
        profileForm.value.avatar_url = newAvatarUrl

        // Afficher un toast de succès
        showToast('Avatar mis à jour avec succès', 'success')
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar:", error)
      showToast("Erreur lors de la mise à jour de l'avatar", 'error')
    }

    if (!isEditing.value) {
      isEditing.value = true
      showToast('Cliquez sur "Enregistrer" pour valider votre nouvelle photo de profil', 'info')
    }
  }

  // eslint-disable-next-line max-lines-per-function, complexity
  const handleUploadDocuments = async (filesToUpload: Record<string, File>) => {
    if (Object.keys(filesToUpload).length === 0) {
      showToast('Veuillez sélectionner au moins un fichier', 'warning')
      return
    }

    let successCount = 0
    const totalFiles = Object.keys(filesToUpload).length

    for (const docType in filesToUpload) {
      const file = filesToUpload[docType]
      try {
        const success = await uploadDocument({ type: docType, file })
        if (success) {
          successCount++
        } else {
          showToast(`Erreur lors de l'envoi du document ${docType}`, 'error')
        }
      } catch (error) {
        console.error(`Erreur lors de l'envoi du document ${docType}:`, error)
        showToast(`Erreur critique lors de l'envoi du document ${docType}`, 'error')
      }
    }
    showUploadModal.value = false

    if (missingDocumentTypes.value.length === 0) {
      const userData = {
        first_name: profile.value?.first_name || '',
        last_name: profile.value?.last_name || '',
        email: authStore.user?.email || ''
      }

      await sendDocumentsSubmittedNotification(userData)
      showToast('Documents uploadés et notification envoyée avec succès', 'success')

      showUploadModal.value = false
      if (successCount > 0) {
        showToast(`${successCount}/${totalFiles} document(s) envoyé(s) avec succès`, 'success')
      }
    }

    if (successCount > 0) {
      showToast(`${successCount}/${totalFiles} document(s) envoyé(s) avec succès`, 'success')
    }
  }

  const handleViewDocument = (id: string, path: string) => {
    if (!id || !path) return
    viewDocument(id, path)
  }

  // Pour la compatibilité avec ProfileForm (à supprimer plus tard)
  const handleFileChange = () => {}
</script>
