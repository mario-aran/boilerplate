// DO NOT RENAME OR MOVE THIS FILE — used by "jest.config"

import { SetupGlobalThis } from './types';

export default async () => {
  // Stop containers
  const setupGlobalThis = globalThis as SetupGlobalThis;
  await setupGlobalThis.pgContainer?.stop();
};
