/**
 * Composable pour gérer les fonctionnalités PWA
 * Simplifie l'accès aux méthodes et états PWA dans les composants
 */
export const usePwa = () => {
  const { $pwa } = useNuxtApp()
  
  // États réactifs PWA
  const isInstalled = computed(() => {
    if (!$pwa) return false
    return $pwa.isInstalled || window?.matchMedia?.('(display-mode: standalone)')?.matches || false
  })
  
  const canInstall = computed(() => {
    if (!$pwa) return false
    return $pwa.showInstallPrompt && !isInstalled.value
  })
  
  const needsUpdate = computed(() => {
    if (!$pwa) return false
    return $pwa.needRefresh || false
  })
  
  const isOfflineReady = computed(() => {
    if (!$pwa) return false
    return $pwa.offlineReady || false
  })
  
  // Méthodes PWA
  const install = async () => {
    try {
      if ($pwa && typeof $pwa.install === 'function') {
        console.log('🚀 Installation PWA via $pwa.install()')
        await $pwa.install()
        return true
      }
      console.warn('⚠️ Méthode $pwa.install() non disponible')
      return false
    } catch (error) {
      console.error('❌ Erreur lors de l\'installation PWA:', error)
      return false
    }
  }
  
  const updateServiceWorker = async () => {
    try {
      if ($pwa && typeof $pwa.updateServiceWorker === 'function') {
        console.log('🔄 Mise à jour du service worker')
        await $pwa.updateServiceWorker()
        return true
      }
      console.warn('⚠️ Méthode $pwa.updateServiceWorker() non disponible')
      return false
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour:', error)
      return false
    }
  }
  
  // Utilitaires
  const checkPwaSupport = () => {
    if (typeof window === 'undefined') return false
    
    const isHTTPS = location.protocol === 'https:' || location.hostname === 'localhost'
    const hasServiceWorker = 'serviceWorker' in navigator
    const hasManifest = document.querySelector('link[rel="manifest"]') !== null
    
    return {
      isHTTPS,
      hasServiceWorker,
      hasManifest,
      supported: isHTTPS && hasServiceWorker && hasManifest
    }
  }
  
  const getInstallationPromptSupport = () => {
    if (typeof window === 'undefined') return false
    
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    const isEdge = /Edge/.test(navigator.userAgent)
    const isSamsung = /SamsungBrowser/.test(navigator.userAgent)
    
    return isChrome || isEdge || isSamsung
  }
  
  // Debug pour le développement
  const debugPwaState = () => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 État PWA Debug')
      console.log('Plugin $pwa disponible:', !!$pwa)
      
      if ($pwa) {
        console.log('États PWA:', {
          isInstalled: isInstalled.value,
          canInstall: canInstall.value,
          needsUpdate: needsUpdate.value,
          isOfflineReady: isOfflineReady.value,
          showInstallPrompt: $pwa.showInstallPrompt,
          needRefresh: $pwa.needRefresh,
          offlineReady: $pwa.offlineReady
        })
      }
      
      console.log('Support PWA:', checkPwaSupport())
      console.log('Support installation prompt:', getInstallationPromptSupport())
      console.groupEnd()
    }
  }
  
  return {
    // États
    isInstalled,
    canInstall,
    needsUpdate,
    isOfflineReady,
    
    // Méthodes
    install,
    updateServiceWorker,
    
    // Utilitaires
    checkPwaSupport,
    getInstallationPromptSupport,
    debugPwaState,
    
    // Accès direct au plugin (si besoin)
    $pwa
  }
}