import { PropsWithChildren } from 'react';

export const BaseMain = ({ children }: PropsWithChildren) => {
  return (
    <main className="container mx-auto flex flex-1 flex-col">{children}</main>
  );
};
