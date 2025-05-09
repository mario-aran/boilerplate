/* eslint-disable @typescript-eslint/no-require-imports */

// Load dotenv only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
