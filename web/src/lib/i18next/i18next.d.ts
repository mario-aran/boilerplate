// "i18next": Copied from https://www.i18next.com/overview/typescript

import { DEFAULT_LANGUAGE, DEFAULT_NS, resources } from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: (typeof resources)[typeof DEFAULT_LANGUAGE];
  }
}
