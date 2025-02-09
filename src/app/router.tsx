import { PublicLayout } from '@/components/layouts/public-layout';
import { ROUTES } from '@/constants/routes';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomeRoute } from './routes/home.route';
import { NotFoundRoute } from './routes/not-found.route';
import { RecipesRoute } from './routes/recipes.route';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomeRoute />} />
          <Route path={ROUTES.RECIPES} element={<RecipesRoute />} />
        </Route>

        {/* No match */}
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
