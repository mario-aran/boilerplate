import { REDIS_URL } from '@/config/env';
import { RedisOptions } from 'ioredis';

const redisUrl = new URL(REDIS_URL);

export const redisOptions: RedisOptions = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  tls: redisUrl.protocol === 'rediss:' ? {} : undefined, // Enables TLS when using "rediss://"
};
