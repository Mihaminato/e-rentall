<template>
  <div v-if="canInstall" class="mb-6 text-center">
    <button
      class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
      @click="installApp"
    >
      <Icon name="mdi:download" class="w-6 h-6 text-accent" />
      Installer l'application
    </button>
    <p class="text-sm text-white/80 mt-2">Accès rapide depuis votre écran d'accueil</p>
  </div>
</template>

<script setup lang="ts">
  // Utiliser le plugin PWA Nuxt
  const { $pwa } = useNuxtApp()

  // Variables réactives PWA
  const canInstall = ref(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deferredPrompt = ref<any>(null)
  const isDev = ref(process.env.NODE_ENV === 'development')

  // Fonction d'installation PWA
  const installApp = async () => {
    console.log("🚀 Tentative d'installation PWA...")

    try {
      // Utiliser le plugin PWA Nuxt s'il est disponible
      if ($pwa && typeof $pwa.install === 'function') {
        console.log('Utilisation de $pwa.install()')
        await $pwa.install()
        console.log('✅ Installation réussie via $pwa.install()')
        canInstall.value = false
        return
      }

      // Fallback avec deferredPrompt
      if (deferredPrompt.value) {
        console.log('Utilisation de deferredPrompt')
        deferredPrompt.value.prompt()
        const { outcome } = await deferredPrompt.value.userChoice
        console.log('Résultat installation:', outcome)

        if (outcome === 'accepted') {
          console.log("✅ Installation acceptée par l'utilisateur")
          canInstall.value = false
        } else {
          console.log("❌ Installation refusée par l'utilisateur")
          canInstall.value = true
        }

        deferredPrompt.value = null
      } else {
        console.log("❌ Aucune méthode d'installation disponible")
        console.log('$pwa:', $pwa)
        console.log('deferredPrompt:', deferredPrompt.value)
      }
    } catch (error) {
      console.error("Erreur lors de l'installation:", error)
      alert("Erreur lors de l'installation de l'application.")
      canInstall.value = true
    }
  }

  // Configuration PWA au montage
  onMounted(() => {
    console.log('🔧 PwaInstallButton monté')
    console.log('🔍 Plugin PWA disponible:', !!$pwa)

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🚀 Événement beforeinstallprompt détecté')
      e.preventDefault()
      deferredPrompt.value = e
      canInstall.value = true
      console.log('✅ canInstall mis à true via beforeinstallprompt')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Vérifier si l'app est déjà installée
    const checkInstallationStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isIOSInstalled = (window.navigator as any).standalone === true

      if (isStandalone || isIOSInstalled) {
        console.log('App déjà installée')
        canInstall.value = false
        return true
      }
      return false
    }

    // Vérification initiale
    if (!checkInstallationStatus()) {
      // Vérifier si le plugin PWA indique qu'on peut installer
      if ($pwa) {
        console.log('État du plugin PWA:', {
          showInstallPrompt: $pwa.showInstallPrompt,
          isInstalled: $pwa.isInstalled,
          needRefresh: $pwa.needRefresh
        })

        if ($pwa.showInstallPrompt && !$pwa.isInstalled) {
          canInstall.value = true
          console.log('✅ canInstall activé via $pwa.showInstallPrompt')
        }
      }
    }

    // En mode développement, forcer l'affichage après un délai
    if (isDev.value) {
      console.log('🔧 Mode développement détecté')
      setTimeout(() => {
        if (!canInstall.value && !checkInstallationStatus()) {
          canInstall.value = true
          console.log('✅ canInstall forcé en mode développement')
        }
      }, 2000)
    }

    // Nettoyer l'écouteur au démontage
    onUnmounted(() => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    })
  })

  // Watcher pour les changements d'état PWA
  if ($pwa) {
    watch(
      () => $pwa.showInstallPrompt,
      newVal => {
        console.log('$pwa.showInstallPrompt changé:', newVal)
        if (newVal && !$pwa.isInstalled) {
          canInstall.value = true
        }
      }
    )

    watch(
      () => $pwa.isInstalled,
      newVal => {
        console.log('$pwa.isInstalled changé:', newVal)
        if (newVal) {
          canInstall.value = false
        }
      }
    )
  }
</script>
