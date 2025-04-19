// Load env in non-production environments
if (process.env.NODE_ENV !== 'production') {
  // Disabled eslint rule for "require()" since conditional "import()" uses async
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config();
}
