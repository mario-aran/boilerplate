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

### Configs

- [x] vscode settings.json | vscode extensions
- [x] .gitignore
- [x] package.json
- [x] tsconfig.json | tsconfig.app.json: absolute paths
- [x] vite.config: server port, absolute paths
- [x] .editorconfig
- [x] .prettierrc.json
- [x] eslint.config
- [x] .env
- [x] components.json (shadcn/ui)

### Installers

- [x] pnpm (global)
- [x] vite | react | typescript
- [x] github repo | git init | git push
- [x] prettier | prettier-plugin-tailwindcss
- [x] eslint | typescript-eslint
      eslint-plugin-react-hooks
      eslint-plugin-react-refresh
      eslint-plugin-check-file
      eslint-config-prettier
      tanstack/eslint-plugin-query
- [x] tailwindcss | shadcn/ui | radix-ui | lucide-react
- [x] react-router
- [x] react-hook-form | hookform/resolvers | zod
- [x] tanstack-query
- [x] zustand
- [ ] jest | testing-library
- [ ] cypress

### Code

- [x] setup config folder: envs
- [x] setup app folder: router, provider, routes (home, not-found)
- [x] layout: navbar, footer
- [x] shadcn components
- [x] custom-ui
- [ ] setup unit and e2e tests
- [ ] add notification when singup register fails
- [ ] migrate to tailwind v4 with shadcn
