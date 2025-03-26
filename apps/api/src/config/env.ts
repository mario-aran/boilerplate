// Never use dotenv in production
// Used "require()" because "import()" uses async

// eslint-disable-next-line @typescript-eslint/no-require-imports
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

export const {
  NODE_ENV = '',
  SERVER_PORT = '',
  DATABASE_URL = '',
} = process.env;
