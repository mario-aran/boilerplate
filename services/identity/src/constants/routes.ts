// Types
type Paths = Record<string, string>;

type ReplaceDotId<TK extends string> = TK extends `${infer P}:id${infer S}`
  ? `${P}{id}${ReplaceDotId<S>}`
  : TK;

// Utils
const replaceDotIdPaths = <T extends Paths>(paths: T) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value.replace(':id', '{id}'),
  ]);
  return Object.fromEntries(entries) as { [K in keyof T]: ReplaceDotId<T[K]> };
};

const generateRoutes = <T extends Paths>(paths: T) => {
  const apiPrefix = '/api';
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    `${apiPrefix}${value}`,
  ]);
  const routes = Object.fromEntries(entries) as {
    [K in keyof T]: `${typeof apiPrefix}${T[K]}`;
  };

  return {
    API_DOCS: '/api-docs',
    API: apiPrefix,
    ...routes,
  } as const;
};

// Constants
export const SEGMENTS = {
  ID: '/:id',
  AUTH: '/auth',
  REGISTER: '/register',
  LOGIN: '/login',
  REFRESH: '/refresh',
  LOGOUT: '/logout',
  CHANGE_PASSWORD: '/change-password',
  USERS: '/users',
  ME: '/me',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
} as const;

const PATHS = {
  AUTH_REGISTER: `${SEGMENTS.AUTH}${SEGMENTS.REGISTER}`,
  AUTH_LOGIN: `${SEGMENTS.AUTH}${SEGMENTS.LOGIN}`,
  AUTH_REFRESH: `${SEGMENTS.AUTH}${SEGMENTS.REFRESH}`,
  AUTH_LOGOUT: `${SEGMENTS.AUTH}${SEGMENTS.LOGOUT}`,
  AUTH_CHANGE_PASSWORD: `${SEGMENTS.AUTH}${SEGMENTS.CHANGE_PASSWORD}`,
  USERS_ME: `${SEGMENTS.USERS}${SEGMENTS.ME}`,
  USERS: SEGMENTS.USERS,
  USERS_ID: `${SEGMENTS.USERS}${SEGMENTS.ID}`,
  ROLES: SEGMENTS.ROLES,
  ROLES_ID: `${SEGMENTS.ROLES}${SEGMENTS.ID}`,
  PERMISSIONS: SEGMENTS.PERMISSIONS,
} as const;

export const DOC_PATHS = replaceDotIdPaths(PATHS);
export const ROUTES = generateRoutes(PATHS);
