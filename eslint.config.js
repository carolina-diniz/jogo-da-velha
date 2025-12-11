import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import { readFileSync } from 'fs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const prettierrcJson = JSON.parse(readFileSync('./.prettierrc', 'utf-8'));

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: ['dist', 'commitlint.config.cjs', 'vite.config.ts'],
    rules: {
      'arrow-spacing': ['warn', { before: true, after: true }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'eol-last': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'log', 'error', 'assert', 'debug'] }],
      'no-debugger': 'warn',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      ],

      // New One TypeScript specific rules
      'spaced-comment': 'error',
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      curly: ['error', 'multi-line', 'consistent'],
      'dot-location': ['error', 'property'],
      'handle-callback-err': 'off',
      'keyword-spacing': 'error',
      'max-nested-callbacks': ['error', { max: 4 }],
      'max-statements-per-line': ['error', { max: 2 }],
      'no-empty-function': 'error',
      'no-floating-decimal': 'error',
      'no-inline-comments': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
      'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
      'no-trailing-spaces': ['error'],
      'no-var': 'error',
      'no-undef': 'off',
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      yoda: 'error',
      'no-alert': 'error',
      'no-labels': 'error',

      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNumber: false,
          allowNullableObject: true,
          allowNullableBoolean: false,
          allowNullableString: false,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '^_$',
            match: true,
          },
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase', 'UPPER_CASE'],
          prefix: [
            'is',
            'IS_',
            'should',
            'SHOULD_',
            'has',
            'HAS_',
            'can',
            'CAN_',
            'did',
            'DID_',
            'will',
            'WILL_',
            'was',
            'WAS_',
          ],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        },
        {
          // Rule to accept numbers as key/property
          selector: 'objectLiteralProperty',
          format: [],
          filter: {
            regex: '^[0-9]+$',
            match: true,
          },
        },
      ],
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'off',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      // Custom Prettier rules
      'prettier/prettier': ['error', prettierrcJson],
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
]);
