# TypeScript + Express.js + Node.js

This template was created manually.

---

# To-Do

## Instructions

1. Build & Lint
   `pnpm install`: Install dependencies
   `pnpm run format`: Run formatter
   `pnpm run lint`: Run linter and typechecking
   `pnpm run build`: Build app to check additional types

2. Database
   `docker compose up -d`: Launch database
   `pnpm run db:generate`: Update migrations
   `pnpm run db:migrate`: Run migrations
   `pnpm run db:seed:fake`: Seed fake data

3. Testing
   `pnpm run test`: Run tests
   `pnpm run test:coverage`: Run coverage

4. Launch
   `pnpm run dev`: Run app in development mode
   "http://localhost:3000/api": Access api
   "http://localhost:3000/api-docs/v1": Access swagger ui

## Installers

Installers Full-stack

- [x] prettier
- [x] typescript | @types/node
- [x] typescript-eslint | eslint | @eslint/js | globals
      eslint-plugin-check-file
      eslint-config-prettier
- [x] vitest | vitest/coverage-v8
- [x] zod

Installers Backend

- [x] tsx | tsc-alias
- [x] supertest | @types/supertest
- [x] swagger-ui-express | @types/swagger-ui-express
      @asteasolutions/zod-to-openapi
- [x] express | @types/express
      dotenv
      cors | @types/cors
- [x] drizzle-orm | drizzle-kit | pg | @types/pg
      @faker-js/faker
- [x] passport | @types/passport
      passport-jwt | @types/passport-jwt
      jsonwebtoken | @types/jsonwebtoken
      cookie-parser | @types/cookie-parser
      bcryptjs

## Setups

Setups Full-stack

- [x] .editorconfig
- [x] .gitignore
- [x] package.json
- [x] pnpm-lock.yaml | pnpm-workspace.yaml
- [x] README.md
- [x] .env
- [x] .prettierignore | .prettierrc.json
- [x] eslint.config
- [x] tsconfig.json

Setups Backend

- [x] docker-compose.yml
- [x] drizzle.config.ts
- [x] vitest.config.ts

## To-do

- [ ] finish swagger docs
- [ ] add token to swagger
- [ ] add tests with supertest
- [ ] add db connection error handler with retry? investigate retry
