import { JWT_SECRET } from '@/config/env';
import { JwtUser } from '@/lib/passport/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const signJwtToken = ({ id, email }: JwtUser) =>
  jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1h' });
