import { InvalidCredentialsError } from '@/errors/http-errors';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const guardPassword = async (password: string, hash: string) => {
  const isPasswordValid = await bcrypt.compare(password, hash);
  if (!isPasswordValid) throw InvalidCredentialsError;
};
