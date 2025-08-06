import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour créer un SVG avec la taille spécifiée
function createSizedSVG(size) {
  const svgContent = fs.readFileSync(path.join(__dirname, '../assets/imgs/e-rentall-main.svg'), 'utf8');
  
  // Créer un nouveau SVG avec la taille spécifiée
  const sizedSVG = svgContent.replace(
    'viewBox="0 0 750.28 343.65"',
    `viewBox="0 0 750.28 343.65" width="${size}" height="${size}"`
  );
  
  return sizedSVG;
}

// Fonction pour convertir SVG en PNG avec Sharp
async function convertSVGtoPNG(size, filename) {
  try {
    const sizedSVG = createSizedSVG(size);
    const outputPath = path.join(__dirname, `../public/${filename}`);
    
    // Créer le dossier public s'il n'existe pas
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Convertir SVG en PNG avec Sharp
    await sharp(Buffer.from(sizedSVG))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Créé ${filename} (${size}x${size})`);
  } catch (error) {
    console.error(`❌ Erreur lors de la création de ${filename}:`, error.message);
  }
}

// Générer toutes les icônes
console.log('🎨 Génération de toutes les icônes E-Rentall...');
console.log('');

// Générer les icônes PWA
console.log('📱 Icônes PWA :');
await convertSVGtoPNG(192, 'e-rentall-icon-192x192.png');
await convertSVGtoPNG(512, 'e-rentall-icon-512x512.png');

console.log('');
console.log('🌐 Favicon :');
await convertSVGtoPNG(32, 'favicon.png');

console.log('');
console.log('✅ Toutes les icônes ont été générées avec succès !');
console.log('');
console.log('📁 Fichiers créés :');
console.log('   - favicon.png (onglet du navigateur)');
console.log('   - e-rentall-icon-192x192.png (PWA mobile)');
console.log('   - e-rentall-icon-512x512.png (PWA desktop)');
console.log('');
console.log('🚀 Redémarrez votre serveur de développement pour voir les changements.'); 