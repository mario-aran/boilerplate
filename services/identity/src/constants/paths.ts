// ---------------------------
// TYPES
// ---------------------------

type ReplaceColonParams<T extends string> =
  T extends `${infer Prefix}:${infer Param}`
    ? `${Prefix}{${ReplaceColonParams<Param>}}`
    : T;

// ---------------------------
// CONSTANTS
// ---------------------------

export const PATH_SEGMENTS = {
  ID: '/:id',
  AUTH: '/auth',
  REGISTER: '/register',
  RESEND_VERIFICATION_EMAIL: '/resend-verification-email',
  VERIFY_EMAIL: '/verify-email',
  LOGIN: '/login',
  REFRESH_TOKEN: '/refresh-token',
  USERS: '/users',
  ME: '/me',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
} as const;

export const PATHS = {
  AUTH_REGISTER: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.REGISTER}`,
  AUTH_RESEND_VERIFICATION_EMAIL: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.RESEND_VERIFICATION_EMAIL}`,
  AUTH_VERIFY_EMAIL: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.VERIFY_EMAIL}`,
  AUTH_LOGIN: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.LOGIN}`,
  AUTH_REFRESH_TOKEN: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.REFRESH_TOKEN}`,
  USERS: PATH_SEGMENTS.USERS,
  USERS_ID: `${PATH_SEGMENTS.USERS}${PATH_SEGMENTS.ID}`,
  USERS_ME: `${PATH_SEGMENTS.USERS}${PATH_SEGMENTS.ME}`,
  ROLES: PATH_SEGMENTS.ROLES,
  ROLES_ID: `${PATH_SEGMENTS.ROLES}${PATH_SEGMENTS.ID}`,
  PERMISSIONS: PATH_SEGMENTS.PERMISSIONS,
} as const;

// ---------------------------
// UTILS
// ---------------------------

const convertPathsToSwagger = <T extends Record<string, string>>(paths: T) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value
      .split('/')
      .map((el) => (el.startsWith(':') ? `{${el.slice(1)}}` : el))
      .join('/'),
  ]);

  return Object.fromEntries(entries) as {
    [K in keyof T]: ReplaceColonParams<T[K]>;
  };
};

export const SWAGGER_PATHS = convertPathsToSwagger(PATHS);
export const _testable = { convertPathsToSwagger };
