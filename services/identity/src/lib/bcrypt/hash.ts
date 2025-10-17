import bcrypt from 'bcryptjs';

export const hash = async (secret: string) => bcrypt.hash(secret, 10);
