// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import * as drizzleModule from '@/lib/drizzle';
import { pool } from '@/lib/drizzle/pool';
import * as schemas from '@/lib/drizzle/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PoolClient } from 'pg';
import { afterEach, beforeEach } from 'vitest';

let client: PoolClient;

beforeEach(async () => {
  client = await pool.connect();
  await client.query('BEGIN;'); // Start transaction

  // Replace drizzle app connection with a transaction
  const txDb = drizzle({ client, schema: schemas });
  vi.spyOn(drizzleModule, 'db', 'get').mockReturnValue(
    txDb as unknown as drizzleModule.Db,
  );
});

afterEach(async () => {
  await client.query('ROLLBACK;'); // Rollback transaction
  client.release(); // Free connection

  // Remove all mocks
  vi.restoreAllMocks();
});
