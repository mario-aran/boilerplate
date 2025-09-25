// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import * as drizzleModule from '@/lib/drizzle/db';
import { pool } from '@/lib/drizzle/db';
import * as schemas from '@/lib/drizzle/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PoolClient } from 'pg';
import { afterEach, beforeEach, MockInstance } from 'vitest';

let client: PoolClient;
let dbSpy: MockInstance;

beforeEach(async () => {
  // Start transaction
  client = await pool.connect();
  await client.query('BEGIN;');

  // Override db connection with a transaction
  const txDb = drizzle({ client, schema: schemas });
  dbSpy = vi
    .spyOn(drizzleModule, 'db', 'get')
    .mockReturnValue(txDb as unknown as drizzleModule.Db);
});

afterEach(async () => {
  // Rollback transaction
  await client.query('ROLLBACK;');
  client.release();

  // Remove mocks
  dbSpy.mockRestore();
});
