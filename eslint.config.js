import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactNoEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      reactNoEffect.configs.recommended,
      eslintJs.configs.recommended,
      eslintReact.configs["strict-typescript"]
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettierConfig,
])
