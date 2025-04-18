/// <reference types="vitest/config" />
// Line above allows vitest types in the project

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current working directory
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix
  const env = loadEnv(mode, process.cwd(), ''); // process.cwd requires "@types/node"

  // Vite config
  return {
    plugins: [
      react(), // "@vitejs/plugin-react-swc": Babel replacement for faster compilation
      tailwindcss(), // "tailwindcss"
    ],
    server: {
      port: parseInt(env.VITE_CLIENT_PORT) || 5173, // Client port
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Path aliases
      },
    },
    test: {
      // "vitest"
      globals: true, // // Vitest variables without imports
      environment: 'jsdom', // "jsdom": Browser environment
      setupFiles: './src/lib/vitest/vitest-setup.ts', // "@testing-library/jest-dom"

      // "@vitest/coverage-v8"
      coverage: {
        reporter: ['text', 'html'], // Coverage report formats
        include: ['src'], // Define coverage.include to optimize coverage
      },
    },
  };
});
