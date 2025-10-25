import { HttpError } from '@/errors/http-error';
import { zodValidator } from '@/middleware/zod-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import z from 'zod';

describe('zodValidator', () => {
  let req: Request;
  let res: Response;
  let next: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    req = { params: {}, query: {}, body: {} } as Request;
    res = {} as Response;
    next = vi.fn();
  });

  it('calls next without error for valid Zod input', () => {
    req.body = { field: 'test_string' };
    const body = z.object({ field: z.string() });

    zodValidator({ body })(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith();
  });

  it('calls next with HttpError for Zod errors', () => {
    req.body = { field: 1 };
    const body = z.object({ field: z.string() });

    zodValidator({ body })(req, res, next);

    const err = next.mock.calls[0][0] as HttpError;
    expect(next).toHaveBeenCalledOnce();
    expect(err).toBeInstanceOf(HttpError);
    expect(err.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(err.validationErrors?.[0]).toMatchObject({
      field: expect.any(String) as unknown,
      message: expect.any(String) as unknown,
    });
  });

  it('calls next with generic error for non-Zod errors', () => {
    req.body = { field: 'test_string' };
    const body = z.object({ field: z.string() });
    body.parse = () => {
      throw new Error();
    };

    zodValidator({ body })(req, res, next);

    const err = next.mock.calls[0][0] as Error;
    expect(next).toHaveBeenCalledOnce();
    expect(err).toBeInstanceOf(Error);
  });
});
