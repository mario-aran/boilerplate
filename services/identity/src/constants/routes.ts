// Types
type Paths = Record<string, string>;

type Routes<T extends Paths, U extends string> = {
  [K in keyof T]: `${U}${T[K]}`;
};

// Utils
const generateRoutes = <T extends Paths, V extends string>({
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
  const routes = Object.fromEntries(entries) as Routes<T, typeof apiPrefix>;

  return {
    API_DOCS: apiDocsPrefix,
    API: apiPrefix,
    ...routes,
  };
};

// Constants
export const ROUTE_SEGMENTS = {
  ID: '/:id',
  ID_PASSWORD: '/:id/password',
  REGISTER: '/register',
  LOGIN: '/login',
  REFRESH: '/refresh',
  LOGOUT: '/logout',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USERS: '/users',
  ME: '/me',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
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
