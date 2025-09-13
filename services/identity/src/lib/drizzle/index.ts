import { logger } from '@/lib/logger/winston-logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pool } from './pool';
import * as schemas from './schemas';

// Types
type Db = typeof db;
export type Tx = Parameters<Parameters<Db['transaction']>[0]>[0];
export type DbOrTx = Db | Tx;

// Utils
class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

export const db = drizzle({
  client: pool,
  logger: new DrizzleLogger(),
  schema: schemas, // Enable "db.query" for all schemas
});
