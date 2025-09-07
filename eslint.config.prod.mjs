import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier: pluginPrettier,
    },
    extends: [
      js.configs.recommended,
      prettier, // disables ESLint rules that conflict with Prettier
    ],

    rules: {
      'no-unused-vars': 'error', // Strict for production
    },
  },
]);
