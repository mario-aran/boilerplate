# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## To-Do

### Installers

- [x] github repo
- [x] pnpm
- [x] vite | react | typescript
- [x] prettier
      [x] prettier-plugin-tailwindcss
- [x] typescript-eslint | eslint
      [x] eslint-plugin-react-hooks
      [x] eslint-plugin-react-refresh
      [x] eslint-plugin-check-file
      [x] eslint-config-prettier
- [x] shadcn | tailwindcss
- [x] testing-library | vitest
- [x] cypress
- [x] react-router
- [x] react-hook-form | zod
- [x] tanstack-query
- [x] zustand
- [x] i18next

### Configs

- [x] settings.json (vscode)
- [x] .editorconfig
- [x] .env
- [x] .gitignore
- [x] .prettierignore
- [x] .prettierrc.json
- [x] components.json (shadcn/ui)
- [x] cypress.config.js
- [x] eslint.config.js
- [x] package.json
- [x] tsconfig.json | tsconfig.app.json
- [x] vite.config

### Code

- [x] implement i18next
- [x] prefer shadcn/ui imports in eslint instead of other libs
- [ ] add language-select
- [ ] add one notification when singup register fails
- [ ] refactor auth form component, so it can be reused on login and register
- [ ] use env vars on cypress.config.js
- [ ] add auth flow with a backend
- [ ] e2e tests
