import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { Logger } from 'drizzle-orm/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schemas from './schemas';

// Utils
class DBConnection {
  private _connection: Pool;

  constructor() {
    this._connection = new Pool({ connectionString: DATABASE_URL });

    // Log idle errors
    this._connection.on('error', (err) =>
      logger.error(`Database connection error: ${err}`),
    );
  }

  get connection() {
    return this._connection;
  }

  async verifyConnection() {
    try {
      await this._connection.query('SELECT 1');
      logger.info('Database connected successfully');
    } catch (err) {
      logger.error(
        `Error connecting database: ${err}. Exiting application now`,
      );
      process.exit(1); // Exit on failure
    }
  }

  async closeConnection() {
    try {
      await this._connection.end();
      logger.info('Database connection closed successfully');
    } catch (err) {
      logger.error(`Error closing database connection: ${err}`);
    }
  }
}

class QueryLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    logger.debug(`${query} -- params: ${JSON.stringify(params)}`);
  }
}

export const dbConnection = new DBConnection();

export const db = drizzle({
  client: dbConnection.connection,
  logger: new QueryLogger(),
  schema: schemas, // Enable "db.query" for all schemas
});
