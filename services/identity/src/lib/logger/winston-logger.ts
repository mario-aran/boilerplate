import { NODE_ENV } from '@/config/env';
import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf((el) => `${el.timestamp} [${el.level}]: ${el.message}`),
);

export const logger = winston.createLogger({
  level: NODE_ENV !== 'production' ? 'debug' : 'info',
  transports: [new winston.transports.Console({ format: consoleFormat })],
});
