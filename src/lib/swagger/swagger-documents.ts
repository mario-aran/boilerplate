import { pathsV1 } from './paths/v1';
import { generateDocument } from './utils/generate-document';

export const swaggerDocumentV1 = generateDocument({
  version: 'v1',
  paths: pathsV1,
});
