// NOTE: redis in production should use "maxmemory-policy=noeviction" to prevent BullMQ key loss

import { logger } from '@/lib/logger/winston-logger';
import { redisOptions } from '@/lib/redis/redis-options';
import IORedis from 'ioredis';

// ---------------------------
// CLIENTS
// ---------------------------

export const queueClient = new IORedis(redisOptions);
queueClient.on('error', (err) => logger.error(`Queue client error: ${err}`));

export const workerClient = new IORedis({
  ...redisOptions,
  maxRetriesPerRequest: null, // "bullmq" workers crash if this isn't "null"
});
workerClient.on('error', (err) => logger.error(`Worker client error: ${err}`));

// ---------------------------
// UTILS
// ---------------------------

export const checkQueueConnection = async () => {
  try {
    await queueClient.ping();
    logger.info('Queue connection verified');
  } catch (err) {
    logger.error(`Queue connection failed: ${err}. Exiting`);
    process.exit(1);
  }
};
