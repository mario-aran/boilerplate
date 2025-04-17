import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Path aliases
    },
  },
  test: {
    // "vitest"
    globals: true, // Allows global variables without importing them

    // "@vitest/coverage-v8"
    coverage: {
      reporter: ['text', 'html'], // Coverage report formats
      include: ['src'], // TIP: Always define coverage.include to optimize coverage
    },
  },
});
