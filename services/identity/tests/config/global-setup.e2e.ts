// note: DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { TestProject } from 'vitest/node';

// ---------------------------
// CONSTANTS
// ---------------------------

const POSTGRES_IMAGE = 'postgres:17.5-alpine';
const REDIS_IMAGE = 'redis:8.0-alpine';
const MAILHOG_IMAGE = 'mailhog/mailhog:v1.0.1';
const MAILHOG_SMTP_PORT = 1025;
const MAILHOG_UI_PORT = 8025;

// ---------------------------
// UTILS
// ---------------------------

const startTestContainers = async () => {
  // Docker config
  process.env.DOCKER_AUTH_CONFIG = '{}'; // Ignore "~/.docker/config.json" to prevent "credsStore" error

  // Import containers after docker config
  const { PostgreSqlContainer } = await import('@testcontainers/postgresql');
  const { RedisContainer } = await import('@testcontainers/redis');
  const { GenericContainer } = await import('testcontainers');

  // Start containers
  const postgresContainer = await new PostgreSqlContainer(
    POSTGRES_IMAGE,
  ).start();
  const redisContainer = await new RedisContainer(REDIS_IMAGE).start();
  const mailhogContainer = await new GenericContainer(MAILHOG_IMAGE)
    .withExposedPorts(MAILHOG_SMTP_PORT, MAILHOG_UI_PORT)
    .start();

  return { postgresContainer, redisContainer, mailhogContainer };
};

// ---------------------------
// SETUP
// ---------------------------

export default async function globalSetup(project: TestProject) {
  const { postgresContainer, redisContainer, mailhogContainer } =
    await startTestContainers();

  // Set envs to point to testcontainers
  process.env.DATABASE_URL = postgresContainer.getConnectionUri();
  process.env.REDIS_URL = redisContainer.getConnectionUrl();
  process.env.SMTP_PORT = mailhogContainer
    .getMappedPort(MAILHOG_SMTP_PORT)
    .toString();
  process.env.SMTP_HOST = mailhogContainer.getHost();
  process.env.SMTP_USER = '';
  process.env.SMTP_PASS = '';

  // Migrate and seed db after envs point to testcontainers
  const { db } = await import('@/lib/drizzle/db');
  await migrate(db, { migrationsFolder: 'migrations' }); // Paths must be relative to project root
  await import('@/scripts/seeds/seed-dev.script');

  // Expose variables to vitest "ProvideContext"
  project.provide(
    'mailhogUIPort',
    mailhogContainer.getMappedPort(MAILHOG_UI_PORT),
  );

  return async function globalTeardown() {
    // Stop containers in reverse order
    await mailhogContainer.stop();
    await redisContainer.stop();
    await postgresContainer.stop();
  };
}
