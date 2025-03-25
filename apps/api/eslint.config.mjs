import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },

  // Config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.node,
    },
    extends: [
      // "eslint" and "typescript-eslint"
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,

      // "eslint-config-prettier": Needs to be at the end
      eslintConfigPrettier,
    ],
    plugins: {
      'check-file': checkFile, // "eslint-plugin-check-file"
    },
    rules: {
      // "eslint": Prevent imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../**', 'src/*'], message: "Use '@/' instead" },
          ],
        },
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
