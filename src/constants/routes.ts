// Types
type Version = `v${number}`;

interface RoutesBuilderOptions<T extends Version> {
  segments: typeof ROUTE_SEGMENTS;
  version: T;
}

type Routes<T extends Record<string, `/${string}`>, V extends string> = {
  [K in keyof T]: `${V}${T[K]}`;
};

// Utils
const routesBuilder = <T extends Version>({
  segments,
  version,
}: RoutesBuilderOptions<T>) => {
  // Base paths
  const auth = '/auth';
  const permissions = '/permissions';
  const userRoles = '/user-roles';
  const users = '/users';

  // Route paths
  const paths = {
    AUTH: auth,
    AUTH_LOGIN: `${auth}${segments.LOGIN}`,
    AUTH_LOGOUT: `${auth}${segments.LOGOUT}`,
    PERMISSIONS: permissions,
    USER_ROLES: userRoles,
    USER_ROLES_ID: `${userRoles}${segments.ID}`,
    USER_ROLES_ID_DOC: `${userRoles}${segments.ID_DOC}`,
    USERS: users,
    USERS_ID: `${users}${segments.ID}`,
    USERS_ID_DOC: `${users}${segments.ID_DOC}`,
    USERS_ID_PASSWORD: `${users}${segments.ID_PASSWORD}`,
    USERS_ID_PASSWORD_DOC: `${users}${segments.ID_PASSWORD_DOC}`,
  } as const;

  // Routes
  const apiDocs = `/api-docs/${version}` as const;
  const api = `/api/${version}` as const;
  const entries = Object.entries(paths).map(([k, v]) => [k, `${api}${v}`]);
  const routes = Object.fromEntries(entries) as Routes<
    typeof paths,
    typeof api
  >;
  return { API_DOCS: apiDocs, API: api, ...routes };
};

// Constants
export const ROUTE_SEGMENTS = {
  ID: '/:id',
  ID_DOC: '/{id}',
  ID_PASSWORD: '/:id/password',
  ID_PASSWORD_DOC: '/{id}/password',
  LOGIN: '/login',
  LOGOUT: '/logout',
} as const;

export const ROUTES_V1 = routesBuilder({
  segments: ROUTE_SEGMENTS,
  version: 'v1',
});
