import { DATABASE_URL } from '@/config/env';
import { defineConfig } from 'drizzle-kit';

// Must use a relative paths
export default defineConfig({
  out: './migrations',
  schema: './src/lib/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
});
