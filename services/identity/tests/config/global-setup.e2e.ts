// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import { migrate } from 'drizzle-orm/node-postgres/migrator';

// ===========================
// CONSTANTS
// ===========================

const POSTGRES_IMAGE = 'postgres:17.5-alpine';
const REDIS_IMAGE = 'redis:8.0-alpine';
const MAILHOG_IMAGE = 'mailhog/mailhog:v1.0.1';
const MAILHOG_SMTP_PORT = 1025;
const MAILHOG_UI_PORT = 8025;

// ===========================
// UTILS
// ===========================

const startTestContainers = async () => {
  // Docker config
  process.env.DOCKER_AUTH_CONFIG = '{}'; // Ignore "~/.docker/config.json" to prevent "credsStore" error

  // Import Testcontainers after Docker config
  const { PostgreSqlContainer } = await import('@testcontainers/postgresql');
  const { RedisContainer } = await import('@testcontainers/redis');
  const { GenericContainer } = await import('testcontainers');

  // Start Testcontainers
  const postgresContainer = await new PostgreSqlContainer(
    POSTGRES_IMAGE,
  ).start();
  const redisContainer = await new RedisContainer(REDIS_IMAGE).start();
  const mailhogContainer = await new GenericContainer(MAILHOG_IMAGE)
    .withExposedPorts(MAILHOG_SMTP_PORT, MAILHOG_UI_PORT)
    .start();

  return { postgresContainer, redisContainer, mailhogContainer };
};

// ===========================
// GLOBAL SETUP
// ===========================

export default async function globalSetup() {
  const { postgresContainer, redisContainer, mailhogContainer } =
    await startTestContainers();

  // Set env vars to point to Testcontainers
  process.env.DATABASE_URL = postgresContainer.getConnectionUri();
  process.env.REDIS_URL = redisContainer.getConnectionUrl();
  process.env.SMTP_PORT = mailhogContainer
    .getMappedPort(MAILHOG_SMTP_PORT)
    .toString();
  process.env.SMTP_HOST = mailhogContainer.getHost();
  process.env.SMTP_USER = '';
  process.env.SMTP_PASS = '';

  // Migrate and seed db after env vars point to Testcontainers
  const { db } = await import('@/lib/drizzle');
  await migrate(db, { migrationsFolder: 'migrations' }); // Paths must be relative to project root
  await import('@/scripts/seeds/seed-dev.script');

  // Store global values in globalThis
  globalThis.mailhogUIPort = mailhogContainer.getMappedPort(MAILHOG_UI_PORT);

  return async function globalTeardown() {
    // Stop Testcontainers in reverse order
    await mailhogContainer.stop();
    await redisContainer.stop();
    await postgresContainer.stop();
  };
}
