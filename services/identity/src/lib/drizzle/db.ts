import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

// ---------------------------
// TYPES
// ---------------------------

export type Db = typeof db;

// ---------------------------
// POOL
// ---------------------------

export const pool = new Pool({ connectionString: DATABASE_URL });
pool.on('error', (err) => logger.error(`Database pool error: ${err}`));

// ---------------------------
// UTILS
// ---------------------------

export const checkDbConnection = async () => {
  try {
    await pool.query('SELECT 1');
    logger.info('Database connection verified');
  } catch (err) {
    logger.error(`Database connection failed: ${String(err)}. Exiting`);
    process.exit(1);
  }
};

class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

// ---------------------------
// DRIZZLE INSTANCE
// ---------------------------

export const db = drizzle({
  client: pool,
  logger: new DrizzleLogger(),
  schema: schemas, // Enable "db.query" for all schemas
});
