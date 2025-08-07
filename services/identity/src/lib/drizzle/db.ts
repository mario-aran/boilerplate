import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/winston/logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

// Utils
class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

// Database connection
export const db = drizzle({
  client: new Pool({ connectionString: DATABASE_URL }), // Connection with driver
  schema: schemas, // Enable "drizzle.query" usage for all schemas
  logger: new DrizzleLogger(),
});
