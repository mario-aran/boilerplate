if (process.env.NODE_ENV !== 'production') import('dotenv/config'); // Don't use dotenv in production

export const {
  NODE_ENV = '',
  SERVER_PORT = '',
  DATABASE_URL = '',
} = process.env;
