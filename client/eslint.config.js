import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// "tseslint.config" allows types here
export default tseslint.config(
  // Ignores
  { ignores: ['dist'] },

  // Config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    extends: [
      js.configs.recommended, // "eslint"
      ...tseslint.configs.strict, // "typescript-eslint"
      ...tseslint.configs.stylistic, // "typescript-eslint"
      ...pluginQuery.configs['flat/recommended'], // "@tanstack/react-query"
      eslintConfigPrettier, // "eslint-config-prettier": Needs to be at the end
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'check-file': checkFile,
    },
    rules: {
      // "eslint"
      'no-restricted-imports': [
        'error',
        { patterns: ['src', '../**', '@/*/*/*/*', './*/*/*/*'] },
      ], // Prevent specific path imports

      // "eslint-plugin-react-hooks"
      ...reactHooks.configs.recommended.rules,

      // "eslint-plugin-react-refresh"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // "eslint-plugin-check-file": Force naming conventions
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
);
