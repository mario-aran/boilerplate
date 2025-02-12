import { DefaultLayout } from '@/components/layouts/default-layout';
import { EmptyLayout } from '@/components/layouts/empty-layout';
import { ROUTES } from '@/constants/routes';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomeRoute } from './routes/home.route';
import { NotFoundRoute } from './routes/not-found.route';
import { RecipesRoute } from './routes/recipes.route';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<EmptyLayout />}>
          <Route path="*" element={<NotFoundRoute />} />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route index element={<HomeRoute />} />
          <Route path={ROUTES.RECIPES} element={<RecipesRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
