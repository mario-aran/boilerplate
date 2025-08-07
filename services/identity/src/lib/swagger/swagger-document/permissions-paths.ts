import { SWAGGER_PATHS } from '@/constants/routes';

// Values
const tags = ['permissions'];

export const permissionsPaths = {
  [SWAGGER_PATHS.PERMISSIONS]: {
    get: {
      tags,
    },
  },
};
