// docs: https://orm.drizzle.team/docs/get-started/postgresql-new#step-5---setup-drizzle-config-file

import { DATABASE_URL } from '@/config/env';
import { defineConfig } from 'drizzle-kit';

// Paths must be relative to project root
export default defineConfig({
  out: 'migrations',
  schema: 'src/lib/drizzle/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
});
