import { Outlet } from 'react-router';
import { BaseFooter } from './components/base-footer';
import { BaseHeader } from './components/base-header';
import { BaseMain } from './components/base-main';
import { LayoutWrapper } from './components/layout-wrapper';

export const DefaultLayout = () => {
  return (
    <LayoutWrapper>
      <BaseHeader />

      <BaseMain>
        <div className="flex-1 border-x p-6">
          {/* "react-router" */}
          <Outlet />
        </div>
      </BaseMain>

      <BaseFooter />
    </LayoutWrapper>
  );
};
