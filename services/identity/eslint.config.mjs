import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginCheckFile from 'eslint-plugin-check-file';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['coverage', 'dist', 'migrations', 'resources']),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true, // Enables "lint with type information"
      },
    },
    extends: [
      // "eslint"
      eslint.configs.recommended,

      // "typescript-eslint"
      tseslint.configs.strictTypeChecked, // "strict" with type information
      tseslint.configs.stylisticTypeChecked, // "stylistic" with type information
    ],
    plugins: { 'check-file': eslintPluginCheckFile },
    rules: {
      // "eslint"
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['..', '../**', 'src/*', 'tests/*'],
              message: 'Use "@/" or "@tests/" instead',
            },
            {
              group: ['@/lib/drizzle/schemas/*'],
              message: 'Use "@/lib/drizzle/schemas" instead',
            },
          ],
        },
      ],

      // "typescript-eslint"
      '@typescript-eslint/no-floating-promises': 'error',

      // "eslint-plugin-check-file"
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.ts': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { '{src,tests}/**': 'KEBAB_CASE' },
      ],
    },
  },
  eslintConfigPrettier, // "eslint-config-prettier": must be placed last
]);
