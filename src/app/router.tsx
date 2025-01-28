import { BrowserRouter, Route, Routes } from 'react-router';
import { About } from './routes/about';
import { Home } from './routes/home';
import { NotFound } from './routes/not-found';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* No match */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
