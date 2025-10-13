import { isProduction, isTest } from '@/config/env';
import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf((el) => `${el.timestamp} [${el.level}]: ${el.message}`),
);

export const logger = winston.createLogger({
  silent: isTest, // No logging in testing
  level: isProduction ? 'info' : 'debug', // Only non-verbose logs in production
  transports: [new winston.transports.Console({ format: consoleFormat })],
});
