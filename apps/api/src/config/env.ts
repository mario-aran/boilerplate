// Never use dotenv in production
if (process.env.NODE_ENV !== 'production') import('dotenv/config');

export const {
  NODE_ENV = '',
  SERVER_PORT = '',
  DATABASE_URL = '',
} = process.env;
