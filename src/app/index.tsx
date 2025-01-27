import { AppProvider } from './provider';
import { ReactRouter } from './react-router';

export const App = () => {
  return (
    <AppProvider>
      <ReactRouter />
    </AppProvider>
  );
};
