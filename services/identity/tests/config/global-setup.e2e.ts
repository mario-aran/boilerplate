// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

// Ignore "~/.docker/config.json" to prevent "credsStore" error
process.env.DOCKER_AUTH_CONFIG = '{}';

// Imports
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

// Constants
const POSTGRES_IMAGE = 'postgres:17.5-alpine';
const REDIS_IMAGE = 'redis:8.0-alpine';

export default async function globalSetup() {
  // Start Testcontainers
  const pgContainer = await new PostgreSqlContainer(POSTGRES_IMAGE).start();
  const redisContainer = await new RedisContainer(REDIS_IMAGE).start();

  // Swap connections to use Testcontainers
  process.env.DATABASE_URL = pgContainer.getConnectionUri();
  process.env.REDIS_URL = redisContainer.getConnectionUrl();

  // Migrate and seed database
  const { db } = await import('@/lib/drizzle');
  await migrate(db, { migrationsFolder: 'migrations' }); // Paths must be relative to project root
  await import('@/scripts/seeds/seed-dev.script');

  return async function globalTeardown() {
    // Stop Testcontainers in reverse order
    await redisContainer.stop();
    await pgContainer.stop();
  };
}
