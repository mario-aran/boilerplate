import { TanstackProvider } from '@/lib/tanstack/tanstack.provider';
import { PropsWithChildren } from 'react';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return <TanstackProvider>{children}</TanstackProvider>;
};
