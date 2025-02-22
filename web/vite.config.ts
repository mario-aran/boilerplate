/// <reference types="vitest/config" />
// The above line allows "vitest" types in the project

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), ''); // "process.cwd" requires "@types/node"

  // Vite config
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_CLIENT_PORT) || 5173, // Client port
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Absolute path alias
      },
    },
    test: {
      environment: 'jsdom', // "react-testing-library"
      globals: true, // Global vars and auto clean up "react-testing-library"
      coverage: { include: ['src/**/*.{ts,tsx}'] }, // Coverage
    },
  };
});
