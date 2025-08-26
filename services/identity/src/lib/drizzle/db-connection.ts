import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { Pool } from 'pg';

class DBConnection {
  readonly pool = new Pool({ connectionString: DATABASE_URL });

  constructor() {
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
      logger.error(`Error connecting database: ${err}. Forced exit`);
      process.exit(1);
    }
  }
}

// Singleton
export const dbConnection = new DBConnection();
