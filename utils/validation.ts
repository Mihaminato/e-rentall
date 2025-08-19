import dayjs from 'dayjs'

/**
 * Fonctions de validation pour les données utilisateur
 */

/**
 * Valide le format du numéro CIN malgache
 * Format attendu: exactement 12 chiffres
 * @param cinNumber Le numéro CIN à valider
 * @returns true si le format est valide, false sinon
 */
export const validateCinNumber = (cinNumber: string): boolean => {
  if (!cinNumber) return false

  // Supprimer les espaces et caractères non numériques
  const cleanCin = cinNumber.replace(/\s/g, '')

  // Vérifier que c'est exactement 12 chiffres
  const cinRegex = /^[0-9]{12}$/
  return cinRegex.test(cleanCin)
}

/**
 * Formate un numéro CIN en ajoutant des espaces pour la lisibilité
 * Format: XXXX XXXX XXXX
 * @param cinNumber Le numéro CIN à formater
 * @returns Le numéro CIN formaté ou la chaîne originale si invalide
 */
export const formatCinNumber = (cinNumber: string): string => {
  if (!cinNumber) return ''

  // Supprimer tous les espaces existants
  const cleanCin = cinNumber.replace(/\s/g, '')

  // Vérifier que c'est bien 12 chiffres
  if (!/^[0-9]{12}$/.test(cleanCin)) {
    return cinNumber // Retourner la valeur originale si invalide
  }

  // Formater avec des espaces: XXXX XXXX XXXX
  return cleanCin.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
}

/**
 * Nettoie un numéro CIN en supprimant les espaces
 * @param cinNumber Le numéro CIN à nettoyer
 * @returns Le numéro CIN sans espaces
 */
export const cleanCinNumber = (cinNumber: string): string => {
  if (!cinNumber) return ''
  return cinNumber.replace(/\s/g, '')
}

/**
 * Valide une date de délivrance CIN
 * La date ne peut pas être dans le futur et doit être dans une plage raisonnable
 * @param issuedDate La date de délivrance à valider
 * @returns true si la date est valide, false sinon
 */
export const validateCinIssuedDate = (issuedDate: string): boolean => {
  if (!issuedDate) return false

  const date = new Date(issuedDate)
  const now = new Date()
  const minDate = new Date('1960-01-01') // Date minimum raisonnable

  // Vérifier que la date est valide
  if (isNaN(date.getTime())) return false

  // Vérifier que la date n'est pas dans le futur
  if (date > now) return false

  // Vérifier que la date n'est pas trop ancienne
  if (date < minDate) return false

  return true
}

/**
 * Messages d'erreur pour la validation CIN
 */
export const CIN_VALIDATION_MESSAGES = {
  INVALID_FORMAT: 'Le numéro CIN doit contenir exactement 12 chiffres',
  REQUIRED: 'Le numéro CIN est requis',
  INVALID_DATE: 'La date de délivrance de la CIN est invalide',
  FUTURE_DATE: 'La date de délivrance ne peut pas être dans le futur',
  DATE_REQUIRED: 'La date de délivrance de la CIN est requise'
} as const

/**
 * Calcule la durée entre deux dates en incluant la date de fin
 * @param startDate Date de début (format string)
 * @param endDate Date de fin (format string)
 * @returns Nombre de jours entre les deux dates (date de fin incluse)
 */
export const calculateDurationInDays = (startDate: string, endDate: string): number => {
  return dayjs(endDate).diff(dayjs(startDate), 'day', true) + 1
}
