// Guards
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config(); // Load dotenv synchronously
}
