import { logger } from '@/lib/logger/winston-logger';
import { connection } from '@/lib/redis/connection';

export const verifyRedisConnection = async () => {
  try {
    await connection.ping();
    logger.info('Redis connected successfully');
  } catch (err) {
    logger.error(`Redis connection failed: ${err}`);
    process.exit(1); // Exit on failure
  }
};
