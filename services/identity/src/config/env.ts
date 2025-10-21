import { NODE_ENVIRONMENTS } from '@/constants/node-environments';

// ---------------------------
// VALUES
// ---------------------------

const NODE_ENV = process.env.NODE_ENV || NODE_ENVIRONMENTS.DEVELOPMENT;
export const isProduction = NODE_ENV === NODE_ENVIRONMENTS.PRODUCTION;
export const isDevelopment = NODE_ENV === NODE_ENVIRONMENTS.DEVELOPMENT;
export const isTest = NODE_ENV === NODE_ENVIRONMENTS.TEST;

// ---------------------------
// GUARDS
// ---------------------------

if (!isProduction) {
  // Disabled eslint: use "require()" to load dotenv synchronously
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config({ path: '.env.dev', quiet: isTest });
}

// ---------------------------
// UTILS
// ---------------------------

const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is required`);

  return value;
};

const getOptionalEnv = (key: string) => process.env[key] || undefined;

// ---------------------------
// ENV VARIABLES
// ---------------------------

export const PORT = Number(getRequiredEnv('PORT'));
export const API_GATEWAY_URL = getRequiredEnv('API_GATEWAY_URL');
export const FRONTEND_URL = getRequiredEnv('FRONTEND_URL');
export const JWT_VERIFICATION_EMAIL_SECRET = getRequiredEnv(
  'JWT_VERIFICATION_EMAIL_SECRET',
);
export const JWT_ACCESS_SECRET = getRequiredEnv('JWT_ACCESS_SECRET');
export const JWT_REFRESH_SECRET = getRequiredEnv('JWT_REFRESH_SECRET');
export const JWT_RESET_PASSWORD_SECRET = getRequiredEnv(
  'JWT_RESET_PASSWORD_SECRET',
);
export const DATABASE_URL = getRequiredEnv('DATABASE_URL');
export const REDIS_URL = getRequiredEnv('REDIS_URL');
export const SMTP_HOST = getRequiredEnv('SMTP_HOST');
export const SMTP_PORT = Number(getRequiredEnv('SMTP_PORT'));
export const SMTP_USER = getOptionalEnv('SMTP_USER');
export const SMTP_PASS = getOptionalEnv('SMTP_PASS');
export const EMAIL_FROM = getRequiredEnv('EMAIL_FROM');
