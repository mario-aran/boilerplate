import { describe, expect, it } from 'vitest';
import { replaceDotIds } from './routes';

describe('replaceDotIds', () => {
  it('replaces :id with {id} in a route object property value', () => {
    const input = { route: '/route/:id' };
    const result = replaceDotIds(input);

    expect(result.route).toBe('/route/{id}');
  });

  it('replaces multiple :id with {id} in the same route property value', () => {
    const input = { route1: '/route1/:id', route2: '/route2/:id' };
    const result = replaceDotIds(input);

    expect(result).toEqual({ route1: '/route1/{id}', route2: '/route2/{id}' });
  });

  it('leaves route properties without :id unchanged', () => {
    const input = { route1: '/route1', route2: '/route2' };
    const result = replaceDotIds(input);

    expect(result).toEqual(input);
  });
});
