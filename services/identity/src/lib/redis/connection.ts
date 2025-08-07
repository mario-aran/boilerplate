import { REDIS_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import IORedis from 'ioredis';

// Exported options for blocked connections
const redisUrl = new URL(REDIS_URL);
export const connectionOptions = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  tls: redisUrl.protocol === 'rediss:' ? {} : undefined,
};

// Reusable connection for "Queues" and "Workers"
export const connection = new IORedis({
  maxRetriesPerRequest: null, // Required for "bullmq"
  ...connectionOptions,
});
connection.on('error', (err) => logger.error(`Redis connection error: ${err}`)); // Log idle errors

// Guard: Check connection at startup
(async () => {
  try {
    await connection.ping();
    logger.info('Redis connected successfully at startup');
  } catch (err) {
    logger.error(`Redis connection failed at startup: ${err}`);
    process.exit(1); // Exit on failure
  }
})();
