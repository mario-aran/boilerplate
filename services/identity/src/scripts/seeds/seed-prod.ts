// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { scriptCatchAsync } from '@/scripts/utils/script-with-catch';
import { seedSystemData } from './utils/seed-system-data';

// Run script
(async () => {
  await scriptCatchAsync(seedSystemData);
})();
