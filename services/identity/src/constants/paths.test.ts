import { describe, expect, it } from 'vitest';
import { convertPathsToSwagger } from './paths';

describe('convertPathsToSwagger', () => {
  it('replaces a single :param with {param}', () => {
    const input = { path: 'path/:id' };
    const result = convertPathsToSwagger(input);

    expect(result).toEqual({ path: 'path/{id}' });
  });

  it('replaces multiple :param with {param} on the same path', () => {
    const input = { path: '/path/:id/:nestedId' };
    const result = convertPathsToSwagger(input);

    expect(result).toEqual({ path: '/path/{id}/{nestedId}' });
  });

  it('leaves paths without : unchanged', () => {
    const input = { path: '/path' };
    const result = convertPathsToSwagger(input);

    expect(result).toEqual(input);
  });
});
