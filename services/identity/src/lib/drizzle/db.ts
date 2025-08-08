import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

// Pool
export const pool = new Pool({ connectionString: DATABASE_URL });
pool.on('error', (err) => logger.error(`Database connection error: ${err}`)); // Log idle errors

// Drizzle
class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}
export const db = drizzle({
  client: pool,
  logger: new QueryLogger(),
  schema: schemas, // Enable "drizzle.query" usage for all schemas
});
