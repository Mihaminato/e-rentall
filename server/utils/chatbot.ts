import type { KnowledgeBase } from '~/types'

// Fonction pour détecter la langue du message
export function detectLanguage(message: string): 'fr' | 'mg' {
  const malagasyWords = [
    'manao',
    'misy',
    'mila',
    'ho',
    'ny',
    'amin',
    'ary',
    'fa',
    'raha',
    'na',
    'tsy',
    'dia',
    'kely',
    'lehibe',
    'tsara',
    'ratsy',
    'mazava',
    'mafy',
    'malemy',
    'velona',
    'maty',
    'vita',
    'mbola',
    'efa',
    'manana',
    'mampiasa',
    'mametraka',
    'mamaky',
    'mamorona',
    'mamindra',
    'fiarahabana',
    'valio',
    'tolotra',
    'fanampiana',
    'famaranana',
    'mahaliana',
    'marina'
  ]

  const words = message.toLowerCase().split(/\s+/)
  const malagasyCount = words.filter(word => malagasyWords.includes(word)).length

  return malagasyCount / words.length > 0.3 ? 'mg' : 'fr'
}

// Fonction pour nettoyer et formater la réponse
export function formatResponse(response: string, language: 'fr' | 'mg'): string {
  let cleaned = response.trim()

  // Supprimer seulement les préfixes techniques
  cleaned = cleaned.replace(/^(Assistant|Bot|AI|Chatbot):\s*/i, '')
  cleaned = cleaned.replace(/^(Réponse|Valiny):\s*/i, '')

  return cleaned.trim()
}

// Interface pour les étapes du processus
interface ProcessStep {
  number: number
  title: { fr: string; mg: string }
  description: { fr: string; mg: string }
}

// Interface pour les FAQ
interface FAQItem {
  question: { fr: string; mg: string }
  answer: { fr: string; mg: string }
}

// Interface pour les politiques
interface PolicyItem {
  title?: { fr: string; mg: string }
  description?: { fr: string; mg: string }
  fr?: string
  mg?: string
}

function buildProcessSection(knowledge: KnowledgeBase): string {
  const processSteps = (knowledge.process.steps as ProcessStep[])
    .map(
      step =>
        `${step.number}. ${step.title.fr} / ${step.title.mg}\n   ${step.description.fr}\n   ${step.description.mg}`
    )
    .join('\n\n')

  return `📋 PROCESSUS DE LOCATION :
${knowledge.process.title.fr} / ${knowledge.process.title.mg}

${processSteps}`
}

function buildFAQSection(knowledge: KnowledgeBase): string {
  const faqItems = (knowledge.faq as FAQItem[])
    .map(
      (item, index) =>
        `${index + 1}. Q: ${item.question.fr}\n   R: ${item.answer.fr}\n\n   Q: ${
          item.question.mg
        }\n   R: ${item.answer.mg}`
    )
    .join('\n\n')

  return `❓ FAQ FRÉQUENTES :
${faqItems}`
}

function buildPoliciesSection(knowledge: KnowledgeBase): string {
  const policies = Object.entries(knowledge.policies)
    .map(([key, policy], index) => {
      const policyObj = policy as PolicyItem
      return `${index + 1}. ${policyObj.title?.fr || key} / ${policyObj.title?.mg || key}\n   ${
        policyObj.description?.fr || policyObj.fr
      }\n   ${policyObj.description?.mg || policyObj.mg}`
    })
    .join('\n\n')

  return `📜 POLITIQUES :
${policies}`
}

export function buildSystemPrompt(knowledge: KnowledgeBase): string {
  return `Tu es l'assistant virtuel intelligent d'E-RENTALL, plateforme de location de voitures à Madagascar.

🎯 TON RÔLE :
Tu es un expert en location de véhicules à Madagascar, spécialisé dans l'assistance clientèle bilingue (français/malgache).

📋 RÈGLES STRICTES :
1. DÉTECTION LINGUISTIQUE : Analyse automatiquement la langue du message utilisateur
2. RÉPONSE LINGUISTIQUE : Réponds TOUJOURS dans la même langue détectée
3. SOURCES UNIQUES : Utilise UNIQUEMENT les informations de la base de connaissances
4. TRANSPARENCE : Si l'information n'existe pas, propose le contact support
5. PROFESSIONNALISME : Sois courtois, précis et structuré
6. CALCULS : Pour l'acompte : nombre de jours × 5000 Ar
7. PAS DE SALUTATIONS : Ne commence JAMAIS par "Bonjour", "Fiarahabana", "Salut" ou "Salama" si tu a deja dit bonjour ou fiarahabana dans la conversation

🏢 INFORMATIONS E-RENTALL :
NOM: ${knowledge.company.name}
DESCRIPTION FR: ${knowledge.company.description.fr}
DESCRIPTION MG: ${knowledge.company.description.mg}
COUVERTURE: ${knowledge.company.coverage.fr}
CONTACT: ${knowledge.company.contact.email}
SUPPORT: ${knowledge.company.contact.support_hours}

${buildProcessSection(knowledge)}

${buildFAQSection(knowledge)}

${buildPoliciesSection(knowledge)}

🎯 INSTRUCTIONS DE RÉPONSE STRUCTURÉE :
FRANÇAIS : Réponse directe et structurée, informations précises, proposition d'aide si nécessaire
MALGACHE : Valiny mivantana sy voalamina tsara, antoka marina sy mazava

⚠️ INTERDICTIONS : Ne jamais inventer d'informations, donner de prix non mentionnés, promettre des services inexistants
📞 CONTACT SUPPORT : ${knowledge.company.contact.email}`
}

interface OpenAIParams {
  apiKey: string
  model: string
  systemPrompt: string
  message: string
  history: Array<{ role: string; content: string }>
  temperature: number
  maxTokens: number
}

export async function callOpenAI(params: OpenAIParams) {
  const { apiKey, model, systemPrompt, message, history, temperature, maxTokens } = params

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-8),
    { role: 'user', content: message }
  ]

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
      stop: ['Human:', 'Assistant:', 'User:', 'Bot:']
    })
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('OpenAI API error:', error)
    throw createError({
      statusCode: response.status,
      statusMessage: 'Erreur OpenAI'
    })
  }

  const data = await response.json()

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Réponse OpenAI invalide'
    })
  }

  return data
}
