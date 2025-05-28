// Types
type ReplaceIdWithDoc<T extends string> = T extends `${infer P}:id${infer S}`
  ? `${P}{id}${ReplaceIdWithDoc<S>}`
  : T;

// Utils
const routesBuilder = <T extends Record<string, string>, V extends string>({
  paths,
  version,
}: {
  paths: T;
  version: V;
}) => {
  const apiDocsPrefix = `/api-docs/${version}` as const;
  const apiPrefix = `/api/${version}` as const;

  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    `${apiPrefix}${value}`,
  ]);
  const routes = Object.fromEntries(entries) as {
    [K in keyof T]: `${typeof apiPrefix}${T[K]}`;
  };

  return { API_DOCS: apiDocsPrefix, API: apiPrefix, ...routes };
};

export const openapiPathsBuilder = <T extends Record<string, string>>(
  paths: T,
) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value.replace(':id', '{id}'),
  ]);
  return {
    API: '/api' as const,
    ...(Object.fromEntries(entries) as {
      [K in keyof T]: ReplaceIdWithDoc<T[K]>;
    }),
  };
};

// Constants
export const ROUTE_SEGMENTS = {
  ID: '/:id',
  ID_PASSWORD: '/:id/password',
  AUTH: '/auth',
  LOGIN: '/login',
  PERMISSIONS: '/permissions',
  USER_ROLES: '/user-roles',
  USERS: '/users',
} as const;

export const ROUTE_PATHS = {
  AUTH: ROUTE_SEGMENTS.AUTH,
  AUTH_LOGIN: `${ROUTE_SEGMENTS.AUTH}${ROUTE_SEGMENTS.LOGIN}`,
  PERMISSIONS: ROUTE_SEGMENTS.PERMISSIONS,
  USER_ROLES: ROUTE_SEGMENTS.USER_ROLES,
  USER_ROLES_ID: `${ROUTE_SEGMENTS.USER_ROLES}${ROUTE_SEGMENTS.ID}`,
  USERS: ROUTE_SEGMENTS.USERS,
  USERS_ID: `${ROUTE_SEGMENTS.USERS}${ROUTE_SEGMENTS.ID}`,
  USERS_ID_PASSWORD: `${ROUTE_SEGMENTS.USERS}${ROUTE_SEGMENTS.ID_PASSWORD}`,
} as const;

export const ROUTES_V1 = routesBuilder({ version: 'v1', paths: ROUTE_PATHS });
export const OPENAPI_PATHS = openapiPathsBuilder(ROUTE_PATHS);
