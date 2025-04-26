export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const USER_ROLES_VALUES = [...new Set(Object.values(USER_ROLES))] as [
  (typeof USER_ROLES)[keyof typeof USER_ROLES],
];
