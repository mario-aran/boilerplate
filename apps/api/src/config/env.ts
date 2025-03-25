// Never use dotenv in production
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config();
}

export const {
  NODE_ENV = '',
  SERVER_PORT = '',
  DATABASE_URL = '',
} = process.env;
