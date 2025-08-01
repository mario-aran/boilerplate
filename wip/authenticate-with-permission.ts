import { JwtPayload } from "@/lib/jwt/types";
import { passport } from "@/lib/passport";
import { usersService } from "@/services/users.service";
import { HttpError } from "@/utils/http-error";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Values
const unauthorizedError = new HttpError({
  message: "Unauthorized",
  httpStatus: StatusCodes.UNAUTHORIZED,
});

const forbiddenError = new HttpError({
  message: "Forbidden",
  httpStatus: StatusCodes.FORBIDDEN,
});

export const authenticateWithPermission =
  (requiredPermission?: string) =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt",
      { session: false },
      async (error: unknown, jwtPayload?: JwtPayload) => {
        // Failed: internal error
        if (error) return next(error);

        // Failed: invalid or missing JWT
        if (!jwtPayload) return next(unauthorizedError);

        // Attach user manually when using callback
        req.user = { id: jwtPayload.id };

        // Succeeded: user is the owner or doesn't require permission
        const userIsOwner = req.params.id === jwtPayload.id;
        if (userIsOwner || !requiredPermission) return next();

        try {
          // Succeeded: user has required permission
          const dbUser = await usersService.get(jwtPayload.id);
          const hasPermission =
            dbUser.permissionIds.includes(requiredPermission);
          if (hasPermission) return next();

          // Failed: user missing or lacks permission
          return next(forbiddenError);
        } catch (err) {
          // Failed: users service error
          return next(err);
        }
      }
    )(req, res, next);
