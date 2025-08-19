import type { EmailNotificationData } from '~/types/admin'
import { sendEmail } from '~/server/utils/email'

// Interface pour typer les props des templates et éviter `any`
interface EmailTemplateProps {
  reservationId: string
  renterName: string
  renterEmail: string
  renterPhone: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  vehicleName: string
  vehicleModel: string
  vehicleLicensePlate: string
  startDate: Date
  endDate: Date
  destination: string
  totalPrice: number
  depositAmount: number
  paymentReference: string
  createdAt: Date
  appUrl: string
}

// eslint-disable-next-line max-lines-per-function, complexity
export default defineEventHandler(async event => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = (await readBody(event)) as EmailNotificationData
    const { eventType, booking } = body

    const appUrl = getRequestURL(event).origin

    const templateData: EmailTemplateProps = {
      reservationId: booking.id,
      renterName: `${booking.renter.first_name} ${booking.renter.last_name}`,
      renterEmail: booking.renter.email,
      renterPhone: booking.renter.phone || 'Non renseigné',
      ownerName: `${booking.owner.first_name} ${booking.owner.last_name}`,
      ownerEmail: booking.owner.email,
      ownerPhone: booking.owner.phone || 'Non renseigné',
      vehicleName: booking.vehicle.make,
      vehicleModel: booking.vehicle.model,
      vehicleLicensePlate: booking.vehicle.license_plate || 'Non renseignée',
      startDate: new Date(booking.start_date),
      endDate: new Date(booking.end_date),
      destination: booking.destination || 'Non renseignée',
      totalPrice: booking.total_price,
      depositAmount: booking.deposit_amount || 0,
      paymentReference: booking.payment_reference || '',
      createdAt: new Date(),
      appUrl
    }

    const emailsToSend: {
      to?: string
      subject: string
      component: string
      props: EmailTemplateProps
    }[] = []

    switch (eventType) {
      case 'booking_created':
        emailsToSend.push(
          {
            to: booking.renter.email,
            subject: `Demande de réservation reçue - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: 'ReservationPendingClient',
            props: templateData
          },
          {
            to: booking.owner.email,
            subject: `Nouvelle demande de réservation - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: 'ReservationNotificationOwner', // Correction: le bon template ici
            props: templateData
          },
          {
            to: process.env.ADMIN_EMAIL,
            subject: `[ADMIN] Nouvelle demande de réservation - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: 'ReservationNotificationAdmin',
            props: templateData
          }
        )
        break

      case 'booking_approved':
        emailsToSend.push(
          {
            to: booking.renter.email,
            subject: "Demande acceptée - Veuillez régler l'acompte",
            component: 'BookingApprovedRenter',
            props: templateData
          },
          {
            to: process.env.ADMIN_EMAIL,
            subject: `[ADMIN] Demande acceptée par le propriétaire - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: 'BookingApprovedAdmin',
            props: templateData
          }
        )
        break

      case 'booking_cancelled': {
        const { cancelled_by, cancellation_reason, renter, owner } = booking

        // Déterminer qui a annulé
        let cancelledByWho = 'Inconnu'
        if (cancelled_by === renter?.id) cancelledByWho = 'Le Locataire'
        else if (cancelled_by === owner?.id) cancelledByWho = 'Le Propriétaire'
        else if (cancelled_by) cancelledByWho = "L'Administrateur" // Supposant que l'ID ne correspond ni au locataire ni au propriétaire

        const cancellationProps = {
          ...templateData,
          cancelledBy: cancelledByWho,
          cancellationReason: cancellation_reason || 'Aucune raison fournie'
        }

        // Notifier le locataire
        if (cancelled_by === renter?.id) {
          // Si le locataire annule lui-même, il reçoit une confirmation
          emailsToSend.push({
            to: renter?.email,
            subject: 'Confirmation de votre annulation',
            component: 'CancellationConfirmationForRenter',
            props: cancellationProps
          })
        } else {
          // Sinon, il reçoit une notification de refus/annulation
          emailsToSend.push({
            to: renter?.email,
            subject: 'Votre réservation a été annulée',
            component: 'BookingRejectedRenter',
            props: cancellationProps
          })
        }

        // Notifier le propriétaire (si ce n'est pas lui qui a annulé)
        if (cancelled_by !== owner?.id) {
          emailsToSend.push({
            to: owner?.email,
            subject: 'Une réservation pour votre véhicule a été annulée',
            component: 'CancellationNotificationForOwner',
            props: cancellationProps
          })
        }

        // Toujours notifier l'admin
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ADMIN] Annulation de réservation - ${booking.vehicle.make}`,
          component: 'CancellationNotificationForAdmin',
          props: cancellationProps
        })
        break
      }

      case 'deposit_submitted_for_admin_validation':
        emailsToSend.push({
          to: process.env.ADMIN_EMAIL,
          subject: `[ACTION REQUISE] Vérification d'acompte pour la réservation #${booking.id.slice(
            0,
            8
          )}`,
          component: 'DepositAwaitingValidationAdmin',
          props: {
            ...templateData,
            depositAmount: booking.deposit_amount || 0,
            paymentReference: booking.payment_reference || 'Non fournie',
            renterName: `${booking.renter.first_name} ${booking.renter.last_name}`
          }
        })
        break

      case 'request_new_payment_reference':
        await sendEmail({
          to: booking.renter.email,
          subject: 'Action requise : Référence de paiement incorrecte',
          component: 'PaymentReferenceRequest',
          props: {
            ...templateData,
            renterName: `${booking.renter.first_name} ${booking.renter.last_name}`,
            paymentReference: booking.payment_reference || 'Non fournie'
          }
        })
        break

      case 'booking_confirmed_and_active':
        emailsToSend.push(
          {
            to: booking.renter.email,
            subject: `Réservation confirmée et active - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: 'BookingConfirmedRenter',
            props: templateData
          },
          {
            to: booking.owner.email,
            subject: `Votre véhicule est loué - ${booking.vehicle.make} ${booking.vehicle.model}`,
            component: 'BookingConfirmedOwner',
            props: templateData
          },
          {
            to: process.env.ADMIN_EMAIL,
            subject: `[ADMIN] Réservation confirmée - #${booking.id.slice(0, 8)}`,
            component: 'BookingConfirmedAdmin',
            props: templateData
          }
        )
        break

      default:
        throw createError({
          statusCode: 400,
          statusMessage: "Type d'événement non supporté"
        })
    }

    const results = await Promise.allSettled(
      emailsToSend
        .filter(email => email.to)
        .map(email =>
          sendEmail({
            to: email.to || '',
            subject: email.subject,
            component: email.component, // On passe le nom du composant
            props: email.props // Et les props
          })
        )
    )

    const fulfilledResults = results.filter(result => result.status === 'fulfilled')
    const rejectedResults = results.filter(result => result.status === 'rejected')

    const errors = rejectedResults.map(p => {
      const reason = (p as PromiseRejectedResult).reason
      if (reason instanceof Error) {
        return {
          name: reason.name,
          message: reason.message,
          stack: reason.stack // Utile pour le débogage
        }
      }
      return { message: String(reason) }
    })

    if (errors.length > 0) {
      console.error(
        'Certains emails ont échoué:',
        JSON.stringify(errors, null, 2) // Log plus lisible
      )
    }

    return {
      success: rejectedResults.length === 0,
      emailsSent: fulfilledResults.length,
      emailsFailed: rejectedResults.length,
      message: `${fulfilledResults.length}/${emailsToSend.length} emails envoyés.`,
      errors // On retourne les erreurs détaillées
    }
  } catch (error) {
    console.error('Erreur dans send-notifications:', error)
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi des notifications email"
    })
  }
})
