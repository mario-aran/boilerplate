/* eslint-disable @typescript-eslint/no-require-imports */

// Guard: Load dotenv only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  // Load dotenv synchronously
  require('dotenv').config();
}
