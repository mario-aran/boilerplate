import { HttpError } from '@/utils/http-error';
import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const validatePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (!isValidPassword)
    throw new HttpError({
      message: 'Invalid password',
      httpStatus: StatusCodes.FORBIDDEN,
    });
};
