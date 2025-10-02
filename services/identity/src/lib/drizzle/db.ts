import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
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
pool.on('error', (err) => logger.error(`Database connection error: ${err}`)); // Log idle errors

// ---------------------------
// UTILS
// ---------------------------

export const testDbConnection = async () => {
  try {
    await pool.query('SELECT 1');
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error(`Error connecting to database: ${err}. Forced exit`);
    process.exit(1);
  }
};

class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

// ---------------------------
// DRIZZLE CLIENT
// ---------------------------

export const db = drizzle({
  client: pool,
  logger: new DrizzleLogger(),
  schema: schemas, // Enable "db.query" for all schemas
});
