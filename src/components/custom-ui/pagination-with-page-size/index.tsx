import { CustomPagination } from './custom-pagination';
import { PageSizeSelector } from './page-size-selector';
import { CustomPaginationProps, PageSizeSelectorProps } from './types';

// Types
type PaginationWithPageSizeProps = PageSizeSelectorProps &
  CustomPaginationProps;

export const PaginationWithPageSize = ({
  page,
  lastPage,
  changePage,
  ...customSelectProps
}: PaginationWithPageSizeProps) => {
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
