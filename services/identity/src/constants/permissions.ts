// ---------------------------
// TYPES
// ---------------------------

type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// ---------------------------
// CONSTANTS
// ---------------------------

export const PERMISSIONS = {
  READ_PERMISSIONS: 'read_permissions',
} as const;

export const PERMISSION_VALUES = Object.values(PERMISSIONS) as [
  Permission,
  ...Permission[],
];
