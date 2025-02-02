import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import nextPlugin from '@next/eslint-plugin-next'
import globals from 'globals'

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '.next/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: '18.2.0',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      sonarjs: sonarjsPlugin,
      next: nextPlugin,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',

      // React
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-handler-names': 'error',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/no-unescaped-entities': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // SonarJS
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['warn', { threshold: 3 }],
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/no-nested-template-literals': 'warn',

      // General
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-var': 'warn',
      'prefer-const': 'error',
      'spaced-comment': ['warn', 'always'],
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },
  {
    files: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
      'jest.setup.js',
      'jest.config.js',
      'jest.global-setup.js',
      'jest.global-teardown.js',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['next.config.js', '*.config.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['pages/**/*.[jt]sx', 'pages/api/**/*.[jt]s'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    files: ['*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'spaced-comment': 'off',
    },
  },
  {
    files: ['prisma/**/*.ts'],
    rules: {
      'no-var': 'off',
    },
  },
  {
    files: ['tools/**/*.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-empty': 'warn',
    },
  },
]
