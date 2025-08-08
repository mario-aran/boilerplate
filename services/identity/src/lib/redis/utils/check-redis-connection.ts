import { logger } from '@/lib/logger/winston-logger';
import { connection } from '@/lib/redis/connection';

export const checkRedisConnection = async () => {
  try {
    await connection.ping();
    logger.info('Redis connected successfully at startup');
  } catch (err) {
    logger.error(`Redis connection failed at startup: ${err}`);
    process.exit(1); // Exit on failure
  }
};
