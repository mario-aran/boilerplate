import { SWAGGER_PATHS } from '@/constants/routes';

// Values
const tags = ['roles'];

export const rolesPaths = {
  [SWAGGER_PATHS.ROLES]: {
    get: {
      tags,
    },
    post: {
      tags,
    },
  },

  [SWAGGER_PATHS.ROLES_ID]: {
    get: {
      tags,
    },
    patch: {
      tags,
    },
    delete: {
      tags,
    },
  },
};
