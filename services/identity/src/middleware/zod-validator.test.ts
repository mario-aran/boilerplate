import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import z from 'zod';
import { zodValidator } from './zod-validator';

describe('zodValidator', () => {
  let req: Request;
  let res: Response;
  let next: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {} } as Request;
    res = {} as Response;
    next = vi.fn();
  });

  it('calls next without error when request data is valid', () => {
    req.body = { field: 'string' };

    const schema = z.object({ field: z.string() });
    const middleware = zodValidator({ body: schema });
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('calls next with Zod error when request data is invalid', () => {
    const schema = z.object({ field: z.string() });
    const middleware = zodValidator({ body: schema });
    middleware(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(HttpError);
    expect(err.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(err.validationErrors[0]).toMatchObject({
      field: expect.any(String),
      message: expect.any(String),
    });
  });

  it('calls next with regular error when non-Zod error is thrown', () => {
    const schema = z.object();
    schema.parse = () => {
      throw new Error('Message');
    };

    const middleware = zodValidator({ body: schema });
    middleware(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Message');
  });
});
