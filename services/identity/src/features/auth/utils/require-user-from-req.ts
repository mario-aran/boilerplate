import { HttpError } from '@/utils/http-error';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

export const requireUserFromReq = (req: Request) => {
  if (!req.user)
    throw new HttpError({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Unauthorized',
    });

  return req.user;
};
