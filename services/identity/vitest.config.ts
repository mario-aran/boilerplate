import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Path aliases
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    // "@vitest/coverage-v8"
    coverage: {
      reporter: ['text', 'html'], // Report outputs
      include: ['src'],
    },
  },
});
