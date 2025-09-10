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
          include: ['src/**/*.test.ts'],
          globalSetup: 'tests/config/global-setup.unit.ts',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['tests/**/*.{e2e,integration}.test.ts'],
          globalSetup: 'tests/config/global-setup.e2e.ts',
        },
      },
    ],
  },
});
