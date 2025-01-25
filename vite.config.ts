import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), ''); // "process.cwd()" requires "@types/node"
  return {
    // vite config
    server: {
      port: parseInt(env.VITE_CLIENT_PORT) || 5173,
    },
  };
});
