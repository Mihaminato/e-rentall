# Système de Vues pour les Véhicules

## 1. Structure de Base de Données

### Table `vehicle_views`
```sql
CREATE TABLE vehicle_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  viewer_ip INET, -- Adresse IP pour les visiteurs non connectés
  viewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Utilisateur connecté (optionnel)
  user_agent TEXT, -- Navigateur pour éviter les doubles comptages
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT, -- ID de session pour éviter les vues multiples
  
  -- Index pour les performances
  INDEX idx_vehicle_views_vehicle_id ON vehicle_views(vehicle_id),
  INDEX idx_vehicle_views_viewed_at ON vehicle_views(viewed_at),
  
  -- Contrainte pour éviter les doublons dans une session
  UNIQUE(vehicle_id, session_id)
);
```

### Mise à jour de la table `vehicles`
```sql
-- Ajouter une colonne pour stocker le nombre total de vues
ALTER TABLE vehicles ADD COLUMN views_count INTEGER DEFAULT 0;

-- Créer une fonction pour mettre à jour le compteur
CREATE OR REPLACE FUNCTION update_vehicle_views_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE vehicles 
    SET views_count = views_count + 1 
    WHERE id = NEW.vehicle_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE vehicles 
    SET views_count = views_count - 1 
    WHERE id = OLD.vehicle_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger
CREATE TRIGGER trigger_update_vehicle_views_count
  AFTER INSERT OR DELETE ON vehicle_views
  FOR EACH ROW
  EXECUTE FUNCTION update_vehicle_views_count();
```

## 2. Politique de Sécurité RLS

```sql
-- Activer RLS sur la table
ALTER TABLE vehicle_views ENABLE ROW LEVEL SECURITY;

-- Politique pour l'insertion (tout le monde peut créer une vue)
CREATE POLICY "Anyone can create vehicle views" ON vehicle_views
  FOR INSERT WITH CHECK (true);

-- Politique pour la lecture (propriétaires peuvent voir leurs stats)
CREATE POLICY "Vehicle owners can view their stats" ON vehicle_views
  FOR SELECT USING (
    vehicle_id IN (
      SELECT id FROM vehicles WHERE owner_id = auth.uid()
    )
  );
```

## 3. Implémentation Frontend

### Composable `useVehicleViews.ts`
```typescript
export const useVehicleViews = () => {
  const { $supabase } = useNuxtApp()
  
  // Enregistrer une vue
  const recordView = async (vehicleId: string) => {
    try {
      // Générer un ID de session unique
      const sessionId = sessionStorage.getItem('session_id') || 
        crypto.randomUUID()
      
      if (!sessionStorage.getItem('session_id')) {
        sessionStorage.setItem('session_id', sessionId)
      }
      
      // Enregistrer la vue
      await $supabase
        .from('vehicle_views')
        .insert({
          vehicle_id: vehicleId,
          session_id: sessionId,
          user_agent: navigator.userAgent,
          viewer_id: (await $supabase.auth.getUser()).data.user?.id || null
        })
        
    } catch (error) {
      // Ignorer les erreurs de doublon (contrainte unique)
      if (!error.message?.includes('duplicate key')) {
        console.error('Erreur lors de l\'enregistrement de la vue:', error)
      }
    }
  }
  
  // Récupérer les stats de vues pour un propriétaire
  const getViewsStats = async (vehicleId: string) => {
    const { data, error } = await $supabase
      .from('vehicle_views')
      .select('*')
      .eq('vehicle_id', vehicleId)
      .order('viewed_at', { ascending: false })
    
    if (error) throw error
    
    return {
      total: data.length,
      today: data.filter(v => 
        new Date(v.viewed_at).toDateString() === new Date().toDateString()
      ).length,
      thisWeek: data.filter(v => {
        const viewDate = new Date(v.viewed_at)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return viewDate >= weekAgo
      }).length,
      thisMonth: data.filter(v => {
        const viewDate = new Date(v.viewed_at)
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return viewDate >= monthAgo
      }).length
    }
  }
  
  return {
    recordView,
    getViewsStats
  }
}
```

### Usage dans la page véhicule
```vue
<script setup>
const { recordView } = useVehicleViews()

onMounted(async () => {
  await fetchVehicleById(vehicleId.value)
  
  // Enregistrer la vue après chargement du véhicule
  if (vehicle.value) {
    await recordView(vehicle.value.id)
  }
})
</script>
```

## 4. Mise à jour du Composant Stats

Le composant `VehicleOwnerStats.vue` devra recevoir les vraies données :

```vue
<script setup>
const { getViewsStats } = useVehicleViews()

const viewsStats = ref({
  total: 0,
  today: 0,
  thisWeek: 0,
  thisMonth: 0
})

onMounted(async () => {
  if (props.vehicle.id) {
    viewsStats.value = await getViewsStats(props.vehicle.id)
  }
})
</script>
```

## 5. Analytics Avancées (Future)

### Table pour les événements détaillés
```sql
CREATE TABLE vehicle_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'view', 'contact', 'favorite', 'share'
  viewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  metadata JSONB, -- Données supplémentaires
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Métriques calculées
- Taux de conversion (vues → demandes de contact)
- Sources de trafic
- Durée de session
- Pages les plus vues
- Heures de pointe

## 6. Optimisations

### Caching
```typescript
// Cache les vues pour éviter les requêtes répétées
const viewsCache = new Map()

const getCachedViews = (vehicleId: string) => {
  const cached = viewsCache.get(vehicleId)
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 min
    return cached.data
  }
  return null
}
```

### Batch Processing
```sql
-- Fonction pour traiter les vues en batch
CREATE OR REPLACE FUNCTION process_view_batch()
RETURNS void AS $$
BEGIN
  -- Traitement des vues en lot pour optimiser les performances
  UPDATE vehicles 
  SET views_count = (
    SELECT COUNT(*) 
    FROM vehicle_views 
    WHERE vehicle_id = vehicles.id
  )
  WHERE updated_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;
```

## 7. Implémentation Progressive

1. **Phase 1** : Table de base + compteur simple
2. **Phase 2** : Analytics détaillées + graphiques
3. **Phase 3** : Machine learning pour recommandations
4. **Phase 4** : Système de notifications temps réel 