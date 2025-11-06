export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const PERMISSIONS = {
  READ_USERS: 'read_users',
  READ_USER: 'read_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  READ_ROLES: 'read_roles',
  READ_ROLE: 'read_role',
  CREATE_ROLE: 'create_role',
  UPDATE_ROLE: 'update_role',
  DELETE_ROLE: 'delete_role',
  READ_PERMISSIONS: 'read_permissions',
} as const;

export const PERMISSION_VALUES = Object.values(PERMISSIONS) as [
  Permission,
  ...Permission[],
];
