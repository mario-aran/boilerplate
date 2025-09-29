export const setupSpy = <T extends object>(module: T, method: keyof T) => {
  let spy: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    spy = vi.spyOn(module, method as never);
  });

  beforeEach(() => {
    spy.mockClear();
  });

  afterAll(() => {
    spy.mockRestore();
  });

  return () => spy;
};
