import { CustomPagination } from '@/components/ui/custom-pagination';
import { CustomSelect } from './custom-select';
import { PaginationMenuProps } from './types';

export const PaginationMenu = <T extends number[]>({
  page,
  lastPage,
  changePage,
  ...customSelectProps
}: PaginationMenuProps<T>) => {
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
