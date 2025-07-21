import { authSeeder } from './utils/auth-seeder';
import { runtScriptWithCatch } from './utils/run-script-with-catch';

(async () =>
  await runtScriptWithCatch({
    processName: 'Seeding',
    asyncFn: async () => {
      await authSeeder.runSeeds();
    },
  }))();
