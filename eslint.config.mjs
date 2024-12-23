import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/dist', '**/.amplify'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ),
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
      import: importPlugin,
      react: reactPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      semi: [2, 'never'],
      'no-unexpected-multiline': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      quotes: ['error', 'single'],
      'no-implicit-coercion': 'error',
      'prefer-template': 'error',
      'react/jsx-no-leaked-render': [
        'error',
        {
          validStrategies: ['ternary'],
        },
      ],
      'no-fallthrough': ['error', { commentPattern: 'fallthrough' }],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'internal',
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'never',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
    },
  },
]
