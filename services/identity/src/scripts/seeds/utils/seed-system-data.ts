import { permissionsSeedService } from '@/features/permissions/permissions-seed.service';
import { rolesSeedService } from '@/features/roles/roles-seed.service';
import { usersSeedService } from '@/features/users/users-seed.service';

export const seedSystemData = async () => {
  await permissionsSeedService.seedSystemData();
  await rolesSeedService.seedSystemData();
  await usersSeedService.seedSystemData();
};
