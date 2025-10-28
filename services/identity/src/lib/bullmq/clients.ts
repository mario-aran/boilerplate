// NOTE: redis in production should use "maxmemory-policy=noeviction" to prevent BullMQ key loss

import { logger } from '@/lib/logger/winston';
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
    logger.error(`Queue connection failed: ${String(err)}. Exiting`);
    process.exit(1);
  }
};

export const checkWorkerConnection = async () => {
  try {
    await workerClient.ping();
    logger.info('Worker connection verified');
  } catch (err) {
    logger.error(`Worker connection failed: ${String(err)}. Exiting`);
    process.exit(1);
  }
};
