// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

// Ignore "~/.docker/config.json" to prevent "credsStore" error
process.env.DOCKER_AUTH_CONFIG = '{}';

// Imports
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// Constants
const POSTGRES_IMAGE = 'postgres:17.5-alpine';

export default async function globalSetup() {
  // Start Testcontainers
  const pgContainer = await new PostgreSqlContainer(POSTGRES_IMAGE).start();

  // Override connections to use Testcontainers
  process.env.DATABASE_URL = pgContainer.getConnectionUri();

  // Prepare database
  const { db } = await import('@/lib/drizzle');
  await migrate(db, { migrationsFolder: 'migrations' }); // Paths must be relative to project root
  await import('@/scripts/seeds/seed-dev.script'); // Seed database

  return async function globalTeardown() {
    // Close connections
    await db.$client.end();

    // Stop Testcontainers
    await pgContainer.stop();
  };
}
