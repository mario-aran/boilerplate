import { REDIS_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import IORedis from 'ioredis';

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
