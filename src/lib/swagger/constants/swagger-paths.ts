import { ROUTE_PATHS } from '@/constants/routes';

// Types
type ReplaceIdWithDoc<TK extends string> = TK extends `${infer P}:id${infer S}`
  ? `${P}{id}${ReplaceIdWithDoc<S>}`
  : TK;

// Utils
export const generateSwaggerPaths = <T extends Record<string, string>>(
  paths: T,
) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value.replace(':id', '{id}'),
  ]);
  const swaggerIdPaths = Object.fromEntries(entries) as {
    [K in keyof T]: ReplaceIdWithDoc<T[K]>;
  };

  return { API: '/api', ...swaggerIdPaths } as const;
};

// Constants
export const SWAGGER_PATHS = generateSwaggerPaths(ROUTE_PATHS);
