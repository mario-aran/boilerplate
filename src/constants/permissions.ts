// Types
export type PERMISSIONS = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Constants
export const PERMISSIONS = {
  READ_USERS: 'read_users',
  READ_USER: 'read_user',
  UPDATE_USER: 'update_user',
  UPDATE_USER_PASSWORD: 'update_user_password',
  READ_USER_ROLES: 'read_user_roles',
  READ_USER_ROLE: 'read_user_role',
  UPDATE_USER_ROLE: 'update_user_role',
  READ_PERMISSIONS: 'read_permissions',
} as const;

export const PERMISSION_VALUES = Object.values(PERMISSIONS) as [PERMISSIONS];
