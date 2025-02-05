import { CustomPagination } from './custom-pagination';
import { CustomSelect } from './custom-select';
import { PaginationMenuProps } from './types';

export const PaginationMenu = ({
  totalItems,
  page,
  lastPage,
  prevPage,
  nextPage,
  changePage,
}: PaginationMenuProps) => {
  return (
    <div className="flex flex-wrap justify-around">
      <CustomSelect page={page} totalItems={totalItems} />

      <CustomPagination
        page={page}
        lastPage={lastPage}
        prevPage={prevPage}
        nextPage={nextPage}
        changePage={changePage}
      />
    </div>
  );
};
