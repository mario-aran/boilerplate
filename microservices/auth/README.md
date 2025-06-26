# TypeScript + Node.js + Express.js + PostgreSQL

This template was created manually.

---

## Development instructions

Prepare code

- `pnpm run delete:ignored`: Delete ignored files
- `pnpm run files:to-lf`: Convert files to LF
- `cp .env.dev .env`: Create .env file

Manage dependencies

- `pnpm install`: Install dependencies
- `pnpm up --latest`: Update dependencies

Format and lint code

- `pnpm run format`: Formatter
- `pnpm run lint`: Linter and typechecking
- `pnpm run build`: Build app and check compiler types

Prepare database

- `pnpm run db:generate`: Update migrations
- `pnpm run db:migrate`: Run migrations
- `pnpm run db:seed:fake`: Seed fake data

Testing

- `pnpm run test`: Run tests
- `pnpm run test:coverage`: Run coverage

Launch app

- `pnpm run dev`: Run app in development mode
- "http://localhost:3000/api": Access api
- "http://localhost:3000/api-docs": Access swagger ui

---

## Installers

- [x] (FS) prettier
- [x] (FS) typescript | @types/node
- [x] (FS) typescript-eslint | eslint | @eslint/js | globals
      (FS) eslint-plugin-check-file
      (FS) eslint-config-prettier
- [x] (FS) vitest | vitest/coverage-v8
- [x] (FS) zod
- [x] (BE) tsx | tsc-alias
- [x] (BE) supertest | @types/supertest
- [x] (BE) swagger-ui-express | @types/swagger-ui-express
- [x] (BE) express | @types/express
      (BE) dotenv
      (BE) cors | @types/cors
- [x] (BE) drizzle-orm | drizzle-kit | pg | @types/pg
      (BE) @faker-js/faker
- [x] (BE) passport | @types/passport
      (BE) passport-jwt | @types/passport-jwt
      (BE) jsonwebtoken | @types/jsonwebtoken
      (BE) bcryptjs

## Setups

- [x] (ROOT) .editorconfig
- [x] (FS) .env
- [x] (FS) .gitignore
- [x] (FS) .prettierignore | .prettierrc.json
- [x] (FS) eslint.config
- [x] (FS) package.json
- [x] (FS) pnpm-lock.yaml | pnpm-workspace.yaml
- [x] (FS) README.md
- [x] (FS) tsconfig.json
- [x] (BE) docker-compose.yml
- [x] (BE) drizzle.config.ts
- [x] (BE) vitest.config.ts

## To-do

- [ ] finish swagger paths
- [ ] finish swagger sort props class
- [ ] review compact vs separated lines in functions
- [ ] super_admin permissions
- [ ] add db connection error handler with retry? investigate retry
- [ ] google auth
- [ ] winston + morgan logger
- [ ] tests with supertest
