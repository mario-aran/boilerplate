// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import * as drizzleModule from '@/lib/drizzle';
import { pool } from '@/lib/drizzle/pool';
import * as schemas from '@/lib/drizzle/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PoolClient } from 'pg';
import { afterEach, beforeEach } from 'vitest';

let client: PoolClient;

beforeEach(async () => {
  // Start transaction
  client = await pool.connect();
  await client.query('BEGIN;');

  // Replace drizzle connection with a transaction
  const txDb = drizzle({ client, schema: schemas });
  vi.spyOn(drizzleModule, 'db', 'get').mockReturnValue(
    txDb as unknown as drizzleModule.Db,
  );
});

afterEach(async () => {
  // Rollback transaction
  await client.query('ROLLBACK;');
  client.release();

  // Remove all mocks
  vi.restoreAllMocks();
});
