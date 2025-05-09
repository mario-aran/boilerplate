import { runScript } from '@/scripts/utils';
import { authSeeder } from './utils/auth-seeder';

// Utils
const scriptFn = async () => {
  await authSeeder.runSeeds();
};

// Run the script
(async () => {
  await runScript({ processName: 'Seeding', scriptFn });
})();
