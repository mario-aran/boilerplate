import { HTTP_STATUS } from '@/constants/http-status';
import { usersService } from '@/features/users/users.service';
import { JwtUser } from '@/lib/passport/types/jwt-user';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';

// Utils
const forbiddenError = new HttpError(HTTP_STATUS.FORBIDDEN, 'Forbidden');

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    const jwtUser = req.user as JwtUser;

    // Allow access to user's own data
    if (req.params.id === jwtUser.id) return next();

    // Check user
    const user = await usersService.read(jwtUser.id);
    if (!user) return next(forbiddenError);

    // Check user permission
    const hasPermission = user.permissionIds.includes(requiredPermission);
    if (!hasPermission) return next(forbiddenError);

    return next();
  };
};
