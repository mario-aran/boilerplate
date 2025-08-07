import { REDIS_URL } from '@/config/env';
import IORedis from 'ioredis';

const url = new URL(REDIS_URL);

// Exported options for blocked connections ("QueueScheduler" and "QueueEvents")
export const connectionOptions = {
  host: url.hostname,
  port: Number(url.port),
  username: url.username || undefined,
  password: url.password || undefined,
  tls: url.protocol === 'rediss:' ? {} : undefined,
};

// Reusable connection for ("Queues" and "Workers")
export const connection = new IORedis({
  maxRetriesPerRequest: null, // Required for "bullmq"
  ...connectionOptions,
});
