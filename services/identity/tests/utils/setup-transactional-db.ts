import * as drizzleModule from '@/lib/drizzle/db';
import { pool } from '@/lib/drizzle/db';
import * as schemas from '@/lib/drizzle/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PoolClient } from 'pg';
import { afterEach, beforeEach, Mock } from 'vitest';

export const setupTransactionalDb = () => {
  let client: PoolClient;
  let dbSpy: Mock;

  beforeEach(async () => {
    // Start a new transaction using a single connection
    client = await pool.connect();
    await client.query('BEGIN;');

    // Override drizzle db with the transaction
    const txDb = drizzle({ client, schema: schemas });
    dbSpy = vi
      .spyOn(drizzleModule, 'db', 'get')
      .mockReturnValue(txDb as unknown as drizzleModule.Db);
  });

  afterEach(async () => {
    // Rollback the transaction
    await client.query('ROLLBACK;');
    client.release();

    // Restore original drizzle db
    dbSpy.mockRestore();
  });
};
