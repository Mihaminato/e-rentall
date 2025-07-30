// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

// Configuration ESLint personnalisée pour le projet vehicul_location
export default withNuxt([
  {
    rules: {
      // Formatage du code
      'semi': ['warn', 'never'],
      'comma-dangle': ['warn', 'never'],
      'quotes': ['warn', 'single', { 'avoidEscape': true }],
      
      // Règles Vue
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        }
      }],
      
      // Clean code
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 10],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 4]
    }
  },
  
  // Exception pour les composables Vue
  {
    files: ['**/composables/*.ts'],
    rules: {
      'max-lines-per-function': 'off'
    }
  },
  
  // Configuration TypeScript
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  
  // Ignorer certains fichiers
  {
    ignores: [
      '**/.nuxt',
      '**/node_modules',
      '**/dist',
      '**/public',
      '**/coverage',
      '**/sw.*'
    ]
  }
])
