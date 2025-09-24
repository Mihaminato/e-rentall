import { sendEmail } from '~/server/utils/email'

interface UserData {
  first_name: string
  last_name: string
  email: string
}

interface ProfileVerificationEmailData {
  eventType: 'profile_verified' | 'profile_unverified'
  userData: UserData
}

const validateUserData = (userData: UserData) => {
  if (!userData || !userData.email || !userData.first_name || !userData.last_name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Données utilisateur manquantes ou incomplètes'
    })
  }
}

const getEmailConfig = (eventType: string) => {
  switch (eventType) {
    case 'profile_verified':
      return {
        subject: '🎉 Votre profil a été vérifié sur E-rentall',
        component: 'ProfileVerified'
      }
    case 'profile_unverified':
      return {
        subject: '⚠️ Vérification de profil retirée - E-rentall',
        component: 'ProfileUnverified'
      }
    default:
      throw createError({ statusCode: 400, statusMessage: "Type d'événement non supporté" })
  }
}

export default defineEventHandler(async event => {
  if (event.node.req.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const appUrl = getRequestURL(event).origin

  try {
    const body = (await readBody(event)) as ProfileVerificationEmailData
    const { eventType, userData } = body

    validateUserData(userData)
    const { subject, component } = getEmailConfig(eventType)

    await sendEmail({
      to: userData.email,
      subject,
      component,
      props: {
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        appUrl
      }
    })

    return {
      success: true,
      message: 'Notification de vérification envoyée avec succès'
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification de vérification:", { cause: error })
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de la notification"
    })
  }
})
