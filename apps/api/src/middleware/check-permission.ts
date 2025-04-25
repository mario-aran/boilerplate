import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermission = req.user?.permission || '';

    if (requiredPermission.some((userRole) => {}))
      const httpError = new HttpError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    next(httpError);
  };
};
