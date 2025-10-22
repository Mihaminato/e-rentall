import type { KnowledgeBase } from '~/types'
import {
  buildSystemPrompt,
  callOpenAI,
  detectLanguage,
  formatResponse
} from '~/server/utils/chatbot'

// Fonction utilitaire pour valider les données d'entrée
function validateInput(message: string, history: unknown[]) {
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message invalide ou vide'
    })
  }

  if (message.length > 1000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message trop long (max 1000 caractères)'
    })
  }

  if (!Array.isArray(history)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Historique invalide'
    })
  }
}

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()

  try {
    const { message, history = [] } = await readBody(event)

    // Validation des données d'entrée
    validateInput(message, history)

    if (!config.openai.apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration OpenAI manquante'
      })
    }

    // Charger knowledge avec cache
    const knowledge = (await import('~/server/data/chatbot/knowledge.json'))
      .default as KnowledgeBase

    // Build system prompt optimisé
    const systemPrompt = buildSystemPrompt(knowledge)

    // Appel OpenAI avec gestion d'erreur améliorée
    const data = await callOpenAI({
      apiKey: config.openai.apiKey,
      model: config.openai.model,
      systemPrompt,
      message: message.trim(),
      history: history.slice(-10), // Limiter l'historique
      temperature: config.openai.temperature,
      maxTokens: config.openai.maxTokens
    })

    // Validation et traitement de la réponse
    const rawReply = data.choices[0].message.content
    if (!rawReply || rawReply.trim().length === 0) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Réponse vide du chatbot'
      })
    }

    // Détecter la langue du message utilisateur
    const userLanguage = detectLanguage(message)

    // Formater la réponse selon la langue détectée
    const formattedReply = formatResponse(rawReply, userLanguage)

    return {
      success: true,
      reply: formattedReply,
      usage: data.usage,
      model: config.openai.model,
      detectedLanguage: userLanguage
    }
  } catch (error: unknown) {
    console.error('Chat API error:', error)

    // Gestion d'erreur contextuelle
    if (error && typeof error === 'object' && 'statusCode' in error) {
      return {
        success: false,
        error: (error as { statusMessage?: string }).statusMessage || 'Erreur de traitement'
      }
    }

    return {
      success: false,
      error:
        "Désolé, une erreur s'est produite. Veuillez réessayer ou contactez support@erentall.market"
    }
  }
})
