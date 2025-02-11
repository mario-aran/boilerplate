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
    <div className="flex flex-wrap items-center justify-center gap-x-10">
      <CustomSelect page={page} {...customSelectProps} />

      <CustomPagination
        page={page}
        lastPage={lastPage}
        changePage={changePage}
      />
    </div>
  );
};
