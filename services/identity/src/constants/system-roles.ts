// Types
export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

// Constants
export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  USER: 'user',
} as const;

export const SYSTEM_ROLE_VALUES = Object.values(SYSTEM_ROLES) as [
  SystemRole,
  ...SystemRole[],
];
