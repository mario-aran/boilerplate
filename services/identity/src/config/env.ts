import { ENVIRONMENTS } from '@/constants/environments';

// Guards
if (process.env.NODE_ENV !== ENVIRONMENTS.PRODUCTION) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config({ path: '.env.dev' }); // Load dotenv synchronously
}

// Utils
const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is required`);

  return value;
};

// "process.env" values
const NODE_ENV = getRequiredEnv('NODE_ENV');
export const BASE_URL = getRequiredEnv('BASE_URL');
export const PORT = Number(getRequiredEnv('PORT'));
export const JWT_ACCESS_SECRET = getRequiredEnv('JWT_ACCESS_SECRET');
export const JWT_REFRESH_SECRET = getRequiredEnv('JWT_REFRESH_SECRET');
export const JWT_EMAIL_VERIFICATION_SECRET = getRequiredEnv(
  'JWT_EMAIL_VERIFICATION_SECRET',
);
export const DATABASE_URL = getRequiredEnv('DATABASE_URL');
export const REDIS_URL = getRequiredEnv('REDIS_URL');
export const SMTP_HOST = getRequiredEnv('SMTP_HOST');
export const SMTP_PORT = Number(getRequiredEnv('SMTP_PORT'));
export const SMTP_USER = getRequiredEnv('SMTP_USER');
export const SMTP_PASS = getRequiredEnv('SMTP_PASS');
export const VERIFY_EMAIL_FROM = getRequiredEnv('VERIFY_EMAIL_FROM');

// Custom env values
export const isProduction = NODE_ENV === ENVIRONMENTS.PRODUCTION;
export const isDevelopment = NODE_ENV === ENVIRONMENTS.DEVELOPMENT;
export const isTest = NODE_ENV === ENVIRONMENTS.TEST;
