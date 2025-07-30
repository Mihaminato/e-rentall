import type { Booking } from '~/types'
import type { BookingEmailData, EmailNotificationData } from '~/types/admin'

// Fonction utilitaire pour envoyer les notifications email
export const sendBookingNotification = async (
  eventType: EmailNotificationData['eventType'],
  bookingData: EmailNotificationData['booking']
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await $fetch('/api/bookings/send-notifications', {
      method: 'POST',
      body: {
        bookingId: bookingData.id,
        eventType,
        booking: bookingData
      }
    })

    return { success: true, ...(response as object) }
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }
  }
}

// Fonction utilitaire pour envoyer la notification de documents soumis
export const sendDocumentsSubmittedNotification = async (userData: {
  first_name: string
  last_name: string
  email: string
}): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await $fetch('/api/documents/send-notification', {
      method: 'POST',
      body: {
        userData
      }
    })

    return { success: true, ...(response as object) }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }
  }
}

// Types pour faciliter l'utilisation

// Fonction helper pour transformer les données de réservation Supabase vers le format email
// eslint-disable-next-line complexity
export const transformBookingForEmail = (booking: Booking): BookingEmailData => {
  return {
    id: booking.id,
    start_date: booking.start_date,
    end_date: booking.end_date,
    total_price: booking.total_price,
    deposit_amount: booking.deposit_amount,
    payment_reference: booking.payment_reference,
    vehicle: {
      make: booking.vehicle?.make || '',
      model: booking.vehicle?.model || '',
      license_plate: booking.vehicle?.license_plate || 'Non renseignée'
    },
    renter: {
      id: booking.renter?.id || booking.renter_id,
      first_name: booking.renter?.first_name || '',
      last_name: booking.renter?.last_name || '',
      email: booking.renter?.email || '',
      phone: booking.renter?.phone,
      address: booking.renter?.address,
      city: booking.renter?.city
    },
    owner: {
      id: booking.vehicle?.owner?.id || booking.vehicle?.owner_id || '',
      first_name: booking.vehicle?.owner?.first_name || '',
      last_name: booking.vehicle?.owner?.last_name || '',
      email: booking.vehicle?.owner?.email || '',
      phone: booking.vehicle?.owner?.phone
    },
    destination: extractDestination(booking),
    owner_notes: booking.owner_notes,
    cancelled_by: booking.cancelled_by,
    cancellation_reason: booking.cancellation_reason
  }
}

// Fonction helper pour extraire la destination depuis owner_notes si c'est un JSON
function extractDestination(booking: Booking): string {
  if (!booking.owner_notes) return 'Non renseignée'

  try {
    const notes = JSON.parse(booking.owner_notes)
    if (typeof notes === 'object' && notes !== null && 'destination' in notes) {
      return notes.destination || 'Non renseignée'
    }
  } catch (e) {
    console.error("Erreur lors de l'extraction de la destination:", {
      cause: e
    })
    // Si ce n'est pas du JSON, on considère que ce ne sont pas des informations de destination
  }

  return 'Non renseignée'
}
