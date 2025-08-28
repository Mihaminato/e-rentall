<template>
  <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <!-- Toast pour les notifications utilisateur -->
      <UiToast
        class="my-6"
        :visible="toastVisible"
        :message="toastMessage"
        :type="toastType"
        @close="toastVisible = false"
      />

      <!-- Bouton de fermeture en haut à droite -->

      <div class="flex justify-between items-center my-6">
        <h3 class="font-bold text-2xl text-center text-primary">
          {{ vehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule' }}
        </h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="$emit('close')">
          <Icon name="mdi:close" size="24" />
        </button>
      </div>

      <!-- Message informatif pour les véhicules actifs -->
      <div v-if="isActiveVehicle" class="alert alert-info mb-6">
        <Icon name="mdi:information" class="w-5 h-5" />
        <div>
          <h4 class="font-semibold">Véhicule actif</h4>
          <p class="text-sm">
            Ce véhicule est actuellement actif. Pour ne pas affecter les réservations en cours, seuls le lieu et la description peuvent être modifiés.
            <br />
            Pour désactiver le véhicule, veuillez contacter l'administrateur.
          </p>
        </div>
      </div>

      <!-- Formulaire de véhicule -->
      <form class="space-y-6" @submit.prevent="saveVehicle">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <!-- Marque -->
          <UiFormInput
            v-model="form.make"
            label="Marque"
            placeholder="Ex: Toyota"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.make.$error ? unref(v$.make.$errors[0].$message) : null"
            @blur="v$.make.$touch()"
          />

          <!-- Modèle -->
          <UiFormInput
            v-model="form.model"
            label="Modèle"
            placeholder="Ex: Corolla"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.model.$error ? unref(v$.model.$errors[0].$message) : null"
            @blur="v$.model.$touch()"
          />

          <!-- Numéro d'immatriculation -->
          <UiFormInput
            v-model="form.license_plate"
            label="N° d'immatriculation"
            placeholder="Ex: 1234 ABC"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.license_plate?.$error ? unref(v$.license_plate.$errors[0].$message) : null"
            @blur="v$.license_plate?.$touch()"
          />

          <!-- Année -->
          <UiFormInput
            v-model="yearModel"
            label="Année"
            type="number"
            placeholder="Ex: 2022"
            :min="1900"
            :max="new Date().getFullYear() + 1"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.year.$error ? unref(v$.year.$errors[0].$message) : null"
            @blur="v$.year.$touch()"
          />

          <!-- Type de véhicule -->
          <UiFormSelect
            v-model="form.vehicle_type"
            label="Type de véhicule"
            :options="VEHICLE_TYPE_OPTIONS"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.vehicle_type.$error ? unref(v$.vehicle_type.$errors[0].$message) : null"
            @blur="v$.vehicle_type.$touch()"
          />

          <!-- Transmission -->
          <UiFormSelect
            v-model="form.transmission"
            label="Transmission"
            :options="TRANSMISSION_OPTIONS"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.transmission.$error ? unref(v$.transmission.$errors[0].$message) : null"
            @blur="v$.transmission.$touch()"
          />

          <!-- Type de carburant -->
          <UiFormSelect
            v-model="form.fuel_type"
            label="Type de carburant"
            :options="FUEL_TYPE_OPTIONS"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.fuel_type.$error ? unref(v$.fuel_type.$errors[0].$message) : null"
            @blur="v$.fuel_type.$touch()"
          />

          <!-- Nombre de places -->
          <UiFormInput
            v-model="seatsModel"
            label="Nombre de places"
            type="number"
            placeholder="Ex: 5"
            :min="1"
            :max="50"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.seats.$error ? unref(v$.seats.$errors[0].$message) : null"
            @blur="v$.seats.$touch()"
          />

          <!-- Consommation -->
          <UiFormInput
            v-model="consumptionModel"
            label="Consommation (L/100)"
            type="number"
            placeholder="Ex: 7"
            :min="0"
            :max="100"
            :required="true"
            :disabled="isActiveVehicle"
            :error="v$.consumption.$error ? unref(v$.consumption.$errors[0].$message) : null"
            @blur="v$.consumption.$touch()"
          />

          <!-- Prix par jour -->
          <UiFormField
            label="Prix par jour"
            :required="true"
            :error="v$.price_per_day.$error ? unref(v$.price_per_day.$errors[0].$message) : null"
          >
            <div class="relative">
              <input
                v-model.number="form.price_per_day"
                type="number"
                min="0"
                step="1000"
                class="input input-bordered w-full flex items-center gap-2 focus-within:outline-none focus-within:border-primary pr-12"
                :class="{ 'input-error': v$.price_per_day.$error }"
                :disabled="isActiveVehicle"
                placeholder="Ex: 50000"
                @blur="v$.price_per_day.$touch()"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">Ar</span>
            </div>
          </UiFormField>

          <!-- Lieux -->
          <UiFormField
            label="Lieux"
            :required="true"
            :error="v$.province.$error ? unref(v$.province.$errors[0].$message) : null"
            class="md:col-span-2"
          >
            <div class="relative flex items-center">
              <Icon
                name="mdi:map-marker-radius"
                class="absolute left-3 text-gray-400 h-5 w-5 z-10"
              />
              <select
                v-model="form.province"
                class="select select-bordered w-full focus-within:outline-none focus-within:border-primary pl-10"
                :class="{ 'select-error': v$.province.$error }"
                @blur="v$.province.$touch()"
              >
                <option value="" disabled selected>Lieu</option>
                <option v-for="option in CITY_OPTIONS" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </UiFormField>

          <!-- Description -->
          <UiFormField label="Description" class="md:col-span-2">
            <p class="text-sm text-base-content/70 mt-1">Décrivez votre véhicule (état, options, etc.) et votre conditions de location (charge du chauffeur, condition de route adaptée, ...)</p>
            <div>
              <textarea
                v-model="form.description"
                class="textarea textarea-bordered w-full focus-within:outline-none focus-within:border-primary h-32"
                placeholder="Décrivez votre véhicule (état, options, etc.) et votre conditions de location (charge du chauffeur, condition de route adaptée, ...)"                
                :disabled="isActiveVehicle"
                style="resize: none; border-radius: 0.5rem; transition: all 0.2s ease-in-out"
              ></textarea>
            </div>
          </UiFormField>
        </div>

        <!-- Section Documents - cachée pour les véhicules actifs -->
        <div>
          <div class="divider">Documents du Véhicule</div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"></div>
          <!-- Document : Carte Grise -->
          <UiFormField
            label="Carte Grise"
            :required="!vehicle"
            :error="
              v$.vehicleRegistrationFile.$error
                ? unref(v$.vehicleRegistrationFile.$errors[0].$message)
                : null
            "
          >
            <div v-if="!isActiveVehicle" class="flex items-center gap-2">
              <input
                ref="vehicleRegistrationInput"
                type="file"
                class="file-input file-input-bordered w-full"
                accept="application/pdf,image/jpeg,image/png"
                @change="e => handleFileChange(e, 'vehicleRegistrationFile')"
              />
              <button
                v-if="form.vehicleRegistrationFile"
                type="button"
                class="btn btn-sm btn-ghost btn-circle"
                @click="clearFile('vehicleRegistrationFile')"
              >
                <Icon name="mdi:close" />
              </button>
            </div>
            <div
              v-if="existingDocs.vehicle_registration && !form.vehicleRegistrationFile"
              class="text-xs text-gray-500 mt-1 p-2 bg-gray-50 rounded-md flex justify-between items-center"
            >
              <a
                :href="getDocumentPublicUrl(existingDocs.vehicle_registration.file_path)"
                target="_blank"
                class="link link-hover text-primary font-medium truncate pr-2"
                :title="existingDocs.vehicle_registration.file_path.split('/').pop()"
              >
                <Icon name="mdi:check-decagram" class="text-success mr-1" />
                {{ existingDocs.vehicle_registration.file_path.split('/').pop() }}
              </a>
              <button
                v-if="!isActiveVehicle"
                type="button"
                class="btn btn-xs btn-error"
                @click="deleteExistingDocument('vehicle_registration')"
              >
                <Icon name="mdi:delete-forever" />
              </button>
            </div>
          </UiFormField>
          <!-- Document : Visite Technique -->
          <UiFormField
            label="Visite Technique"
            :required="!vehicle"
            :error="
              v$.technicalInspectionFile.$error
                ? unref(v$.technicalInspectionFile.$errors[0].$message)
                : null
            "
          >
            <div v-if="!isActiveVehicle" class="flex items-center gap-2">
              <input
                ref="technicalInspectionInput"
                type="file"
                class="file-input file-input-bordered w-full"
                accept="application/pdf,image/jpeg,image/png"
                @change="e => handleFileChange(e, 'technicalInspectionFile')"
              />
              <button
                v-if="form.technicalInspectionFile"
                type="button"
                class="btn btn-sm btn-ghost btn-circle"
                @click="clearFile('technicalInspectionFile')"
              >
                <Icon name="mdi:close" />
              </button>
            </div>
            <div
              v-if="existingDocs.technical_inspection && !form.technicalInspectionFile"
              class="text-xs text-gray-500 mt-1 p-2 bg-gray-50 rounded-md flex justify-between items-center"
            >
              <a
                :href="getDocumentPublicUrl(existingDocs.technical_inspection.file_path)"
                target="_blank"
                class="link link-hover text-primary font-medium truncate pr-2"
                :title="existingDocs.technical_inspection.file_path.split('/').pop()"
              >
                <Icon name="mdi:check-decagram" class="text-success mr-1" />
                {{ existingDocs.technical_inspection.file_path.split('/').pop() }}
              </a>
              <button
                v-if="!isActiveVehicle"
                type="button"
                class="btn btn-xs btn-error"
                @click="deleteExistingDocument('technical_inspection')"
              >
                <Icon name="mdi:delete-forever" />
              </button>
            </div>
          </UiFormField>
        </div>

        <!-- Section Photos - cachée pour les véhicules actifs -->
        <div>
          <!-- Téléchargement de photos -->
          <div class="divider">Photos du Véhicule</div>
          <UiImageDropzone
            v-if="!isActiveVehicle"
            label="Photos (jusqu'à 6 images)"
            :disabled="previews.length >= 6"
            :max-file-size="1024 * 1024"
            :helper-text="`JPG ou PNG, max 1 Mo par image (${previews.length}/6)`"
            @files-selected="handlePhotoChange"
            @dragging-change="isDragging = $event"
          />

          <!-- Photos sélectionnées -->
          <div v-if="previews.length > 0" class="md:col-span-2">
            <VehiclesPhotoPreview
              :photos="previews"
              :max-photos="6"
              :disabled="isActiveVehicle"
              @remove="removePhoto"
            />
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-6">
          <button
            type="button"
            class="btn btn-outline flex items-center gap-2"
            :disabled="isLoading"
            @click="$emit('close')"
          >
            <Icon name="mdi:close-circle-outline" class="w-5 h-5" />
            Annuler
          </button>
          <button :disabled="isLoading || v$.$invalid" type="submit" class="btn btn-primary flex-1">
            <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
            {{ vehicle ? 'Enregistrer les modifications' : 'Ajouter le véhicule' }}
          </button>
        </div>
      </form>
    </div>
  </dialog>
  <UiConfirmationModal
    :visible="isConfirmModalVisible"
    title="Confirmer la suppression"
    :message="`Êtes-vous sûr de vouloir supprimer définitivement ce document ? Cette action est irréversible.`"
    confirm-text="Supprimer"
    :loading="isDeleting"
    @confirm="executeDeleteDocument"
    @cancel="isConfirmModalVisible = false"
  />
  <!-- Modal de confirmation pour la suppression de document -->
</template>

<script setup lang="ts">
  import { useVuelidate } from '@vuelidate/core'
  import { required, minValue, maxValue, helpers } from '@vuelidate/validators'
  import type { PhotoPreview, Vehicle, VehicleForm } from '~/types'
  import {
    VEHICLE_TYPE_OPTIONS,
    TRANSMISSION_OPTIONS,
    FUEL_TYPE_OPTIONS,
    CITY_OPTIONS
  } from '~/types'
  import type { SupabaseClient } from '@supabase/supabase-js'
  // Props
  const props = defineProps<{
    vehicle?: Vehicle | null
    modalId: string
  }>()

  // Emits
  const emit = defineEmits(['close', 'saved'])

  // Composables
  const {
    isLoading,
    addVehicle,
    updateVehicle,
    updateVehicleLocation,
    addVehiclePhoto,
    deleteVehiclePhoto,
    fetchVehicleDocuments,
    deleteVehicleDocument
  } = useVehicles()
  const authStore = useAuthStore()
  const supabase = useNuxtApp().$supabase as SupabaseClient

  // États pour les notifications Toast
  const toastVisible = ref(false)
  const toastMessage = ref('')
  const toastType = ref<'info' | 'success' | 'warning' | 'error'>('info')
  const isDragging = ref(false)
  const previews = ref<PhotoPreview[]>([])
  const vehicleRegistrationInput = ref<HTMLInputElement | null>(null)
  const technicalInspectionInput = ref<HTMLInputElement | null>(null)
  const isConfirmModalVisible = ref(false)
  const isDeleting = ref(false)
  const docToDelete = ref<'vehicle_registration' | 'technical_inspection' | null>(null)

  // Valeurs par défaut du formulaire
  const defaultFormValues: VehicleForm = {
    make: '',
    model: '',
    year: null,
    vehicle_type: '',
    transmission: '',
    fuel_type: '',
    seats: null,
    consumption: null,
    price_per_day: null,
    description: '',
    license_plate: '',
    province: 'Antananarivo',
    photos: [],
    vehicleRegistrationFile: null,
    technicalInspectionFile: null
  }

  const form = reactive<VehicleForm>({ ...defaultFormValues })

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    Object.assign(form, defaultFormValues)
    previews.value = []
    existingDocs.vehicle_registration = null
    existingDocs.technical_inspection = null
    v$.value.$reset()
  }

  const existingDocs = reactive<{
    vehicle_registration: { id: string; file_path: string } | null
    technical_inspection: { id: string; file_path: string } | null
  }>({
    vehicle_registration: null,
    technical_inspection: null
  })

  // Règles de validation
  const rules = computed(() => ({
    make: { required: helpers.withMessage('La marque est obligatoire', required) },
    model: { required: helpers.withMessage('Le modèle est obligatoire', required) },
    license_plate: {
      required: helpers.withMessage("Le numéro d'immatriculation est obligatoire", required)
    },
    year: {
      required: helpers.withMessage("L'année est obligatoire", required),
      minValue: helpers.withMessage("L'année doit être supérieure à 1900", minValue(1900)),
      maxValue: helpers.withMessage(
        "L'année ne peut pas être dans le futur",
        maxValue(new Date().getFullYear() + 1)
      )
    },
    vehicle_type: {
      required: helpers.withMessage('Le type de véhicule est obligatoire', required)
    },
    transmission: { required: helpers.withMessage('La transmission est obligatoire', required) },
    fuel_type: { required: helpers.withMessage('Le type de carburant est obligatoire', required) },
    seats: {
      required: helpers.withMessage('Le nombre de places est obligatoire', required),
      minValue: helpers.withMessage('Il doit y avoir au moins 1 place', minValue(1))
    },
    consumption: {
      required: helpers.withMessage('La consommation est obligatoire', required),
      minValue: helpers.withMessage('La consommation ne peut pas être négative', minValue(0))
    },
    price_per_day: {
      required: helpers.withMessage('Le prix par jour est obligatoire', required),
      minValue: helpers.withMessage('Le prix doit être positif', minValue(0))
    },
    province: { required: helpers.withMessage('La province est obligatoire', required) },
    vehicleRegistrationFile: {
      required: helpers.withMessage(
        'La carte grise est obligatoire pour un nouveau véhicule',
        (value: File | null) => !!props.vehicle || value !== null
      )
    },
    technicalInspectionFile: {
      required: helpers.withMessage(
        'La visite technique est obligatoire pour un nouveau véhicule',
        (value: File | null) => !!props.vehicle || value !== null
      )
    }
  }))

  const v$ = useVuelidate(rules, form)

  const yearModel = computed({
    get: () => form.year ?? '',
    set: val => {
      form.year = val === '' || val === null ? null : Number(val)
    }
  })

  const seatsModel = computed({
    get: () => form.seats ?? '',
    set: val => {
      form.seats = val === '' || val === null ? null : Number(val)
    }
  })

  const consumptionModel = computed({
    get: () => form.consumption ?? '',
    set: val => {
      form.consumption = val === '' || val === null ? null : Number(val)
    }
  })

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    toastMessage.value = message
    toastType.value = type
    toastVisible.value = true
    setTimeout(() => {
      toastVisible.value = false
    }, 5000)
  }

  // Gestion des fichiers de documents
  const handleFileChange = (
    event: Event,
    field: 'vehicleRegistrationFile' | 'technicalInspectionFile'
  ) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      form[field] = target.files[0]
    }
  }

  const clearFile = (field: 'vehicleRegistrationFile' | 'technicalInspectionFile') => {
    form[field] = null
    if (field === 'vehicleRegistrationFile' && vehicleRegistrationInput.value) {
      vehicleRegistrationInput.value.value = ''
    }
    if (field === 'technicalInspectionFile' && technicalInspectionInput.value) {
      technicalInspectionInput.value.value = ''
    }
  }

  const getDocumentPublicUrl = (filePath: string) => {
    if (!filePath) return '#'
    return supabase.storage.from('documents').getPublicUrl(filePath).data.publicUrl
  }

  const deleteExistingDocument = (docType: 'vehicle_registration' | 'technical_inspection') => {
    docToDelete.value = docType
    isConfirmModalVisible.value = true
  }

  const executeDeleteDocument = async () => {
    if (!docToDelete.value) return

    const docType = docToDelete.value
    const doc = existingDocs[docType]

    if (!doc) {
      showToast('Aucun document à supprimer.', 'warning')
      isConfirmModalVisible.value = false
      return
    }

    isDeleting.value = true
    const { error } = await deleteVehicleDocument(doc.id)
    isDeleting.value = false
    isConfirmModalVisible.value = false

    if (error) {
      showToast(`Erreur lors de la suppression du document: ${error.message}`, 'error')
    } else {
      showToast('Document supprimé avec succès.', 'success')
      existingDocs[docType] = null
    }
    docToDelete.value = null
  }

  // Gestion des photos
  const handlePhotoChange = (files: File[]) => {
    if (!files || files.length === 0) return
    processFiles(files)
  }

  // Traiter les fichiers (déjà validés par UiImageDropzone)
  const processFiles = (files: File[]) => {
    const remainingSlots = 6 - previews.value.length
    if (remainingSlots <= 0) return

    const filesToProcess = files.slice(0, remainingSlots)

    filesToProcess.forEach(file => {
      form.photos.push(file)

      const reader = new FileReader()
      reader.onload = e => {
        if (e.target?.result) {
          const newPreview: PhotoPreview = {
            url: e.target.result as string,
            file,
            isExisting: false
          }
          previews.value.push(newPreview)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Supprimer une photo sélectionnée
  const removePhoto = async (index: number) => {
    const photoToRemove = previews.value[index]

    // Si c'est une nouvelle photo (pas encore uploadée), on la retire simplement
    if (!photoToRemove.isExisting || !photoToRemove.id) {
      const fileIndex = form.photos.findIndex(file => file === photoToRemove.file)
      if (fileIndex !== -1) {
        form.photos.splice(fileIndex, 1)
      }
      previews.value.splice(index, 1)
      return
    }

    // Si c'est une photo existante, on la supprime de la BDD et du stockage
    isLoading.value = true
    const { success, error } = await deleteVehiclePhoto(photoToRemove.id)
    isLoading.value = false

    if (success) {
      showToast('Photo supprimée avec succès', 'success')
      previews.value.splice(index, 1) // Supprimer de la liste des prévisualisations
    } else {
      showToast(error || 'Erreur lors de la suppression de la photo', 'error')
    }
  }

  // Uploader les photos du véhicule
  const uploadVehiclePhotos = async (vehicleId: string): Promise<boolean> => {
    if (form.photos.length === 0) return true

    let successCount = 0
    const totalPhotos = form.photos.length
    isLoading.value = true

    try {
      // Traiter chaque photo
      for (let i = 0; i < form.photos.length; i++) {
        const file = form.photos[i]

        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop() || 'jpg'
        const fileName = `${Date.now()}_${i}.${fileExt}`
        const filePath = `${vehicleId}/${fileName}`

        console.log(`Tentative d'upload de la photo ${i + 1}/${totalPhotos} : ${fileName}`)

        // Uploader la photo avec Supabase Storage
        const { error: uploadError } = await supabase.storage.from('cars').upload(filePath, file)

        if (uploadError) {
          console.error(`Erreur upload photo ${i + 1}/${totalPhotos}:`, uploadError)
          continue // On continue avec les autres photos même si une échoue
        }

        console.log(`Photo ${i + 1}/${totalPhotos} uploadée avec succès. Ajout à la BDD...`)

        // Définir la première photo comme principale
        const isPrimary = i === 0

        // Ajouter la référence à la photo dans la BDD - VERIFICATION AJOUTÉE
        const photoResult = await addVehiclePhoto(vehicleId, filePath, isPrimary)

        // Vérifier si l'ajout a réussi, sinon loguer l'erreur
        if (!photoResult.success) {
          console.error(
            `Erreur lors de l'ajout de la photo ${i + 1}/${totalPhotos} dans la BDD:`,
            photoResult.error
          )
        } else {
          console.log(`Photo ${i + 1}/${totalPhotos} ajoutée à la BDD avec succès`)
          successCount++
        }
      }

      console.log(`Upload terminé: ${successCount}/${totalPhotos} photos traitées avec succès`)
      isLoading.value = false
      return successCount > 0 // L'opération est considérée comme réussie si au moins une photo a été uploadée
    } catch (error) {
      console.error("Erreur lors de l'upload des photos:", error)
      isLoading.value = false
      return false
    }
  }

  // Remplir le formulaire si un véhicule est passé en props (mode édition)
  watch(
    () => props.vehicle,
    async newVehicle => {
      if (newVehicle) {
        // Mode édition : remplir le formulaire avec les données du véhicule
        form.make = newVehicle.make
        form.model = newVehicle.model
        form.year = newVehicle.year
        form.vehicle_type = newVehicle.vehicle_type
        form.transmission = newVehicle.transmission
        form.fuel_type = newVehicle.fuel_type
        form.seats = newVehicle.seats
        form.consumption = newVehicle.consumption
        form.price_per_day = newVehicle.price_per_day
        form.description = newVehicle.description
        form.license_plate = newVehicle.license_plate
        form.province = newVehicle.province

        // Charger les photos existantes pour l'aperçu
        if (newVehicle.vehicle_photos && newVehicle.vehicle_photos.length > 0) {
          previews.value = newVehicle.vehicle_photos.map(photo => {
            // Créer une URL complète pour l'image si ce n'est pas déjà le cas
            const photoUrl = photo.file_path.startsWith('http')
              ? photo.file_path
              : supabase.storage.from('cars').getPublicUrl(photo.file_path).data.publicUrl

            return {
              id: photo.id,
              url: photoUrl,
              isExisting: true,
              file: undefined, // Pas de fichier pour les photos existantes, utiliser undefined
              path: photo.file_path // Garder le chemin pour la suppression
            }
          })
        } else {
          previews.value = [] // S'assurer que les aperçus sont vides si pas de photos
        }

        // Charger les documents existants
        const { data: docs } = await fetchVehicleDocuments(newVehicle.id)
        if (docs) {
          const regDoc = docs.find(d => d.type === 'vehicle_registration')
          const techDoc = docs.find(d => d.type === 'technical_inspection')
          existingDocs.vehicle_registration = regDoc || null
          existingDocs.technical_inspection = techDoc || null
        }
      } else {
        // Mode ajout : réinitialiser complètement le formulaire
        resetForm()
      }
    },
    { immediate: true }
  )

  // Computed pour vérifier si le véhicule est actif
  const isActiveVehicle = computed(() => {
    return props.vehicle?.is_active === true
  })

  // Sauvegarder le véhicule
  const saveVehicle = async () => {
    v$.value.$touch()
    if (v$.value.$invalid) {
      showToast('Veuillez corriger les erreurs dans le formulaire', 'error')
      return
    }

    let vehicleData
    if (isActiveVehicle.value) {
      // Pour les véhicules actifs, seule la province peut être modifiée
      vehicleData = {
        province: form.province
      }
    } else {
      // Pour les véhicules inactifs, tous les champs peuvent être modifiés
      vehicleData = {
        make: form.make,
        model: form.model,
        year: form.year,
        vehicle_type: form.vehicle_type,
        transmission: form.transmission,
        fuel_type: form.fuel_type,
        seats: form.seats,
        price_per_day: form.price_per_day,
        description: form.description,
        license_plate: form.license_plate,
        province: form.province,
        consumption: form.consumption,
        owner_id: authStore.user!.id
      }
    }

    const documents = {
      vehicleRegistrationFile: form.vehicleRegistrationFile,
      technicalInspectionFile: form.technicalInspectionFile
    }

    let result
    if (props.vehicle) {
      // Mode mise à jour : restrictions selon le statut du véhicule
      if (isActiveVehicle.value) {
        // Véhicule actif : seule la province peut être modifiée
        result = await updateVehicleLocation(props.vehicle.id, form.province)
      } else {
        // Véhicule inactif : toutes les modifications autorisées
        result = await updateVehicle(props.vehicle.id, vehicleData as Partial<Vehicle>, documents)
      }
    } else {
      // Mode ajout : on définit is_active à false par défaut
      const newVehicleData = {
        ...vehicleData,
        is_active: false // Inactif par défaut, l'admin modère ensuite
      }
      result = await addVehicle(
        newVehicleData as Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>,
        documents
      )
    }

    if (result.error) {
      showToast(result.error, 'error')
    } else {
      // Gérer l'upload des photos ici si nécessaire (uniquement les nouvelles)
      if (form.photos.length > 0 && result.vehicle?.id) {
        await uploadVehiclePhotos(result.vehicle.id)
      } else if (props.vehicle) {
        // En mode édition, s'il n'y a pas de nouvelles photos, on considère que c'est un succès
      }

      showToast(`Véhicule ${props.vehicle ? 'mis à jour' : 'ajouté'} avec succès !`, 'success')
      emit('saved')
      emit('close')
    }
  }
</script>
