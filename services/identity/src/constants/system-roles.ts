type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  USER: 'user',
} as const;

export const SYSTEM_ROLE_VALUES = Object.values(SYSTEM_ROLES) as [
  SystemRole,
  ...SystemRole[],
];
