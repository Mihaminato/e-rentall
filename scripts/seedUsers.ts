import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker/locale/fr'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Explicitement charger les variables depuis .env
const result = dotenv.config()

if (result.error) {
  console.error(
    'CRITICAL ERROR: Could not load .env file. Please ensure it exists at the project root.'
  )
  throw result.error
}

// Vérification améliorée des variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const missingVars = []
if (!supabaseUrl) {
  missingVars.push('SUPABASE_URL')
}
if (!supabaseServiceRoleKey || supabaseServiceRoleKey === 'VOTRE_SERVICE_ROLE_KEY_A_COLLER_ICI') {
  missingVars.push('SUPABASE_SERVICE_ROLE_KEY')
}

if (missingVars.length > 0) {
  console.error(
    `\nERROR: The following environment variables are missing or incorrect in your .env file: ${missingVars.join(
      ', '
    )}`
  )
  console.error('Please check that:')
  console.error('1. The .env file is at the root of your project.')
  console.error('2. The variable names are spelled correctly.')
  console.error('3. You have replaced the placeholder value for SUPABASE_SERVICE_ROLE_KEY.')
  process.exit(1) // Stop the script
}

// Initialisation du client Supabase avec les droits de service
const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types de documents requis
const requiredDocTypes = ['nif_document', 'stat_document']

// Lire le fichier PDF en mémoire une seule fois
const pdfPath = path.join(process.cwd(), 'cart_girs.pdf')
if (!fs.existsSync(pdfPath)) {
  console.error(`\nERROR: Document file not found at ${pdfPath}.`)
  console.error('Please make sure "cart_girs.pdf" is at the root of your project.')
  process.exit(1)
}
const pdfBuffer = fs.readFileSync(pdfPath)

// Fonction pour uploader un document et créer l'enregistrement
async function uploadDocument(userId: string, docType: string) {
  const fileName = `${docType}_${Date.now()}.pdf`
  const filePath = `${userId}/${fileName}`

  // 1. Uploader le fichier dans le storage
  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true
    })

  if (uploadError) {
    console.error(`Erreur d'upload pour ${userId} - ${docType}:`, uploadError.message)
    return
  }

  // 2. Créer l'enregistrement dans la table 'documents'
  const { error: insertError } = await supabase.from('documents').insert({
    profile_id: userId,
    type: docType,
    file_path: filePath,
    is_verified: false // Important pour qu'il apparaisse dans la liste de vérification
  })

  if (insertError) {
    console.error(`Erreur d'insertion DB pour ${userId} - ${docType}:`, insertError.message)
  }
}

// Fonction pour créer un utilisateur et ses documents
async function createUserWithDocuments() {
  // --- Étape 1: Créer l'utilisateur avec les métadonnées de base ---
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName, provider: 'test.local' }).toLowerCase()
  const password = 'password123'
  const cinNumber = Array.from({ length: 12 }, () => faker.number.int({ min: 0, max: 9 })).join('')
  const cinIssuedDate = faker.date.past({ years: 5 }).toISOString().split('T')[0]

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      cin_number: cinNumber,
      cin_issued_date: cinIssuedDate
    }
  })

  if (authError || !authData.user) {
    console.error(`Erreur lors de la création de l'utilisateur ${email}:`, authError?.message)
    return null
  }

  const userId = authData.user.id
  console.log(`Utilisateur créé: ${email} (${userId})`)

  // --- Étape 2: Mettre à jour le profil avec les informations NIF/STAT ---
  const nifNumber = faker.string.numeric(10)
  const statNumber = faker.string.numeric(15)

  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      nif_number: nifNumber,
      stat_number: statNumber
    })
    .eq('id', userId)

  if (profileError) {
    console.error(`Erreur lors de la mise à jour du profil pour ${userId}:`, profileError.message)
    // On continue quand même pour l'upload des documents
  } else {
    console.log(` -> Profil mis à jour avec NIF/STAT pour ${userId}.`)
  }

  // --- Étape 3: Uploader les 2 documents requis pour cet utilisateur ---
  console.log(` -> Upload des 2 documents pour ${userId}...`)
  for (const docType of requiredDocTypes) {
    await uploadDocument(userId, docType)
  }
  console.log(` -> Documents uploadés pour ${userId}.`)

  return authData.user
}

// Fonction principale pour créer 10 utilisateurs
async function seedUsers() {
  console.log('Début du seeding de 10 utilisateurs avec leurs documents...')

  const promises = []
  for (let i = 0; i < 10; i++) {
    promises.push(createUserWithDocuments())
  }

  await Promise.all(promises)

  console.log('Seeding terminé !')
}

// Lancement du script
seedUsers().catch(console.error)
