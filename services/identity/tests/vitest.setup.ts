// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import * as schemas from '@/lib/drizzle/schemas';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { afterAll, beforeAll } from 'vitest';

// Constants
const POSTGRES_IMAGE = 'postgres:17.5-alpine';

// Values
let pgContainer: StartedPostgreSqlContainer;
export let db: ReturnType<typeof drizzle>;

beforeAll(async () => {
  pgContainer = await new PostgreSqlContainer(POSTGRES_IMAGE).start();

  const pool = new Pool({
    host: pgContainer.getHost(),
    port: pgContainer.getPort(),
    database: pgContainer.getDatabase(),
    user: pgContainer.getUsername(),
    password: pgContainer.getPassword(),
  });

  db = drizzle({ client: pool, schema: schemas });

  await migrate(db, {
    migrationsFolder: '../migrations', // Must use a relative paths
  });
});

afterAll(async () => {
  await pgContainer.stop();
  await db.$client.end(); // Close db connection
});
