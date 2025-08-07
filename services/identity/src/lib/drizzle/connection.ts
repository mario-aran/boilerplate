import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

const pool = new Pool({ connectionString: DATABASE_URL });
pool.on('error', (err) => logger.error(`Database connection error: ${err}`)); // Log idle errors

// Guard: Check connection at startup
(async () => {
  try {
    await pool.query('SELECT 1');
    logger.info('Database connected successfully at startup');
  } catch (err) {
    logger.error(`Database connection failed at startup: ${err}`);
    process.exit(1);
  }
})();

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
