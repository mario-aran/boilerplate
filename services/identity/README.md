# TypeScript + Node.js + Express.js + PostgreSQL

This template was created manually.

---

## Development instructions

Prepare code

- `pnpm run clean`: Delete git ignored files
- `pnpm run format:eol`: (Optional) Convert all files to LF
- `pnpm install`: Install dependencies
- `pnpm approve-builds`: (Optional) Approve post-install scripts
- `pnpm up --latest`: (Optional) Update dependencies to the last version

Prepare database

- `pnpm run db:generate`: Update migration files
- `pnpm run db:migrate`: Run migrations
- `pnpm run db:seed:dev`: Seed database with development data

Format

- `pnpm run format`: Prettier
- `pnpm run lint`: Linter and typechecker
- `pnpm run build`: Build app and check compiler types

Test

- `pnpm run test:unit`: Run unit tests in watch mode
- `pnpm run test:e2e`: Run e2e and integration tests in watch mode
- `pnpm run test`: Run all tests in watch mode
- `pnpm run test:coverage`: Run test coverage

Start

- `pnpm run dev`: Run application in development and watch mode
- `pnpm run dev:workers`: Run workers in development

Tools

- `pnpm run repl`: Run REPL
- Debuggers: In "multi-root.code-workspace" mode, Open a file -> Select "Run and Debug" -> Choose debugger in dropdown menu

## Configs

- [x] .vscode/launch.json
- [x] resources/identity.postman_collection.json
- [x] .env.dev
- [x] .gitignore
- [x] .prettierignore | .prettierrc.json
- [x] drizzle.config.ts
- [x] eslint.config.mjs
- [x] package.json | pnpm-lock.yaml | pnpm-workspace.yaml
- [x] README.md
- [x] tsconfig.build.json | tsconfig.json
- [x] vitest.config.ts

## Dependencies

- [x] typescript | @types/node
  - tsx | tsc-alias
- [x] prettier
- [x] typescript-eslint | eslint | @eslint/js | globals
  - eslint-config-prettier
  - eslint-plugin-check-file
- [x] vitest | vitest/coverage-v8
  - supertest | @types/supertest
  - testcontainers | @testcontainers/postgresql | @testcontainers/redis
- [x] drizzle-orm | drizzle-kit | pg | @types/pg
- [x] bullmq | ioredis
- [x] express | @types/express
  - swagger-ui-express | @types/swagger-ui-express
  - cors | @types/cors
- [x] dotenv
- [x] http-status-codes
- [x] winston | morgan | @types/morgan
- [x] nodemailer | @types/nodemailer
- [x] zod
- [x] passport | @types/passport
  - passport-jwt | @types/passport-jwt
  - jsonwebtoken | @types/jsonwebtoken
  - bcryptjs
- [x] @faker-js/faker
