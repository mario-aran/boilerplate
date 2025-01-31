import { AuthLayout, HeadlessLayout, PublicLayout } from '@/components/layouts';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomeRoute } from './routes/home.route';
import { LoginRoute } from './routes/login.route';
import { NotFoundRoute } from './routes/not-found.route';
import { ProductsRoute } from './routes/products.route';
import { UsersRoute } from './routes/users.route';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomeRoute />} />
        </Route>

        {/* Private*/}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginRoute />} />
          <Route path="users" element={<UsersRoute />} />
          <Route path="products" element={<ProductsRoute />} />
        </Route>

        {/* Headless */}
        <Route element={<HeadlessLayout />}>
          {/* No match */}
          <Route path="*" element={<NotFoundRoute />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
