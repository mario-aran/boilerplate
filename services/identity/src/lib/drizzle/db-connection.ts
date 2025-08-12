import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

// Utils
class DBConnection {
  readonly pool: Pool;

  constructor() {
    this.pool = new Pool({ connectionString: DATABASE_URL });

    // Log idle errors
    this.pool.on('error', (err) =>
      logger.error(`Database connection error: ${err}`),
    );
  }

  async verify() {
    try {
      await this.pool.query('SELECT 1');
      logger.info('Database connected successfully');
    } catch (err) {
      logger.error(`Error connecting database: ${err}. Exiting application`);
      process.exit(1);
    }
  }

  async close() {
    try {
      await this.pool.end();
      logger.info('Database connection closed successfully');
    } catch (err) {
      logger.error(`Error closing database connection: ${err}`);
    }
  }
}

class DrizzleLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

export const dbConnection = new DBConnection();

export const db = drizzle({
  client: dbConnection.pool,
  logger: new DrizzleLogger(),
  schema: schemas, // Enable "db.query" for all schemas
});
