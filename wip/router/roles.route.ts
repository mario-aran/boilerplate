import { SEGMENTS } from '@/constants/routes';
import { Router } from 'express';

export const rolesRoute = Router();

// /roles	GET	List all roles without joins
rolesRoute.get('/');

// /roles/:id	GET	Get role with joins
rolesRoute.get(SEGMENTS.ID);

// /roles	POST	[Admin] Create role
rolesRoute.post('/');

// /roles/:id	PATCH	[Admin] Update role
rolesRoute.patch(SEGMENTS.ID);

// /roles/:id	DELETE	[Admin] Delete role
rolesRoute.delete(SEGMENTS.ID);
