import { CustomPagination } from '@/components/ui/custom-pagination';
import { CustomSelect } from './custom-select';
import { PaginationMenuProps } from './types';

export const PaginationMenu = ({
  page,
  lastPage,
  changePage,
  ...customSelectProps
}: PaginationMenuProps) => {
  return (
    <div className="flex flex-wrap justify-center space-x-10">
      <CustomSelect page={page} {...customSelectProps} />

      <div>
        <CustomPagination
          page={page}
          lastPage={lastPage}
          changePage={changePage}
        />
      </div>
    </div>
  );
};
