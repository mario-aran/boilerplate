// "drizzle": Copied from https://orm.drizzle.team/docs/get-started/postgresql-new#step-5---setup-drizzle-config-file
// "drizzle.config" is not in the rootDir of "tsconfig", so it can't use absolute imports

import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src/config/env';

export default defineConfig({
  out: './migrations', // Migrations folder
  schema: './src/lib/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
});
