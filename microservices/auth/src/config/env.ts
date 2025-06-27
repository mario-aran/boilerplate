// Guards
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config(); // Load dotenv synchronously
}

// Utils
const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is required`);

  return value;
};

// Constants
export const NODE_ENV = getEnv('NODE_ENV');
export const PORT = Number(getEnv('PORT'));
export const DATABASE_URL = getEnv('DATABASE_URL');
export const JWT_SECRET = getEnv('JWT_SECRET');
