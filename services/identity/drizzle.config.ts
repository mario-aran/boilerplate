// This file won't be compiled, so path aliases cannot be used

import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src/config/env';

export default defineConfig({
  out: './migrations',
  schema: './src/lib/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
});
