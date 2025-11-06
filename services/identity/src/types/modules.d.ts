// Empty export ensures this file is a module
export {};

declare module 'vitest' {
  export interface ProvidedContext {
    mailhogUIPort: number;
  }
}
