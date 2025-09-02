import { logger } from '@/lib/logger/winston-logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { dbConnection } from './db-connection';
import * as schemas from './schemas';

// Types
export type DrizzleDb = typeof drizzleDb;

// Utils
class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

export const drizzleDb = drizzle({
  client: dbConnection.pool,
  logger: new DrizzleLogger(),
  schema: schemas, // Enable "db.query" for all schemas
});
