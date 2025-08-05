import { logger } from '@/lib/winston/logger';
import morgan from 'morgan';

export const morganLogger = morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) },
});
