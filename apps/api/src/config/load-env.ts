// Load env in non-production environments
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('dotenv').config(); // Used "require()" because conditional "import()" uses async
}
