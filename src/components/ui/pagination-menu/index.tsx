import { CustomPagination } from './custom-pagination';
import { CustomSelect } from './custom-select';
import { PaginationMenuProps } from './types';

export const PaginationMenu = ({
  itemsPerPageOptions,
  totalItems,
  page,
  lastPage,
  changePage,
}: PaginationMenuProps) => {
  return (
    <div className="flex flex-wrap justify-around">
      <CustomSelect
        itemsPerPageOptions={itemsPerPageOptions}
        totalItems={totalItems}
        page={page}
      />

      <CustomPagination
        page={page}
        lastPage={lastPage}
        changePage={changePage}
      />
    </div>
  );
};
