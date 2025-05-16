import { ROUTE_PATHS } from '@/constants/routes';

// Types
type ReplaceIdWithDoc<T extends string> = T extends `${infer P}:id${infer S}`
  ? `${P}{id}${ReplaceIdWithDoc<S>}`
  : T;

// Utils
export const openapiPathsBuilder = <T extends Record<string, string>>(
  paths: T,
) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value.replace(':id', '{id}'),
  ]);
  return Object.fromEntries(entries) as {
    [K in keyof T]: ReplaceIdWithDoc<T[K]>;
  };
};

// Constants
export const OPENAPI_PATHS = openapiPathsBuilder(ROUTE_PATHS);
