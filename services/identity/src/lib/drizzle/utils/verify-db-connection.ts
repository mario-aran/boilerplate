import { pool } from '@/lib/drizzle/db';
import { logger } from '@/lib/logger/winston-logger';

export const verifyDBConnection = async () => {
  try {
    await pool.query('SELECT 1');
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error(`Database connection failed: ${err}`);
    process.exit(1); // Exit on failure
  }
};
