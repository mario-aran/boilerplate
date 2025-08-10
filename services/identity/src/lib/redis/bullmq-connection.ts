import { REDIS_URL } from '@/config/env';
import { logger } from '@/lib/logger/winston-logger';
import IORedis, { RedisOptions } from 'ioredis';

class BullMQConnection {
  private _urlOptions: RedisOptions;
  private _connection: IORedis;

  constructor() {
    const url = new URL(REDIS_URL);
    this._urlOptions = {
      host: url.hostname,
      port: Number(url.port),
      username: url.username || undefined,
      password: url.password || undefined,
      tls: url.protocol === 'rediss:' ? {} : undefined,
    };

    this._connection = new IORedis({
      maxRetriesPerRequest: null, // Required for "bullmq"
      ...this.urlOptions,
    });

    // Log idle errors
    this._connection.on('error', (err) =>
      logger.error(`Redis connection error: ${err}`),
    );
  }

  // To create connections that can't be shared
  get urlOptions() {
    return this._urlOptions;
  }

  get connection() {
    return this._connection;
  }

  async verifyConnection() {
    try {
      await this._connection.ping();
      logger.info('Redis connected successfully');
    } catch (err) {
      logger.error(`Error connecting redis: ${err}. Exiting application now`);
      process.exit(1); // Exit on failure
    }
  }

  async closeConnection() {
    try {
      await this._connection.quit();
      logger.info('Redis connection closed successfully');
    } catch (err) {
      logger.error(`Error closing redis connection: ${err}`);
    }
  }
}

export const bullMQConnection = new BullMQConnection();
