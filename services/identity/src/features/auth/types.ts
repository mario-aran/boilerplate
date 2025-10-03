import { UsersServiceGetResult } from '@/features/users/users.service';
import { Request } from 'express';

export interface JwtPayload {
  userId: string;
}

export interface RequestWithUser<
  P = Request['params'],
  ResBody = unknown,
  ReqBody = Request['body'],
  ReqQuery = Request['query'],
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user: UsersServiceGetResult;
}
