import { REDIS_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import IORedis, { RedisOptions } from 'ioredis';

class BullMQConnection {
  readonly urlOptions: RedisOptions; // Public for connections that can't be shared
  readonly connection: IORedis;

  constructor() {
    const url = new URL(REDIS_URL);
    this.urlOptions = {
      host: url.hostname,
      port: Number(url.port),
      username: url.username || undefined,
      password: url.password || undefined,
      tls: url.protocol === 'rediss:' ? {} : undefined,
    };

    this.connection = new IORedis({
      maxRetriesPerRequest: null, // Required for "bullmq"
      ...this.urlOptions,
    });

    // Log idle errors
    this.connection.on('error', (err) =>
      logger.error(`Redis connection error: ${err}`),
    );
  }

  async verifyConnection() {
    try {
      await this.connection.ping();
      logger.info('Redis connected successfully');
    } catch (err) {
      logger.error(`Error connecting redis: ${err}. Exiting application now`);
      process.exit(1); // Exit on failure
    }
  }

  async closeConnection() {
    try {
      await this.connection.quit();
      logger.info('Redis connection closed successfully');
    } catch (err) {
      logger.error(`Error closing redis connection: ${err}`);
    }
  }
}

export const bullMQConnection = new BullMQConnection();
