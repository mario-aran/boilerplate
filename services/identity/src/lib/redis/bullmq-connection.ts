import { REDIS_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import IORedis, { RedisOptions } from 'ioredis';

class BullMQConnection {
  private urlOptions: RedisOptions;
  private connection: IORedis;

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

    // Log connection idle errors
    this.connection.on('error', (err) =>
      logger.error(`Redis connection error: ${err}`),
    );
  }

  // To create connections that can't be shared, e.g., "QueueScheduler" and "QueueEvents"
  getURLOptions() {
    return this.urlOptions;
  }

  getConnection() {
    return this.connection;
  }

  async verifyConnection() {
    try {
      await this.connection.ping();
      logger.info('Redis connected successfully');
    } catch (err) {
      logger.error(`Error connecting Redis: ${err}. The app will exit now`);
      process.exit(1); // Exit on failure
    }
  }

  async closeConnection() {
    try {
      await this.connection.quit();
      logger.info('Redis connection closed gracefully');
    } catch (err) {
      logger.error(`Error closing Redis connection: ${err}`);
    }
  }
}

export const bullMQConnection = new BullMQConnection();
