// Types
type Permissions = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Constants
export const PERMISSIONS = {
  READ_PERMISSIONS: 'read_permissions',
} as const;

export const PERMISSION_VALUES = Object.values(PERMISSIONS) as [
  Permissions,
  ...Permissions[],
];
