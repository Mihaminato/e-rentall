<template>
  <div class="card bg-base-100 shadow-lg border border-warning/20">
    <div class="card-body">
      <div class="flex items-start gap-4">
        <Icon name="mdi:information" class="w-6 h-6 text-info mt-1 flex-shrink-0" />
        <div class="flex-1">
          <h4 class="font-semibold text-base mb-2">Problème de chargement ?</h4>
          <p class="text-sm text-base-content/70 mb-3">
            Si le chargement reste bloqué, voici quelques solutions :
          </p>

          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon name="mdi:numeric-1-circle" class="w-4 h-4 text-primary" />
              <span>Cliquez sur <strong>"Réessayer"</strong> pour relancer la requête</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:numeric-2-circle" class="w-4 h-4 text-primary" />
              <span>Utilisez <strong>"Vider le cache"</strong> si le problème persiste</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mdi:numeric-3-circle" class="w-4 h-4 text-primary" />
              <span>En dernier recours, actualisez la page (F5)</span>
            </div>
          </div>

          <div class="mt-3 p-2 bg-base-200 rounded text-xs text-base-content/60">
            💡 Ces problèmes sont généralement causés par une session expirée ou une connexion
            instable.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Composant d'aide pour résoudre les problèmes de session
</script>
