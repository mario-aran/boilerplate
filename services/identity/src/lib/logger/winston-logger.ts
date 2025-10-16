import { isProduction, isTest } from '@/config/env';
import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf((el) => `${el.timestamp} [${el.level}]: ${el.message}`),
);

export const logger = winston.createLogger({
  silent: isTest, // Prevent logging during testing
  level: isProduction ? 'info' : 'debug', // Prevent verbose logs in production
  transports: [new winston.transports.Console({ format: consoleFormat })],
});
