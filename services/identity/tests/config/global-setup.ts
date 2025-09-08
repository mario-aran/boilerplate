// DO NOT RENAME OR MOVE THIS FILE — used by "jest.config"

import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { SetupGlobalThis } from './types';

// Constants
const POSTGRES_IMAGE = 'postgres:17.5-alpine';

export default async () => {
  // Start containers
  const pgContainer = await new PostgreSqlContainer(POSTGRES_IMAGE).start();

  // Replace envs
  process.env.DATABASE_URL = pgContainer.getConnectionUri();

  // Prepare database
  const { db } = await import('@/lib/drizzle');
  await migrate(db, { migrationsFolder: 'migrations' }); // Paths must be relative to project root
  await import('@/scripts/seeds/seed-dev.script'); // Seed database

  // Assign values to globalThis
  const setupGlobalThis = globalThis as SetupGlobalThis;
  setupGlobalThis.pgContainer = pgContainer;
};
