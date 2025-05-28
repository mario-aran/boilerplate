// Utils
const generateRoutes = <T extends Record<string, string>, V extends string>({
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

export const ROUTES_V1 = generateRoutes({ version: 'v1', paths: ROUTE_PATHS });
