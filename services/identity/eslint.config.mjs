import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginCheckFile from 'eslint-plugin-check-file';
import eslintPluginJest from 'eslint-plugin-jest';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['coverage', 'dist', 'migrations', 'resources']),
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022, // Should match target version in "tsconfig.json"
      globals: {
        ...eslintPluginJest.environments.globals.globals,
        ...globals.node,
      },
    },
    extends: [
      // "eslint"
      eslint.configs.recommended,

      // "typescript-eslint"
      tseslint.configs.strict,
      tseslint.configs.stylistic,
    ],
    plugins: {
      jest: eslintPluginJest,
      'check-file': eslintPluginCheckFile,
    },
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

  // "eslint-config-prettier": Must be placed last
  eslintConfigPrettier,
]);
