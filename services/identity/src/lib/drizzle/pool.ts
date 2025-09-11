import { DATABASE_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import { Pool } from 'pg';

export const pool = new Pool({ connectionString: DATABASE_URL });
pool.on('error', (err) => logger.error(`Database connection error: ${err}`)); // Log idle errors

export const verifyPool = async () => {
  try {
    await pool.query('SELECT 1');
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error(`Error connecting to database: ${err}. Forced exit`);
    process.exit(1);
  }
};
