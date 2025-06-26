import { SignOptions } from 'jsonwebtoken';

// Utils
const getEnvVar = (varName: string) => {
  const value = process.env[varName];
  if (!value) throw new Error(`Environment variable ${varName} is required`);

  return value;
};

// Constants
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 3000;
export const DATABASE_URL: string = getEnvVar('DATABASE_URL');
export const JWT_SECRET: string = getEnvVar('JWT_SECRET');

export const JWT_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '1h';
