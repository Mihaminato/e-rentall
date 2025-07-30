import { sendEmail } from '~/server/utils/email'

// eslint-disable-next-line max-lines-per-function, complexity
export default defineEventHandler(async event => {
  try {
    console.log('API: Début de traitement de la notification de documents')

    const body = await readBody(event)
    const { userData } = body

    console.log('API: Données reçues:', userData)

    if (!userData || !userData.email || !userData.first_name || !userData.last_name) {
      console.error('API: Données utilisateur manquantes:', userData)
      throw createError({
        statusCode: 400,
        statusMessage: 'Données utilisateur manquantes ou incomplètes'
      })
    }

    // Récupérer l'email de l'administrateur depuis la configuration
    const adminEmail = process.env.ADMIN_EMAIL || 'jenrandr@gmail.com'

    // Envoyer l'email à l'administrateur
    console.log("API: Tentative d'envoi d'email...")
    await sendEmail({
      to: adminEmail,
      subject: `Documents soumis - ${userData.first_name} ${userData.last_name}`,
      component: 'DocumentsSubmittedAdmin',
      props: {
        userData: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email
        }
      }
    })

    console.log('API: Email envoyé avec succès')
    return {
      success: true,
      message: 'Notification envoyée avec succès'
    }
  } catch (error) {
    console.error("API: Erreur lors de l'envoi de la notification de documents:", error)

    // Détails supplémentaires pour le debugging
    if (error instanceof Error) {
      console.error("API: Message d'erreur:", error.message)
      console.error('API: Stack trace:', error.stack)
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de la notification"
    })
  }
})
