// Types
type ReplaceColonParams<T extends string> =
  T extends `${infer Prefix}:${infer Param}`
    ? `${Prefix}{${ReplaceColonParams<Param>}}`
    : T;

// Constants
export const PATH_SEGMENTS = {
  ID: '/:id',
  AUTH: '/auth',
  VERIFY_EMAIL: '/verify-email',
  REGISTER: '/register',
  RESEND_EMAIL_VERIFICATION: '/resend-email-verification',
  LOGIN: '/login',
  USERS: '/users',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
} as const;

export const PATHS = {
  AUTH_VERIFY_EMAIL: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.VERIFY_EMAIL}`,
  AUTH_REGISTER: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.REGISTER}`,
  AUTH_RESEND_EMAIL_VERIFICATION: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.RESEND_EMAIL_VERIFICATION}`,
  AUTH_LOGIN: `${PATH_SEGMENTS.AUTH}${PATH_SEGMENTS.LOGIN}`,
  ROLES: PATH_SEGMENTS.ROLES,
  ROLES_ID: `${PATH_SEGMENTS.ROLES}${PATH_SEGMENTS.ID}`,
  PERMISSIONS: PATH_SEGMENTS.PERMISSIONS,
} as const;

// Utils
export const convertPathsToSwagger = <T extends Record<string, string>>(
  paths: T,
) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value
      .split('/')
      .map((segment) =>
        segment.startsWith(':') ? `{${segment.slice(1)}}` : segment,
      )
      .join('/'),
  ]);

  return Object.fromEntries(entries) as {
    [K in keyof T]: ReplaceColonParams<T[K]>;
  };
};

// Derived constants
export const SWAGGER_PATHS = convertPathsToSwagger(PATHS);
