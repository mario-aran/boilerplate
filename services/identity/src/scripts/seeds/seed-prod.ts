// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { scriptCatchAsync } from '@/scripts/utils/script-catch-async';
import { seedSystemData } from './utils';

// Run script
(async () => {
  await scriptCatchAsync(seedSystemData);
})();
