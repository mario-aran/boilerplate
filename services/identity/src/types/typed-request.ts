import { Request } from 'express';

export type TypedRequest<
  T extends { params?: unknown; body?: unknown; query?: unknown },
> = Request<
  T['params'] extends undefined ? object : T['params'],
  unknown,
  T['body'] extends undefined ? object : T['body'],
  T['query'] extends undefined ? object : T['query']
>;
