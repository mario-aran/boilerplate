// DO NOT RENAME OR MOVE THIS FILE — used by a script in "package.json"

import { startEmailVerificationWorker } from './utils/workers/email-verification-worker';

// Add workers startups here
startEmailVerificationWorker();
