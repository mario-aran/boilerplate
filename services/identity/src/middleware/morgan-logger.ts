import { logger } from '@/lib/winston/logger';
import morgan from 'morgan';

export const morganLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: { write: (message) => logger.http(message) } },
);
