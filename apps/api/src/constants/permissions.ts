export const PERMISSIONS = {
  CREATE_USER_ROLE: 'create_user_role',
  READ_USER_ROLES: 'read_user_roles',
  READ_USER_ROLE: 'read_user_role',
  DELETE_USER_ROLE: 'delete_user_role',
  READ_USERS: 'read_users',
  READ_USER: 'read_user',
  UPDATE_USER: 'update_user',
  UPDATE_USER_PASSWORD: 'update_user_password',
} as const;

export const PERMISSION_VALUES = [...new Set(Object.values(PERMISSIONS))] as [
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS],
];
