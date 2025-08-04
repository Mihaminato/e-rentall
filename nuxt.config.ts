// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  devtools: { enabled: true },
  debug: true,

  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        autoInstall: true
      })
    ],
    css: {
      devSourcemap: true
    },
    build: {
      sourcemap: process.env.NODE_ENV === 'development'
    }
  },
  css: ['~/assets/app.css', '~/assets/css/swiper-custom.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    // Utiliser injectManifest au lieu de generateSW pour éviter l'erreur ProxyTarget
    // Désactiver workbox qui cause l'erreur
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: 'module'
    },
    manifest: {
      name: 'Location Voitures Madagascar',
      short_name: 'E-Rentall',
      description: 'Location de voitures entre particuliers à Madagascar',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon'
        },
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      categories: ['travel', 'business'],
      lang: 'fr',
      dir: 'ltr',
      prefer_related_applications: false
    }
  },

  // Configuration des icônes pour la production
  icon: {
    serverBundle: {
      collections: ['mdi'] // Spécifier uniquement les collections utilisées
    },
    clientBundle: {
      scan: true, // Scanner automatiquement les icônes utilisées
      sizeLimitKb: 256 // Limiter la taille du bundle client
    },
    mode: 'css' // Utiliser le mode CSS pour de meilleures performances
  },
  runtimeConfig: {
    mail: {
      smtp: {
        host: process.env.SMTP_HOST || '',
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || ''
        }
      }
    },
    mailFromAddress: process.env.MAIL_FROM_ADDRESS || '',
    public: {
      appName: 'location-voitures-madagascar',
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || ''
    }
  },

  // Configuration hybride optimale pour blog + app interactive
  routeRules: {
    // 🏠 Landing page et pages statiques - SSR pour SEO
    '/': { ssr: true, prerender: true },
    '/how-it-works': { ssr: true, prerender: true },
    '/terms': { ssr: true, prerender: true },
    '/privacy': { ssr: true, prerender: true },
    '/contact': { ssr: true, prerender: true },
    '/about': { ssr: true, prerender: true },

    // 🚗 Section véhicules - CSR pour interactivité (filtres, recherche)
    '/vehicles': { ssr: false },
    '/vehicles/**': { ssr: false },

    // 👤 Pages utilisateur publiques - SSR pour SEO mais sans prerender
    '/users/**': { ssr: true, prerender: false },

    // 🔒 Pages protégées - CSR obligatoire
    '/admin/**': { ssr: false },
    '/profile/**': { ssr: false },
    '/vehicles/my-vehicles': { ssr: false },
    '/bookings/**': { ssr: false },
    '/messages/**': { ssr: false },
    '/auth/**': { ssr: false }
  },

  // Optimisations de performance
  nitro: {
    rollupConfig: {
      plugins: [vue()]
    },
    esbuild: {
      options: {
        target: 'es2020'
      }
    }
    // // Configuration pour résoudre les problèmes avec vue-email
    // experimental: {
    //   wasm: true
    // },
    // // Exclure les modules problématiques du bundling
    // externals: {
    //   inline: ['vue-mail', 'nodemailer']
    // }
  },

  // Optimisation des ressources
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Location de voitures entre particuliers à Madagascar'
        },
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  },

  // Configuration des plugins
  plugins: ['~/plugins/dayjs.client.ts', '~/plugins/supabase.client.ts'],

  // Configuration de build
  build: {
    transpile: ['@headlessui/vue']
  },

  // Optimisation du cache pour les pages CSR
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false
  },

  // Configuration TypeScript
  typescript: {
    typeCheck: false
  }
})
