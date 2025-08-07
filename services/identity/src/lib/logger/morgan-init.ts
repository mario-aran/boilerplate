import morgan from 'morgan';
import { logger } from './winston-logger';

export const morganInit = morgan(
  'combined', // Apache common log format
  {
    stream: {
      write: (message) => logger.http(message.trim()), // Trim to avoid morgan default newline (\n)
    },
  },
);
