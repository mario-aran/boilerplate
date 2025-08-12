export const idPathParam = {
  in: 'path',
  name: 'id',
  schema: { type: 'string' },
  description: 'Resource ID',
};

export const paginatedQueryParams = [
  {
    in: 'query',
    name: 'limit',
    schema: { type: 'integer', example: 1 },
    description: 'Results per page',
  },
  {
    in: 'query',
    name: 'page',
    schema: { type: 'integer', example: 1 },
    description: 'Page number',
  },
  {
    in: 'query',
    name: 'sort',
    schema: { type: 'array', items: { type: 'string', example: '-id' } },
    explode: true,
    description: 'Sort by columns. Use "-" prefix for descending',
  },
  {
    in: 'query',
    name: 'search',
    schema: { type: 'string' },
    description: 'Search by words',
  },
];
