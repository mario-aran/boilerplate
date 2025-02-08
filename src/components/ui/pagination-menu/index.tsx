import { CustomPagination } from './custom-pagination';
import { CustomSelect } from './custom-select';
import { PaginationMenuProps } from './types';

export const PaginationMenu = ({
  page,
  lastPage,
  changePage,
  ...customSelectProps
}: PaginationMenuProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-10">
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
