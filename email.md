# Système d'Email - Documentation Complète

## Vue d'ensemble

Le système d'email de cette application de location de véhicules est conçu pour envoyer des notifications automatiques à tous les acteurs impliqués dans le processus de réservation. Il utilise une architecture modulaire avec des templates Vue.js et supporte différents environnements (développement et production).

## Architecture du Système

### 1. Structure des Fichiers

```
├── emails/                          # Templates d'emails Vue.js
│   ├── BookingApprovedAdmin.vue
│   ├── BookingApprovedRenter.vue
│   ├── BookingConfirmedAdmin.vue
│   ├── BookingConfirmedOwner.vue
│   ├── BookingConfirmedRenter.vue
│   ├── BookingRejectedRenter.vue
│   ├── CancellationConfirmationForRenter.vue
│   ├── CancellationNotificationForAdmin.vue
│   ├── CancellationNotificationForOwner.vue
│   ├── ReservationNotificationAdmin.vue
│   ├── ReservationNotificationOwner.vue
│   ├── ReservationPendingClient.vue
│   ├── DepositAwaitingValidationAdmin.vue
│   └── PaymentReferenceRequest.vue
├── server/
│   └── utils/
│       └── email.ts                 # Service principal d'envoi d'emails
├── utils/
│   └── emailNotifications.ts        # Utilitaires pour les notifications
└── server/api/bookings/
    └── send-notifications.post.ts   # Endpoint API pour déclencher les emails
```

### 2. Composants Principaux

#### A. Service d'Email Principal (`server/utils/email.ts`)

**Fonctionnalités :**
- Import statique de tous les templates d'email
- Mapping des noms de composants vers les composants Vue
- Rendu HTML des templates avec `@vue-email/render`
- Envoi adaptatif selon l'environnement

**Environnements Supportés :**

**Production (NuxtHub/Cloudflare) :**
```typescript
// Utilise worker-mailer pour la compatibilité Cloudflare
const { WorkerMailer } = await import('worker-mailer')
const info = await WorkerMailer.send(config, emailData)
```

**Développement :**
```typescript
// Utilise nodemailer pour les tests locaux
const nodemailer = await import('nodemailer')
const transporter = createTransport(smtpConfig)
const info = await transporter.sendMail(emailData)
```

#### B. Utilitaires de Notification (`utils/emailNotifications.ts`)

**Fonctions Principales :**

1. **`sendBookingNotification()`** : Point d'entrée principal
   - Appelle l'endpoint API `/api/bookings/send-notifications`
   - Gère les erreurs et retourne un statut

2. **`transformBookingForEmail()`** : Transformation des données
   - Convertit les données Supabase vers le format email
   - Extrait les informations utilisateur, véhicule, et réservation
   - Gère les cas où certaines données sont manquantes

3. **`extractDestination()`** : Extraction de la destination
   - Parse les `owner_notes` JSON pour extraire la destination
   - Gère les cas d'erreur de parsing

## Types d'Emails Supportés

### 1. Notifications de Réservation

| Template | Destinataire | Déclencheur |
|----------|--------------|-------------|
| `ReservationNotificationAdmin` | Administrateur | Nouvelle demande de réservation |
| `ReservationNotificationOwner` | Propriétaire | Nouvelle demande de réservation |
| `ReservationPendingClient` | Locataire | Demande envoyée, en attente |

### 2. Notifications d'Approbation

| Template | Destinataire | Déclencheur |
|----------|--------------|-------------|
| `BookingApprovedAdmin` | Administrateur | Réservation approuvée par propriétaire |
| `BookingApprovedRenter` | Locataire | Réservation approuvée |

### 3. Notifications de Confirmation

| Template | Destinataire | Déclencheur |
|----------|--------------|-------------|
| `BookingConfirmedAdmin` | Administrateur | Paiement confirmé |
| `BookingConfirmedOwner` | Propriétaire | Paiement confirmé |
| `BookingConfirmedRenter` | Locataire | Paiement confirmé |

### 4. Notifications de Rejet

| Template | Destinataire | Déclencheur |
|----------|--------------|-------------|
| `BookingRejectedRenter` | Locataire | Réservation rejetée |

### 5. Notifications d'Annulation

| Template | Destinataire | Déclencheur |
|----------|--------------|-------------|
| `CancellationConfirmationForRenter` | Locataire | Annulation confirmée |
| `CancellationNotificationForAdmin` | Administrateur | Réservation annulée |
| `CancellationNotificationForOwner` | Propriétaire | Réservation annulée |

### 6. Notifications de Paiement

| Template | Destinataire | Déclencheur |
|----------|--------------|-------------|
| `DepositAwaitingValidationAdmin` | Administrateur | Dépôt en attente de validation |
| `PaymentReferenceRequest` | Locataire | Demande de référence de paiement |

## Flux de Données

### 1. Déclenchement d'un Email

```typescript
// 1. Appel depuis le code métier
await sendBookingNotification('booking_approved', bookingData)

// 2. Appel de l'API
POST /api/bookings/send-notifications
{
  bookingId: "123",
  eventType: "booking_approved",
  booking: { ... }
}

// 3. Traitement dans l'API
const emailData = transformBookingForEmail(booking)
await sendEmail({
  to: recipient.email,
  subject: "Réservation approuvée",
  component: "BookingApprovedRenter",
  props: emailData
})
```

### 2. Rendu du Template

```typescript
// 1. Import du composant Vue
const emailComponent = emailComponents[component]

// 2. Rendu HTML avec @vue-email/render
const html = await render(emailComponent, props || {})

// 3. Envoi via le service approprié
```

## Configuration SMTP

### Variables d'Environnement Requises

```env
# Configuration SMTP
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_AUTH_USER=your-email@example.com
MAIL_SMTP_AUTH_PASS=your-password

# Adresse d'expédition
MAIL_FROM_ADDRESS=noreply@yourdomain.com
```

### Configuration Runtime

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    mail: {
      smtp: {
        host: process.env.MAIL_SMTP_HOST,
        port: parseInt(process.env.MAIL_SMTP_PORT || '587'),
        auth: {
          user: process.env.MAIL_SMTP_AUTH_USER,
          pass: process.env.MAIL_SMTP_AUTH_PASS
        }
      }
    },
    mailFromAddress: process.env.MAIL_FROM_ADDRESS
  }
})
```

## Gestion des Erreurs

### 1. Erreurs de Rendu

```typescript
if (!emailComponent) {
  throw new Error(`Composant email "${component}" introuvable.`)
}
```

### 2. Erreurs d'Envoi

```typescript
try {
  // Tentative d'envoi
  const info = await sendEmail(options)
  console.info(`Email envoyé avec succès à ${to}`)
  return info
} catch (error) {
  console.error(`Erreur lors de l'envoi de l'email à ${to}:`, error)
  throw error // Propagation pour gestion centralisée
}
```

### 3. Gestion des Données Manquantes

```typescript
// Valeurs par défaut pour les données manquantes
vehicle: {
  make: booking.vehicle?.make || '',
  model: booking.vehicle?.model || '',
  license_plate: booking.vehicle?.license_plate || 'Non renseignée'
}
```

## Sécurité et Bonnes Pratiques

### 1. Validation des Données

- Vérification de l'existence du composant email
- Validation des adresses email
- Gestion des données manquantes avec valeurs par défaut

### 2. Gestion des Secrets

- Utilisation de variables d'environnement pour les credentials SMTP
- Pas de hardcoding des mots de passe
- Configuration séparée pour dev/prod

### 3. Logging et Monitoring

- Logs détaillés pour le debugging
- Différenciation des environnements dans les logs
- Gestion centralisée des erreurs

## Extensibilité

### 1. Ajout d'un Nouveau Template

1. Créer le fichier Vue dans `emails/`
2. Ajouter l'import dans `server/utils/email.ts`
3. Ajouter l'entrée dans `emailComponents`
4. Créer la logique de déclenchement

### 2. Ajout d'un Nouveau Type d'Événement

1. Définir le type dans `types/admin.ts`
2. Ajouter la logique dans `utils/emailNotifications.ts`
3. Créer l'endpoint API si nécessaire

### 3. Personnalisation des Templates

- Utilisation de props pour passer les données
- Support du HTML et CSS dans les templates Vue
- Possibilité d'utiliser des composants réutilisables

## Performance et Optimisation

### 1. Import Statique

```typescript
// Import statique pour éviter les imports dynamiques coûteux
import BookingApprovedAdmin from '~/emails/BookingApprovedAdmin.vue'
```

### 2. Rendu Asynchrone

```typescript
// Rendu asynchrone pour éviter le blocage
const html = await render(emailComponent, props || {})
```

### 3. Gestion de la Mémoire

- Nettoyage automatique des ressources
- Pas de stockage en cache des templates rendus
- Gestion des connexions SMTP

## Tests et Debugging

### 1. Tests Locaux

```typescript
// En développement, utilise nodemailer
console.info('Utilisation de nodemailer pour le développement...')
```

### 2. Logs de Debug

```typescript
console.info(`Email envoyé avec succès à ${to} via ${service}`)
console.error(`Erreur lors de l'envoi de l'email à ${to}:`, error)
```

### 3. Validation des Templates

- Test de rendu de chaque template
- Vérification des props requises
- Test d'envoi en environnement de développement

## Conclusion

Le système d'email de cette application est conçu pour être robuste, extensible et maintenable. Il supporte différents environnements, gère les erreurs de manière appropriée, et utilise des templates Vue.js pour une personnalisation facile. L'architecture modulaire permet d'ajouter facilement de nouveaux types d'emails et de nouveaux destinataires. 