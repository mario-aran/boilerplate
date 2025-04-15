import { HTTP_STATUS } from '@/constants/http-status';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

// Types
interface Schema {
  params?: AnyZodObject;
  query?: AnyZodObject;
  body?: AnyZodObject;
}

export const zodValidate = ({ params, query, body }: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      params?.parse(req.params);
      query?.parse(req.query);
      body?.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map((issue: ZodIssue) => ({
          path: `${issue.path.join('.')}`,
          message: issue.message,
        }));

        res.status(HTTP_STATUS.UNPROCESSABLE).json({
          status: HTTP_STATUS.UNPROCESSABLE,
          message: 'Invalid data',
          details,
        });
      } else {
        next(err);
      }
    }
  };
};
