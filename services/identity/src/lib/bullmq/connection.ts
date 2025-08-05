import { REDIS_URL } from '@/config/env';
import IORedis from 'ioredis';

const { hostname, port, username, password, protocol } = new URL(REDIS_URL);

// Exported options for QueueScheduler and QueueEvents
export const connectionOptions = {
  host: hostname,
  port: Number(port),
  username: username || undefined,
  password: password || undefined,
  tls: protocol === 'rediss:' ? {} : undefined,
};

// Reusable connection for Queues and Workers
export const connection = new IORedis({
  maxRetriesPerRequest: null, // Required for "bullmq"
  ...connectionOptions,
});
