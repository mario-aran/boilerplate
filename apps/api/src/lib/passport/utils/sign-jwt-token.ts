import { JWT_SECRET } from '@/config/env';
import { JwtUser } from '@/lib/passport/types/jwt-user';
import jwt from 'jsonwebtoken';

export const signJwtToken = ({ id, email }: JwtUser) =>
  jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1h' });
