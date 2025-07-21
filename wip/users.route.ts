/*
2. User Management
/users/me	GET	Get current user profile
/users/me	PATCH	Update current user (name, avatar, etc.)
/users/me/password	PATCH	Change own password
/users/me/deactivate	DELETE	Soft-delete own account

/admin/users	GET	[Admin] List users (filter/pagination)
/admin/users/:id	GET	[Admin] Get user by ID
/admin/users/:id	PATCH	[Admin] Update user (roles, status)
/admin/users/:id/ban	POST	[Admin] Ban/unban user
*/

import { SEGMENTS } from "@/constants/routes";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get(SEGMENTS.ME);
usersRoute.patch(SEGMENTS.ME);
usersRoute.patch(`${SEGMENTS.ME}${SEGMENTS.PASSWORD}`);
usersRoute.delete(SEGMENTS.ME);

usersRoute.get("/");
usersRoute.get(SEGMENTS.ID);
usersRoute.patch(SEGMENTS.ID);
