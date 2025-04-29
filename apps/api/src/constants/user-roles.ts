export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  USER: 'user',
} as const;

export const USER_ROLE_VALUES = [...new Set(Object.values(USER_ROLES))] as [
  (typeof USER_ROLES)[keyof typeof USER_ROLES],
];
