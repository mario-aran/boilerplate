export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const USER_ROLES_VALUES = [...new Set(Object.values(USER_ROLES))] as [
  (typeof USER_ROLES)[keyof typeof USER_ROLES],
];
