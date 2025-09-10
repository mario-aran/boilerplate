// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import { NODE_ENVIRONMENTS } from '@/constants/node-environments';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// Constants
const POSTGRES_IMAGE = 'postgres:17.5-alpine';

export default async function globalSetup() {
  // Set NODE_ENV to test
  process.env.NODE_ENV = NODE_ENVIRONMENTS.TEST;

  // Start containers
  const pgContainer = await new PostgreSqlContainer(POSTGRES_IMAGE).start();

  // Replace application envs
  process.env.DATABASE_URL = pgContainer.getConnectionUri();

  // Prepare database
  const { db } = await import('@/lib/drizzle');
  await migrate(db, { migrationsFolder: 'migrations' }); // Paths must be relative to project root
  await import('@/scripts/seeds/seed-dev.script'); // Seed database

  return async function globalTeardown() {
    // Close connections
    await db.$client.end();

    // Stop containers
    await pgContainer.stop();
  };
}
