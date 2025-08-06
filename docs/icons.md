# Icônes E-Rentall

## Génération des icônes

Pour générer toutes les icônes de l'application à partir du logo SVG :

```bash
yarn icons
```

Cette commande génère :
- `favicon.png` (32x32) - Icône de l'onglet du navigateur
- `e-rentall-icon-192x192.png` (192x192) - Icône PWA pour mobile
- `e-rentall-icon-512x512.png` (512x512) - Icône PWA pour desktop

## Fichiers source

- **Logo source** : `assets/imgs/e-rentall-main.svg`
- **Icônes générées** : `public/`

## Configuration

### Favicon (onglet du navigateur)
Configuré dans `nuxt.config.ts` :
```typescript
app: {
  head: {
    title: 'E-Rentall - Location de voitures entre particuliers à Madagascar',
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/e-rentall-icon-192x192.png' },
      { rel: 'mask-icon', href: '/favicon.png', color: '#e2725b' }
    ]
  }
}
```

### Icônes PWA
Configurées dans `nuxt.config.ts` :
```typescript
pwa: {
  manifest: {
    icons: [
      {
        src: '/e-rentall-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/e-rentall-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
```

## Métadonnées

### Couleurs du thème
- **Primary** : `#e2725b` (orange)
- **Secondary** : `teal` (vert-bleu)

### Titre de l'application
- **Nom complet** : "Location Voitures Madagascar"
- **Nom court** : "E-Rentall"
- **Description** : "Location de voitures entre particuliers à Madagascar"

## Notes techniques

- Les icônes sont générées à partir du logo SVG source
- Utilisation de Sharp pour la conversion SVG → PNG
- Format PNG pour une meilleure compatibilité
- Tailles optimisées pour chaque usage (favicon, PWA mobile, PWA desktop) 