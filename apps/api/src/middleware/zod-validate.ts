import { HTTP_STATUS } from '@/constants/http-status';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

// Types
interface Schema {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}

export const zodValidate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.params?.parse(req.params);
      schema.query?.parse(req.query);
      schema.body?.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map((issue: ZodIssue) => ({
          path: `${issue.path.join('.')}`,
          message: issue.message,
        }));

        return res.status(HTTP_STATUS.UNPROCESSABLE).json({
          status: HTTP_STATUS.UNPROCESSABLE,
          message: 'Invalid data',
          details,
        });
      }

      next(err);
    }
  };
};
