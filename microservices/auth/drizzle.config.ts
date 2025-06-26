// "drizzle.config" is not in "tsconfig", so path aliases can't be used

import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src/config/env';

export default defineConfig({
  out: './migrations', // Migrations folder
  schema: './src/lib/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
});
