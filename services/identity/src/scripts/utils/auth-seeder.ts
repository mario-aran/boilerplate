import { permissionsSeedService } from '@/features/permissions/permissions-seed.service';
import { rolesSeedService } from '@/features/roles/roles-seed.service';
import { usersSeedService } from '@/features/users/users-seed.service';

class AuthSeeder {
  public runSeeds = async () => {
    await permissionsSeedService.seedProductionData();
    await rolesSeedService.seedProductionData();
    await usersSeedService.seedProductionData();
  };
}

export const authSeeder = new AuthSeeder();
