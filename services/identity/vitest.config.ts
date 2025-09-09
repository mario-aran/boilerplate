import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Path aliases
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },

  test: {
    globalSetup: 'tests/config/global-setup.ts', // File skips restarts in watch mode

    // "@vitest/coverage-v8"
    coverage: {
      include: ['src'],
    },
  },
});
