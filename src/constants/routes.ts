// Constants
export const ROUTE_PATHS = {
  AUTH_LOGIN: '/login',
  AUTH_LOGOUT: '/logout',
  USERS_ID: '/:id',
  USERS_ID_PASSWORD: '/:id/password',
} as const;

// Utils
const buildRoutes = <T extends 'v1' | 'v2'>(version: T) => {
  const API = `/api/${version}` as const;
  const AUTH = `${API}/auth` as const;
  const PERMISSIONS = `${API}/permissions` as const;
  const USER_ROLES = `${API}/user-roles` as const;
  const USERS = `${API}/users` as const;

  return {
    API_DOCS: `/api-docs/${version}`,
    API,
    AUTH,
    AUTH_LOGIN: `${AUTH}${ROUTE_PATHS.AUTH_LOGIN}`,
    AUTH_LOGOUT: `${AUTH}${ROUTE_PATHS.AUTH_LOGOUT}`,
    PERMISSIONS,
    USER_ROLES,
    USERS,
    USERS_ID: `${USERS}${ROUTE_PATHS.USERS_ID}`,
    USERS_ID_PASSWORD: `${USERS}${ROUTE_PATHS.USERS_ID_PASSWORD}`,
  } as const;
};

// Constants
export const ROUTES_V1 = buildRoutes('v1');
