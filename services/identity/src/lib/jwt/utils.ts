import { JWT_SECRET } from '@/config/env';
import jwt from 'jsonwebtoken';
import { JwtPayload } from './types';

export const signJwt = (payload: JwtPayload) => {
  let expiresIn: jwt.SignOptions['expiresIn'] = '15m';
  switch (payload.tokenType) {
    case 'email_verification':
      expiresIn = '1d';
      break;
    case 'access':
      expiresIn = '15m';
      break;
    case 'refresh':
      expiresIn = '7d';
      break;
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyJwt = (token: string) =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;
