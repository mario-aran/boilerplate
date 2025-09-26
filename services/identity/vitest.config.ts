// NOTE: Vitest automatically sets NODE_ENV='test' when running

import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enables test globals without imports
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
    coverage: { include: ['src'] },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['tests/src/**/*.test.ts'],
          exclude: ['**/*.integration.test.ts', '**/*.e2e.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: [
            'tests/e2e/**/*.e2e.test.ts',
            'tests/src/**/*.integration.test.ts',
          ],
          globalSetup: 'tests/config/global-setup.e2e.ts',
        },
      },
    ],
  },
});
