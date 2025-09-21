import { _testable } from '@/constants/paths';

// Values
const { convertPathsToSwagger } = _testable;

describe('convertPathsToSwagger', () => {
  it('replaces a single :param with {param}', () => {
    const input = { path: 'path/:id' };
    const actual = convertPathsToSwagger(input);

    expect(actual).toEqual({ path: 'path/{id}' });
  });

  it('replaces multiple :param with {param} on the same path', () => {
    const input = { path: '/path/:id/:nestedId' };
    const actual = convertPathsToSwagger(input);

    expect(actual).toEqual({ path: '/path/{id}/{nestedId}' });
  });

  it('leaves paths without : unchanged', () => {
    const input = { path: '/path' };
    const actual = convertPathsToSwagger(input);

    expect(actual).toEqual(input);
  });
});
