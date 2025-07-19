// Types
export type ROLES = (typeof ROLES)[keyof typeof ROLES];

// Constants
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const ROLE_VALUES = Object.values(ROLES) as [ROLES, ...ROLES[]];
