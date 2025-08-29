// Types
type ReplaceColons<T extends string> =
  T extends `${infer Prefix}:${infer Param}`
    ? `${Prefix}{${ReplaceColons<Param>}}`
    : T;

// Constants
export const PARTS = {
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

export const ROUTES = {
  AUTH_VERIFY_EMAIL: `${PARTS.AUTH}${PARTS.VERIFY_EMAIL}`,
  AUTH_REGISTER: `${PARTS.AUTH}${PARTS.REGISTER}`,
  AUTH_RESEND_EMAIL_VERIFICATION: `${PARTS.AUTH}${PARTS.RESEND_EMAIL_VERIFICATION}`,
  AUTH_LOGIN: `${PARTS.AUTH}${PARTS.LOGIN}`,
  ROLES: PARTS.ROLES,
  ROLES_ID: `${PARTS.ROLES}${PARTS.ID}`,
  PERMISSIONS: PARTS.PERMISSIONS,
} as const;

// Utils
export const replaceColonsInPaths = <T extends Record<string, string>>(
  paths: T,
) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    value
      .split('/')
      .map((part) => (part.startsWith(':') ? `{${part.slice(1)}}` : part))
      .join('/'),
  ]);

  return Object.fromEntries(entries) as { [K in keyof T]: ReplaceColons<T[K]> };
};

// Derived constants
export const SWAGGER_PATHS = replaceColonsInPaths(ROUTES);
