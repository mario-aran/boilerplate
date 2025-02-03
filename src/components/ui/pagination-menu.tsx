import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn-ui/pagination';

// Types
interface PaginationMenuProps {
  itemsPerPage: number;
  totalItems: number;
  firstItem: number;
  lastItem: number;
  lastPage: number;
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  changePage: (page: number) => void;
}

// Constants
const FIRST_PAGE = 1;

export const PaginationMenu = ({
  totalItems,
  itemsPerPage,
  page,
  lastPage,
  prevPage,
  nextPage,
  changePage,
}: PaginationMenuProps) => {
  // Items
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);

  // Render conditions
  const showFirstEllipsis = page > 2;
  const showLastEllipsis = page < lastPage - 1;
  const showCurrentPage = page !== FIRST_PAGE && page !== lastPage;

  // Utils
  const handlePageChange = (newPage: number | null) => () => {
    // Not null guard
    if (newPage === null) return;

    // Available pages guard
    if (newPage < FIRST_PAGE || newPage > lastPage) return;

    // Change page
    changePage(newPage);
  };

  return (
    <>
      <div>Items per page: {totalItems}</div>
      <div>
        {firstItem}-{lastItem} of {totalItems}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePageChange(prevPage)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={handlePageChange(FIRST_PAGE)}>
              {FIRST_PAGE}
            </PaginationLink>
          </PaginationItem>

          {showFirstEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {showCurrentPage && (
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>
          )}

          {showLastEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink onClick={handlePageChange(lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handlePageChange(nextPage)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
