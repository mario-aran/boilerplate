import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);
