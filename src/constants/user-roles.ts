// Types
export type USER_ROLES = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Constants
export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  USER: 'user',
} as const;

export const USER_ROLE_VALUES = Object.values(USER_ROLES) as [USER_ROLES];
