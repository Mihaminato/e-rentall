// Types pour l'interface admin

export interface AdminNavigationItem {
  path: string
  icon: string
  label: string
  badge?: string | number
}

export interface AdminStats {
  users: number
  vehicles: number
  bookings: number
  documents: number
}

export interface AdminNotification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export // Types pour les différents événements de notification
interface EmailNotificationData {
  bookingId: string
  eventType:
    | 'booking_created'
    | 'booking_approved'
    | 'booking_rejected'
    | 'booking_cancelled'
    | 'deposit_submitted_for_admin_validation'
    | 'booking_confirmed_and_active'
    | 'request_new_payment_reference'
  booking: BookingEmailData
}

export interface BookingEmailData {
  id: string
  start_date: string
  end_date: string
  total_price: number
  deposit_amount?: number
  payment_reference?: string
  vehicle: {
    make: string
    model: string
    license_plate?: string
  }
  renter: {
    id: string
    first_name: string
    last_name: string
    email: string
    phone?: string
    address?: string
    city?: string
  }
  owner: {
    id: string
    first_name: string
    last_name: string
    email: string
    phone?: string
  }
  destination?: string
  owner_notes?: string
  cancelled_by?: string
  cancellation_reason?: string
}
