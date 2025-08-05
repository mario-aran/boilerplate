import { NODE_ENV } from '@/config/env';
import winston from 'winston';

export const logger = winston.createLogger({
  level: NODE_ENV === 'development' ? 'debug' : 'warn',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});
