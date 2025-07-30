import { scriptCatchAsync } from '@/scripts/utils/script-with-catch';
import { seedSystemData } from './utils/seed-system-data';

// Run script
(async () => {
  await scriptCatchAsync(seedSystemData);
})();
