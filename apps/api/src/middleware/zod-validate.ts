import { HTTP_STATUS } from '@/constants/http-status';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

export const zodValidate = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorDetails = err.errors.map((issue: ZodIssue) => ({
          path: `${issue.path.join('.')}`,
          message: issue.message,
        }));

        res.status(HTTP_STATUS.UNPROCESSABLE).json({
          status: HTTP_STATUS.UNPROCESSABLE,
          message: 'Invalid data',
          details: errorDetails,
        });

        return; // Stop further execution
      }

      next(err);
    }
  };
};
