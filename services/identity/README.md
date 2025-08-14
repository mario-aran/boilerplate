# TypeScript + Node.js + Express.js + PostgreSQL

This template was created manually.

---

## Development instructions

Prepare project

- `pnpm run clean:ignored`: Delete git ignored files
- `cp .env.dev .env`: Create .env file
- `pnpm install`: Install dependencies
- `pnpm up --latest`: (Optional) Update dependencies to the last version

Prepare database

- `pnpm run db:generate`: Update migration files
- `pnpm run db:migrate`: Run migrations
- `pnpm run db:seed:dev`: Seed database with development data

Start app

- `pnpm run dev`: Run application in development mode
- `pnpm run workers:dev`: Run workers in development mode

Debugging

- `pnpm run db:repl`: Run drizzle REPL

Formatting

- `pnpm run format:lf`: (Optional) Convert all files to LF
- `pnpm run format:code`: Prettier
- `pnpm run format:lint`: Linter and typechecker
- `pnpm run build`: Build app and check compiler types

Testing

- `pnpm run test`: Run tests
- `pnpm run test:coverage`: Run test coverage

## Dependencies

- [x] typescript | @types/node
      tsx | tsc-alias
- [x] prettier
- [x] typescript-eslint | eslint | @eslint/js | globals
      eslint-config-prettier
      eslint-plugin-check-file
- [x] vitest | vitest/coverage-v8
      supertest | @types/supertest
- [x] drizzle-orm | drizzle-kit | pg | @types/pg
      @faker-js/faker
- [x] express | @types/express
      swagger-ui-express | @types/swagger-ui-express
      http-status-codes
      dotenv
      cors | @types/cors
      winston | morgan | @types/morgan
- [x] zod
- [x] passport | @types/passport
      passport-jwt | @types/passport-jwt
      jsonwebtoken | @types/jsonwebtoken
      bcryptjs
- [x] bullmq | ioredis
      nodemailer | @types/nodemailer

## Configs

- [x] resources/identity.postman_collection.json
- [x] .env.dev
- [x] .gitignore
- [x] .prettierignore | .prettierrc.json
- [x] drizzle.config.ts
- [x] eslint.config.mjs
- [x] package.json
- [x] pnpm-lock.yaml | pnpm-workspace.yaml
- [x] README.md
- [x] tsconfig.json
- [x] vitest.config.ts
