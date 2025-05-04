import { runScriptWithTryCatch } from '@/scripts/utils/run-script-with-try-catch';
import { authSeeder } from './utils/auth-seeder';

(async () => {
  await runScriptWithTryCatch('Seeding', async () => {
    await authSeeder.runSeeds();
  });
})();
