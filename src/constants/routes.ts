// Types
type RoutePaths = Record<string, `/${string}`>;

interface RoutesBuilderOptions<T extends RoutePaths, V extends string> {
  routePaths: T;
  version: V;
}

// Utils
const routesBuilder = <T extends RoutePaths, V extends string>({
  routePaths,
  version,
}: RoutesBuilderOptions<T, V>) => {
  const API_DOCS = `/api-docs/${version}` as const;
  const API = `/api/${version}` as const;

  const routesEntries = Object.entries(routePaths).map(([key, value]) => [
    key,
    `${API}${value}`,
  ]);

  const routes = Object.fromEntries(routesEntries) as {
    [K in keyof T]: `${typeof API}${T[K]}`;
  };

  return { API_DOCS, API, ...routes };
};

// Constants
const BASE_PATHS = {
  AUTH: '/auth',
  PERMISSIONS: '/permissions',
  USER_ROLES: '/user-roles',
  USERS: '/users',
} as const;

export const ROUTE_SEGMENTS = {
  ID: '/:id',
  ID_PASSWORD: '/:id/password',
  LOGIN: '/login',
  LOGOUT: '/logout',
} as const;

const ROUTE_PATHS = {
  ...BASE_PATHS,
  AUTH_LOGIN: `${BASE_PATHS.AUTH}${ROUTE_SEGMENTS.LOGIN}`,
  AUTH_LOGOUT: `${BASE_PATHS.AUTH}${ROUTE_SEGMENTS.LOGOUT}`,
  USERS_ID: `${BASE_PATHS.USERS}${ROUTE_SEGMENTS.ID}`,
  USERS_ID_PASSWORD: `${BASE_PATHS.USERS}${ROUTE_SEGMENTS.ID_PASSWORD}`,
} as const;

export const ROUTES_V1 = routesBuilder({
  routePaths: ROUTE_PATHS,
  version: 'v1',
});
