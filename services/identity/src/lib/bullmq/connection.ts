import { REDIS_URL } from '@/config/env';
import IORedis from 'ioredis';

const { hostname, port, username, password, protocol } = new URL(REDIS_URL);

export const connection = new IORedis({
  maxRetriesPerRequest: null, // Required for "bullmq"
  host: hostname,
  port: Number(port),
  username: username || undefined,
  password: password || undefined,
  tls: protocol === 'rediss:' ? {} : undefined,
});
