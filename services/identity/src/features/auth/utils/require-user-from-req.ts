import { UnauthorizedError } from '@/errors/http-errors';
import { Request } from 'express';

export const requireUserFromReq = (req: Request) => {
  if (!req.user) throw UnauthorizedError;

  return req.user;
};
