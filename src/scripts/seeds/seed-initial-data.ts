import { authSeeder } from '@/scripts/utils/auth-seeder';
import { scriptCatchAsync } from '@/scripts/utils/script-catch-async';

// Utils
const runScript = async () => {
  await authSeeder.runSeeds();
};

// Run the script
(async () =>
  await scriptCatchAsync({
    processName: 'Seeding',
    asyncFn: runScript,
  }))();
