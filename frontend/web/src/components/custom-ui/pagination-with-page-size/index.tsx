import { CustomPagination } from './custom-pagination';
import { PageSizeSelector } from './page-size-selector';
import { PaginationWithPageSizeProps, RNArray } from './types';

export const PaginationWithPageSize = <T extends RNArray>({
  page,
  lastPage,
  changePage,
  ...customSelectProps
}: PaginationWithPageSizeProps<T>) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10">
      <PageSizeSelector page={page} {...customSelectProps} />

      <CustomPagination
        page={page}
        lastPage={lastPage}
        changePage={changePage}
      />
    </div>
  );
};
