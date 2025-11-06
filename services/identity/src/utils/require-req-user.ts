import { AccessDeniedError } from '@/errors/api-errors';
import { Request } from 'express';

export const requireReqUser = (
  req: Request<unknown, unknown, unknown, unknown, Record<string, unknown>>,
) => {
  if (!req.user) throw AccessDeniedError;
  return req.user;
};
