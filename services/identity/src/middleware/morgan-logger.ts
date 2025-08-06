import { logger } from '@/lib/winston/logger';
import morgan from 'morgan';

export const morganLogger = morgan(
  'combined', // Apache common log format
  {
    stream: {
      write: (message) => logger.http(message.trim()), // Trim to avoid morgan default newline (\n)
    },
  },
);
