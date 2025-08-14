import { permissionsSeedService } from '@/features/permissions/permissions-seed.service';
import { rolesSeedService } from '@/features/roles/roles-seed.service';
import { usersSeedService } from '@/features/users/users-seed.service';
import {
  PERMISSIONS_TABLE_NAME,
  ROLES_TABLE_NAME,
  ROLES_TO_PERMISSIONS_TABLE_NAME,
  USERS_TABLE_NAME,
} from '@/lib/drizzle/schemas';
import { logSeedMessage } from './log-seed-message';

export const seedSystemData = async () => {
  const { createdKeys: permissionKeys } = await permissionsSeedService.seed();
  logSeedMessage(PERMISSIONS_TABLE_NAME, permissionKeys);

  const { createdKeys: roleKeys } = await rolesSeedService.seed();
  logSeedMessage(ROLES_TABLE_NAME, roleKeys);

  const { createdKeys: roleToPermissionKeys } =
    await rolesSeedService.seedPermissions();
  logSeedMessage(ROLES_TO_PERMISSIONS_TABLE_NAME, roleToPermissionKeys);

  const { createdKeys: userKeys } = await usersSeedService.seed();
  logSeedMessage(USERS_TABLE_NAME, userKeys);
};
