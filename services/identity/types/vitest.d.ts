// Empty export to make this file a module
export {};

declare module 'vitest' {
  export interface ProvidedContext {
    mailhogUIPort: number;
  }
}
