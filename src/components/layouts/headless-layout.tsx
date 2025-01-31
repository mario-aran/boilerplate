import { Outlet } from 'react-router';

export const HeadlessLayout = () => {
  return (
    <>
      {/* Nested route */}
      <Outlet />
    </>
  );
};
