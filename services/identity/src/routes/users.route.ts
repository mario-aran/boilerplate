import { PATH_SEGMENTS } from '@/constants/paths';
import { PERMISSIONS } from '@/constants/permissions';
import { authenticateAndAuthorize } from '@/middleware/authenticate-and-authorize';
import { Router } from 'express';

export const usersRoutes = Router();

usersRoutes.get(PATH_SEGMENTS.ME, authenticateAndAuthorize());

usersRoutes.patch(PATH_SEGMENTS.ME, authenticateAndAuthorize());

usersRoutes.get('/', authenticateAndAuthorize(PERMISSIONS.READ_USERS));

usersRoutes.get(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.READ_USER),
);

usersRoutes.patch(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.UPDATE_USER),
);

usersRoutes.delete(
  PATH_SEGMENTS.ID,
  authenticateAndAuthorize(PERMISSIONS.DELETE_USER),
);
