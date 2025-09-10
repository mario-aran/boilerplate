// DO NOT RENAME OR MOVE THIS FILE — used by "vitest.config.ts"

import { NODE_ENVIRONMENTS } from '@/constants/node-environments';

export default function globalSetup() {
  // Set NODE_ENV to test
  process.env.NODE_ENV = NODE_ENVIRONMENTS.TEST;
}
