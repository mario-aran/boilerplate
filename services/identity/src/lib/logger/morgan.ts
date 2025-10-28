import morgan from 'morgan';
import { logger } from './winston';

export const morganInit = morgan('combined', {
  stream: { write: (message) => logger.http(message.trim()) },
});
