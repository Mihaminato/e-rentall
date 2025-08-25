// Types centraux pour l'application
import regionData from '~/components/vehicles/région.json'

// Enums pour standardiser les options
export enum VehicleType {
  SEDAN = 'sedan',
  SUV = 'suv',
  HATCHBACK = 'hatchback',
  COUPE = 'coupe',
  WAGON = 'wagon',
  VAN = 'van',
  TRUCK = 'truck',
  CITADINE = 'citadine',
  PICKUP = 'pickup'
}

export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  SEMI_AUTOMATIC = 'semi_automatic'
}

export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  OTHER = 'other'
}

export enum BookingStatus {
  PENDING = 'pending',
  OWNER_APPROVED = 'owner_approved',
  CONFIRMED = 'confirmed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: 'En attente validation',
  owner_approved: 'Approuvé par propriétaire',
  confirmed: 'Confirmé',
  active: 'En cours',
  completed: 'Terminé',
  cancelled: 'Annulé',
  pending_completion: 'En attente de finalisation'
}

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  pending: 'badge-warning',
  owner_approved: 'badge-primary',
  confirmed: 'badge-accent',
  active: 'badge-success',
  completed: 'badge-neutral',
  cancelled: 'badge-error',
  pending_completion: 'badge-info'
}

export type City = string

// Options formatées pour les selects (avec labels en français)
export const VEHICLE_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Berline', value: 'sedan' },
  { label: 'Citadine', value: 'hatchback' },
  { label: 'SUV', value: 'suv' },
  { label: '4x4 / Pick-up', value: 'pickup' }
]

export const TRANSMISSION_OPTIONS: SelectOption[] = [
  { label: 'Automatique', value: 'automatic' },
  { label: 'Manuelle', value: 'manual' }
]

export const FUEL_TYPE_OPTIONS: SelectOption[] = [
  { label: 'Essence', value: 'gasoline' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Électrique', value: 'electric' },
  { label: 'Hybride', value: 'hybrid' },
  { label: 'Autre', value: 'other' }
]

export const SEATS_OPTIONS = [
  { value: '2', label: '2 places' },
  { value: '4', label: '4 places' },
  { value: '5', label: '5 places' },
  { value: '7', label: '7+ places' }
]

export const PRICE_RANGE_OPTIONS = [
  { value: '0-50000', label: 'Moins de 50 000 Ar' },
  { value: '50000-100000', label: '50 000 - 100 000 Ar' },
  { value: '100000-150000', label: '100 000 - 150 000 Ar' },
  { value: '150000-200000', label: '150 000 - 200 000 Ar' },
  { value: '200000-9999999', label: 'Plus de 200 000 Ar' }
]

// Import des données de région

// Génération automatique des options de ville basée sur région.json
export const CITY_OPTIONS: { value: string; label: string }[] = Object.entries(regionData).flatMap(
  ([region, cities]) =>
    cities.map(city => ({
      value: `${region}_${city}`,
      label: `${region} > ${city}`
    }))
)

export interface User {
  id: string
  email?: string // Optionnel pour compatibilité avec Supabase Auth
}

export interface Profile {
  id: string
  // user_id n'existe pas dans la base, utilisé côté front uniquement
  user_id?: string
  first_name?: string
  last_name?: string
  email?: string // Email synchronisé depuis auth.users
  phone?: string // C'est 'phone' dans la base, pas 'phone_number'
  address?: string
  city?: City
  postal_code?: string
  avatar_url?: string
  cin_number?: string // Numéro CIN (format malgache: 12 chiffres)
  cin_issued_date?: string // Date de délivrance de la CIN
  nif_number?: string // Numéro d'Identification Fiscale (NIF)
  stat_number?: string // Numéro STAT (Statistique)
  is_verified?: boolean
  is_admin?: boolean // Droits d'administration
  created_at?: string
  updated_at?: string
  // bio n'existe pas dans la base
  bio?: string

  // Propriétés utilisées uniquement côté client pour les formulaires
  avatarFile?: File // Pour gérer l'upload de photo de profil
}

export interface Document {
  id: string
  profile_id: string // C'est 'profile_id' dans la base, pas 'user_id'
  type: string // 'id_card' | 'driver_license' | 'proof_of_address' | 'vehicle_registration' | 'insurance'
  file_path: string
  is_verified?: boolean
  admin_notes?: string // Champ présent dans la base
  created_at?: string
  updated_at?: string

  // Champs utilisés côté front uniquement
  verification_date?: string // N'existe pas dans la base
  user_id?: string // Alias pour profile_id
}

export interface Vehicle {
  id: string
  owner_id: string
  make: string
  model: string
  year: number
  vehicle_type: string
  transmission: string
  license_plate: string
  seats: number
  consumption: number | null
  mileage: number | null
  description: string
  price_per_day: number
  location: string
  latitude: number | null
  longitude: number | null
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
  // Relations
  vehicle_photos?: Photo[]
  image_url?: string
  fuel_type: string
  province: City
  owner?: Profile
  availabilities?: Availability[]
}

export interface VehiclePhoto {
  id: string
  vehicle_id: string
  file_path: string
  is_primary?: boolean
}

export interface Photo {
  id: string
  vehicle_id: string
  file_path: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface PhotoPreview {
  url: string
  file?: File
  path?: string
  isExisting?: boolean
  id?: string
}

export interface Availability {
  id: string
  vehicle_id: string
  start_date: string
  end_date: string
  created_at?: string
  updated_at?: string
}

export interface Booking {
  id: string
  vehicle_id: string
  renter_id: string // C'est 'renter_id' dans la base, pas 'user_id'
  start_date: string
  end_date: string
  total_price: number
  status:
    | 'pending'
    | 'owner_approved'
    | 'confirmed'
    | 'active'
    | 'completed'
    | 'cancelled'
    | 'pending_completion'
  deposit_amount?: number
  is_deposit_paid?: boolean
  payment_reference?: string
  caution_amount?: number
  caution_paid?: boolean
  caution_payment_id?: string
  owner_approved_at?: string
  admin_approved_at?: string
  cancelled_by?: string
  cancellation_reason?: string
  owner_notes?: string
  admin_notes?: string
  created_at?: string
  updated_at?: string

  // Relations pour les requêtes jointes
  vehicle?: Vehicle
  renter?: Profile
  owner?: Profile

  // Champs pour utilisation côté front uniquement
  user_id?: string // alias pour renter_id
}

export interface Message {
  id: string
  booking_id: string
  sender_id: string
  recipient_id: string
  content: string
  is_read: boolean
  created_at: string
}

export interface Review {
  id: string
  booking_id: string
  reviewer_id: string
  reviewee_id: string
  vehicle_id: string
  rating: number
  comment?: string
  created_at: string
}

// Types pour les filtres de recherche
export interface VehicleFilters {
  province?: City
  start_date?: string
  end_date?: string
  type?: Vehicle['vehicle_type']
  transmission?: Vehicle['transmission']
  fuel_type?: Vehicle['fuel_type']
  min_seats?: number
  max_price?: number
  sort_by?: 'price_asc' | 'price_desc' | 'newest' | 'rating'
}

export interface SearchFilters {
  province: string
  startDate: string
  endDate: string
  vehicleType: string
  transmission: string
  fuelType: string
  seats: string
  maxPrice: string
  keywords: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count?: number
  from: number
  to: number
  total?: number
}

export interface VehicleForm {
  make: string
  model: string
  year: number | null
  vehicle_type: string
  transmission: string
  fuel_type: string
  seats: number | null
  consumption: number | null
  price_per_day: number | null
  description: string
  license_plate: string
  province: City | ''
  // Pour le formulaire uniquement
  photos: File[]
  vehicleRegistrationFile: File | null
  technicalInspectionFile: File | null
}

export interface SelectOption {
  value: string
  label: string
}

export interface UserToVerify {
  profile_id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  avatar_url: string | null
  profile_created_at: string
  last_submission_date: string | null
  documents: Document[]
}
