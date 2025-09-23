import { NODE_ENVIRONMENTS } from '@/constants/node-environments';

// ===========================
// VALUES
// ===========================

// Node
const NODE_ENV = process.env.NODE_ENV || NODE_ENVIRONMENTS.DEVELOPMENT;
export const isProduction = NODE_ENV === NODE_ENVIRONMENTS.PRODUCTION;
export const isDevelopment = NODE_ENV === NODE_ENVIRONMENTS.DEVELOPMENT;
export const isTest = NODE_ENV === NODE_ENVIRONMENTS.TEST;

// ===========================
// GUARDS
// ===========================

if (!isProduction) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config({ path: '.env.dev', quiet: isTest }); // Load dotenv synchronously
}

// ===========================
// UTILS
// ===========================

const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is required`);

  return value;
};

const getOptionalEnv = (key: string) => process.env[key] || undefined;

// ===========================
// ENV VARIABLES
// ===========================

// Server
export const PORT = Number(getRequiredEnv('PORT'));
export const BASE_URL = getRequiredEnv('BASE_URL');

// JWT
export const JWT_ACCESS_SECRET = getRequiredEnv('JWT_ACCESS_SECRET');
export const JWT_REFRESH_SECRET = getRequiredEnv('JWT_REFRESH_SECRET');
export const JWT_EMAIL_VERIFICATION_SECRET = getRequiredEnv(
  'JWT_EMAIL_VERIFICATION_SECRET',
);

// Database
export const DATABASE_URL = getRequiredEnv('DATABASE_URL');

// Redis
export const REDIS_URL = getRequiredEnv('REDIS_URL');

// SMTP
export const SMTP_HOST = getRequiredEnv('SMTP_HOST');
export const SMTP_PORT = Number(getRequiredEnv('SMTP_PORT'));
export const SMTP_USER = getOptionalEnv('SMTP_USER');
export const SMTP_PASS = getOptionalEnv('SMTP_PASS');
export const EMAIL_FROM = getRequiredEnv('EMAIL_FROM');
