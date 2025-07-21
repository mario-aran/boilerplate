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

const addPrefixToPaths = <T extends Paths, U extends string>({
  paths,
  prefix,
}: {
  paths: T;
  prefix: U;
}) => {
  const entries = Object.entries(paths).map(([key, value]) => [
    key,
    `${prefix}${value}`,
  ]);
  return Object.fromEntries(entries) as {
    [K in keyof T]: `${typeof prefix}${T[K]}`;
  };
};

// Constants
export const SEGMENTS = {
  API_DOCS: '/api-docs',
  API: '/api',
  ID: '/:id',
  AUTH: '/auth',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  GOOGLE: '/google',
  LOGIN: '/login',
  REFRESH: '/refresh',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  LOGOUT: '/logout',
  USERS: '/users',
  ME: '/me',
  PASSWORD: '/password',
} as const;

const PATHS = {
  AUTH: SEGMENTS.AUTH,
  AUTH_REGISTER: `${SEGMENTS.AUTH}${SEGMENTS.REGISTER}`,
  AUTH_VERIFY_EMAIL: `${SEGMENTS.AUTH}${SEGMENTS.VERIFY_EMAIL}`,
  AUTH_GOOGLE: `${SEGMENTS.AUTH}${SEGMENTS.GOOGLE}`,
  AUTH_LOGIN: `${SEGMENTS.AUTH}${SEGMENTS.LOGIN}`,
  AUTH_REFRESH: `${SEGMENTS.AUTH}${SEGMENTS.REFRESH}`,
  AUTH_FORGOT_PASSWORD: `${SEGMENTS.AUTH}${SEGMENTS.FORGOT_PASSWORD}`,
  AUTH_RESET_PASSWORD: `${SEGMENTS.AUTH}${SEGMENTS.RESET_PASSWORD}`,
  AUTH_LOGOUT: `${SEGMENTS.AUTH}${SEGMENTS.LOGOUT}`,
  USERS: SEGMENTS.USERS,
  USERS_ID: `${SEGMENTS.USERS}${SEGMENTS.ID}`,
  USERS_ME: `${SEGMENTS.USERS}${SEGMENTS.ME}`,
  USERS_ME_PASSWORD: `${SEGMENTS.USERS}${SEGMENTS.ME}${SEGMENTS.PASSWORD}`,
} as const;

export const SWAGGER_PATHS = replaceDotIdPaths(PATHS);

export const ROUTES = {
  API_DOCS: SEGMENTS.API_DOCS,
  API: SEGMENTS.API,
  ...addPrefixToPaths({ paths: PATHS, prefix: SEGMENTS.API }),
};
