import { PATH_SEGMENTS } from '@/constants/paths';
import { PERMISSIONS } from '@/constants/permissions';
import {
  deleteUser,
  getUser,
  getUserMe,
  getUsers,
  updateUser,
  updateUserMe,
  updateUserMeEmail,
  updateUserMePassword,
} from '@/controllers/users.controller';
import {
  getUsersSchema,
  updateUserEmailSchema,
  updateUserMeSchema,
  updateUserPasswordSchema,
  updateUserSchema,
  userIdSchema,
} from '@/lib/zod/schemas/users.schema';
import { authenticateAndAuthorize } from '@/middleware/authenticate-and-authorize';
import { zodValidator } from '@/middleware/zod-validator';
import { Router } from 'express';

export const usersRoutes = Router();

// ---------------------------
// ROUTES: /users
// ---------------------------

usersRoutes.get(
  '/',
  authenticateAndAuthorize(PERMISSIONS.READ_USERS),
  zodValidator({ query: getUsersSchema }),
  getUsers,
);

// ---------------------------
// ROUTES: /users/me
// ---------------------------

usersRoutes.get(PATH_SEGMENTS.ME, authenticateAndAuthorize(), getUserMe);

usersRoutes.patch(
  PATH_SEGMENTS.ME,
  authenticateAndAuthorize(),
  zodValidator({ body: updateUserMeSchema }),
  updateUserMe,
);

usersRoutes.patch(
  PATH_SEGMENTS.ME_EMAIL,
  authenticateAndAuthorize(),
  zodValidator({ body: updateUserEmailSchema }),
  updateUserMeEmail,
);

usersRoutes.patch(
  PATH_SEGMENTS.ME_PASSWORD,
  authenticateAndAuthorize(),
  zodValidator({ body: updateUserPasswordSchema }),
  updateUserMePassword,
);

// ---------------------------
// ROUTES: /users/:id
// ---------------------------

usersRoutes.get(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.READ_USER),
  zodValidator({ params: userIdSchema }),
  getUser,
);

usersRoutes.patch(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.UPDATE_USER),
  zodValidator({ params: userIdSchema, body: updateUserSchema }),
  updateUser,
);

usersRoutes.delete(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.DELETE_USER),
  zodValidator({ params: userIdSchema }),
  deleteUser,
);
