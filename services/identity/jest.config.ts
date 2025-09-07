import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest', // "ts-jest": Allows typescript usage
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  globalSetup: '<rootDir>/tests/config/global-setup.ts',
  globalTeardown: '<rootDir>/tests/config/global-teardown.ts',
};

export default config;
