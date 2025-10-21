import { UnauthorizedError } from '@/errors/http-errors';
import { Request } from 'express';

export const requireReqUser = (req: Request) => {
  if (!req.user) throw UnauthorizedError;

  return req.user;
};
