/// <reference types="vitest/config" />
// The line above allows "vitest" types in the project.

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), ''); // process.cwd requires "@types/node"

  // Vite config
  return {
    plugins: [
      react(),
      tailwindcss(), // "tailwindcss"
    ],
    server: {
      port: parseInt(env.VITE_CLIENT_PORT) || 5173, // Client port
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Absolute path
      },
    },
    test: {
      // "vitest"
      environment: 'jsdom', // "jsdom"
      globals: true, // "vitest", "@testing-library/react"
      setupFiles: './src/lib/vitest/vitest-setup.ts', // @testing-library/jest-dom

      // "@vitest/coverage-v8"
      coverage: {
        include: ['src'],
        reporter: ['text'], // Coverage output files
      },
    },
  };
});
