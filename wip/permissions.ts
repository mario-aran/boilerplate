// Types
export type PERMISSIONS = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Constants
export const PERMISSIONS = {
  READ_USERS: 'read_users',
} as const;

export const PERMISSION_VALUES = Object.values(PERMISSIONS) as [
  PERMISSIONS,
  ...PERMISSIONS[],
];
