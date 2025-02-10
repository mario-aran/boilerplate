import { PropsWithChildren } from 'react';

export const LayoutWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex min-h-screen flex-col">{children}</div>;
};
