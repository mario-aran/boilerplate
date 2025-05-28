import { ROUTE_PATHS } from '@/constants/routes';

// Types
type ReplaceIdWithDoc<T extends string> = T extends `${infer P}:id${infer S}`
  ? `${P}{id}${ReplaceIdWithDoc<S>}`
  : T;

// Utils
export const generateOpenAPIPaths = <T extends Record<string, string>>(
  paths: T,
) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value.replace(':id', '{id}'),
  ]);
  const docIdPaths = Object.fromEntries(entries) as {
    [K in keyof T]: ReplaceIdWithDoc<T[K]>;
  };

  const API = '/api' as const;
  return { API, ...docIdPaths };
};

// Constants
export const OPENAPI_PATHS = generateOpenAPIPaths(ROUTE_PATHS);
