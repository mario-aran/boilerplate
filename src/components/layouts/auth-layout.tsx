import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <>
      {/* Nested route */}
      <Outlet />
    </>
  );
};
