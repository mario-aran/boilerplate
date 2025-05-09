import { scriptCatchAsync } from '@/scripts/utils';
import { authSeeder } from './utils/auth-seeder';

// Utils
const runScript = async () => {
  await authSeeder.runSeeds();
};

// Run the script
(async () => {
  await scriptCatchAsync({
    processName: 'Seeding',
    asyncFn: runScript,
  });
})();
