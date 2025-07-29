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
  const prefix = '/api';

  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    `${prefix}${value}`,
  ]);
  const routes = Object.fromEntries(entries) as {
    [K in keyof T]: `${typeof prefix}${T[K]}`;
  };

  return { API_DOCS: '/api-docs', API: prefix, ...routes } as const;
};

// Constants
export const SEGMENTS = {
  ID: '/:id',
  AUTH: '/auth',
  REGISTER: '/register',
  RESEND_EMAIL_VERIFICATION: '/resend-email-verification',
  VERIFY_EMAIL: '/verify-email',
  LOGIN: '/login',
  PERMISSIONS: '/permissions',
} as const;

const PATHS = {
  AUTH: SEGMENTS.AUTH,
  AUTH_REGISTER: `${SEGMENTS.AUTH}${SEGMENTS.REGISTER}`,
  AUTH_RESEND_EMAIL_VERIFICATION: `${SEGMENTS.AUTH}${SEGMENTS.RESEND_EMAIL_VERIFICATION}`,
  AUTH_VERIFY_EMAIL: `${SEGMENTS.AUTH}${SEGMENTS.VERIFY_EMAIL}`,
  AUTH_LOGIN: `${SEGMENTS.AUTH}${SEGMENTS.LOGIN}`,
  PERMISSIONS: SEGMENTS.PERMISSIONS,
} as const;

export const SWAGGER_PATHS = replaceDotIdPaths(PATHS);
export const ROUTES = generateRoutes(PATHS);
