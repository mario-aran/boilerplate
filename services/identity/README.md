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
- `pnpm run db:seed:dev`: Seed dev data

Testing

- `pnpm run test`: Run tests
- `pnpm run test:coverage`: Run coverage

Launch app

- `pnpm run dev`: Run app in development mode
- "http://localhost:3000": Entrypoint

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
- [x] http-status-codes
- [x] dotenv
- [x] cors | @types/cors
- [x] zod
- [x] passport | @types/passport
      passport-jwt | @types/passport-jwt
      jsonwebtoken | @types/jsonwebtoken
      bcryptjs
- [x] nodemailer | @types/nodemailer

## Configs

- [x] resources/auth.postman_collection.json
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
