import morgan from 'morgan';
import { logger } from './winston-logger';

export const morganInit = morgan('combined', {
  stream: { write: (message) => logger.http(message.trim()) },
});
