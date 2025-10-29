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
  const permissionsInserted = await permissionsSeedService.seed();
  logSeedMessage(PERMISSIONS_TABLE_NAME, permissionsInserted);

  const rolesInserted = await rolesSeedService.seed();
  logSeedMessage(ROLES_TABLE_NAME, rolesInserted);

  const rolesToPermissionsInserted =
    await rolesSeedService.seedPermissionsForRole();
  logSeedMessage(ROLES_TO_PERMISSIONS_TABLE_NAME, rolesToPermissionsInserted);

  const usersInserted = await usersSeedService.seed();
  logSeedMessage(USERS_TABLE_NAME, usersInserted);
};
