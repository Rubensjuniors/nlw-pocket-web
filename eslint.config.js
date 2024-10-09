import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin
    },
    rules: {
      'no-var': 'error', // Desativa o uso de `var`
      quotes: ['error', 'single'], // Enforce aspas simples
      'max-lines': ['warn', { max: 132 }], // Máximo de 80 linhas por arquivo
      'no-unused-vars': 'warn', // Aviso para variáveis não utilizadas
      '@typescript-eslint/no-unused-vars': ['warn'], // Aviso para variáveis não utilizadas no TypeScript
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'prettier/prettier': 'error', // Integração com Prettier
      ...reactHooks.configs.recommended.rules, // Regras recomendadas do React Hooks
      'react/react-in-jsx-scope': 'off'
    }
  },
  prettier
]
