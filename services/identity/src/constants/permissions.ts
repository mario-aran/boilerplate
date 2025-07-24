// Types
export type Permissions = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Constants
export const PERMISSIONS = {
  READ_USERS: 'read_users',
  READ_USER: 'read_user',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  UPDATE_USER_PASSWORD: 'update_user_password',
} as const;

export const PERMISSION_VALUES = Object.values(PERMISSIONS) as [
  Permissions,
  ...Permissions[],
];
