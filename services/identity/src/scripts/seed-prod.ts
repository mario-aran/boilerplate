import { authSeeder } from './utils/auth-seeder';
import { scriptCatchAsync } from './utils/script-with-catch';

(async () =>
  await scriptCatchAsync('Seeding', async () => {
    await authSeeder.runSeeds();
  }))();
