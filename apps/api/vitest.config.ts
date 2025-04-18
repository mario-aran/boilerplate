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
    globals: true, // Vitest variables without imports

    // "@vitest/coverage-v8"
    coverage: {
      reporter: ['text', 'html'], // Coverage report formats
      include: ['src'], // Define coverage.include to optimize coverage
    },
  },
});
