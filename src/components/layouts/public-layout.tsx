import { Outlet } from 'react-router';

export const PublicLayout = () => {
  return (
    <>
      {/* Nested route */}
      <Outlet />
    </>
  );
};
