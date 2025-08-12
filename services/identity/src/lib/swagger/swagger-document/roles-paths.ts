import { DOC_PATHS } from '@/constants/routes';

// Values
const tags = ['roles'];

export const rolesPaths = {
  [DOC_PATHS.ROLES]: {
    get: {
      tags,
    },
    post: {
      tags,
    },
  },

  [DOC_PATHS.ROLES_ID]: {
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
