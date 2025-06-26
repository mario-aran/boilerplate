import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Path aliases
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    // "@vitest/coverage-v8" setup
    coverage: {
      reporter: ['text', 'html'], // Coverage report formats
      include: ['src'], // Optimize test coverage with specific files
    },
  },
});
