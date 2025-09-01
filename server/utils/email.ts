import type { Component } from 'vue'

// Import statique de tous les composants email
import BookingApprovedAdmin from '~/emails/BookingApprovedAdmin.vue'
import BookingApprovedRenter from '~/emails/BookingApprovedRenter.vue'
import BookingConfirmedAdmin from '~/emails/BookingConfirmedAdmin.vue'
import BookingConfirmedOwner from '~/emails/BookingConfirmedOwner.vue'
import BookingConfirmedRenter from '~/emails/BookingConfirmedRenter.vue'
import BookingRejectedRenter from '~/emails/BookingRejectedRenter.vue'
import CancellationConfirmationForRenter from '~/emails/CancellationConfirmationForRenter.vue'
import CancellationNotificationForAdmin from '~/emails/CancellationNotificationForAdmin.vue'
import CancellationNotificationForOwner from '~/emails/CancellationNotificationForOwner.vue'
import ReservationNotificationAdmin from '~/emails/ReservationNotificationAdmin.vue'
import ReservationNotificationOwner from '~/emails/ReservationNotificationOwner.vue'
import ReservationPendingClient from '~/emails/ReservationPendingClient.vue'
import DepositAwaitingValidationAdmin from '~/emails/DepositAwaitingValidationAdmin.vue'
import PaymentReferenceRequest from '~/emails/PaymentReferenceRequest.vue'
import DocumentsSubmittedAdmin from '~/emails/DocumentsSubmittedAdmin.vue'
import VehicleActivated from '~/emails/VehicleActivated.vue'
import VehicleUpdatedActive from '~/emails/VehicleUpdatedActive.vue'

// Récupération de la configuration d'exécution de Nuxt
const config = useRuntimeConfig()

// Mapping des noms de composants vers les composants importés
const emailComponents: Record<string, Component> = {
  BookingApprovedAdmin: BookingApprovedAdmin,
  BookingApprovedRenter: BookingApprovedRenter,
  BookingConfirmedAdmin: BookingConfirmedAdmin,
  BookingConfirmedOwner: BookingConfirmedOwner,
  BookingConfirmedRenter: BookingConfirmedRenter,
  BookingRejectedRenter: BookingRejectedRenter,
  CancellationConfirmationForRenter: CancellationConfirmationForRenter,
  CancellationNotificationForAdmin: CancellationNotificationForAdmin,
  CancellationNotificationForOwner: CancellationNotificationForOwner,
  ReservationNotificationAdmin: ReservationNotificationAdmin,
  ReservationNotificationOwner: ReservationNotificationOwner,
  ReservationPendingClient: ReservationPendingClient,
  DepositAwaitingValidationAdmin: DepositAwaitingValidationAdmin,
  PaymentReferenceRequest: PaymentReferenceRequest,
  DocumentsSubmittedAdmin: DocumentsSubmittedAdmin,
  VehicleActivated: VehicleActivated,
  VehicleUpdatedActive: VehicleUpdatedActive
}

interface SendEmailOptions {
  to: string
  subject: string
  component: string // Nom du composant .vue à utiliser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any> // 'any' est requis pour la flexibilité des props de vue-email
}

/**
 * Envoie un e-mail en utilisant un template Vue et le service approprié selon l'environnement.
 * - En production (sur NuxtHub/Cloudflare), utilise `worker-mailer`.
 * - En développement, utilise `nodemailer` pour la compatibilité locale.
 * @param options - Options pour l'envoi de l'e-mail.
 */
// eslint-disable-next-line max-lines-per-function
export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, component, props } = options

  // --- 1. Rendu du template HTML ---
  // Cette étape est commune aux deux environnements.
  const { render } = await import('@vue-email/render')
  const emailComponent = emailComponents[component]

  if (!emailComponent) {
    throw new Error(`Composant email "${component}" introuvable.`)
  }

  const html = await render(emailComponent, props || {})

  try {
    // --- 2. Envoi de l'email via le service approprié ---
    if (!import.meta.dev) {
      // --- Environnement de PRODUCTION (NuxtHub/Cloudflare) ---
      console.info('Utilisation de worker-mailer pour la production...')
      const { WorkerMailer } = await import('worker-mailer')

      const info = await WorkerMailer.send(
        {
          host: config.mail.smtp.host,
          port: config.mail.smtp.port,
          secure: config.mail.smtp.port === 465, // `secure: true` pour le port 465
          authType: 'plain', // Spécifier explicitement la méthode d'authentification
          credentials: {
            username: config.mail.smtp.auth.user,
            password: config.mail.smtp.auth.pass
          }
        },
        {
          from: config.mailFromAddress,
          to,
          subject,
          html
        }
      )
      console.info(`Email envoyé avec succès à ${to} via worker-mailer.`)
      return info
    } else {
      // --- Environnement de DEVELOPPEMENT  nodemailer ne fonctionne pas avec le worker de production dans cloudflare---
      console.info('Utilisation de nodemailer pour le développement...')
      const nodemailer = await import('nodemailer')
      const createTransport = nodemailer.createTransport

      const transporter = createTransport({
        host: config.mail.smtp.host,
        port: config.mail.smtp.port,
        auth: {
          user: config.mail.smtp.auth.user,
          pass: config.mail.smtp.auth.pass
        }
      })

      const info = await transporter.sendMail({
        from: config.mailFromAddress,
        to,
        subject,
        html
      })
      console.info(`Email envoyé avec succès à ${to} via nodemailer: ${info.messageId}`)
      return info
    }
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'email à ${to}:`, error)
    // Propage l'erreur pour une gestion centralisée (ex: dans l'API)
    throw error
  }
}
