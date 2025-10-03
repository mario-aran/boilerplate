// Empty export ensures this file is treated as a module
export {};

declare module 'vitest' {
  export interface ProvidedContext {
    mailhogUIPort: number;
  }
}
