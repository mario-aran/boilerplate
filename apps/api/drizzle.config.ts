// "drizzle.config" is not in the rootDir of "tsconfig", so it can't use absolute imports.

import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src/config/env';

export default defineConfig({
  out: './migrations', // Migrations folder
  schema: './src/libs/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
});
