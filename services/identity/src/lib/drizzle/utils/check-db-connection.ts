import { pool } from '@/lib/drizzle/db';
import { logger } from '@/lib/logger/winston-logger';

export const checkDBConnection = async () => {
  try {
    const pingQuery = 'SELECT 1';
    await pool.query(pingQuery);
    logger.info('Database connected successfully at startup');
  } catch (err) {
    logger.error(`Database connection failed at startup: ${err}`);
    process.exit(1); // Exit on failure
  }
};
