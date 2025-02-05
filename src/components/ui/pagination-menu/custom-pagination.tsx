import { Button } from '@/components/shadcn-ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/shadcn-ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomPaginationProps } from './types';

// Constants
const FIRST_PAGE = 1;

export const CustomPagination = ({
  page,
  lastPage,
  prevPage,
  nextPage,
  changePage,
}: CustomPaginationProps) => {
  // Render conditions
  const showFirstPage = page !== FIRST_PAGE;
  const showLastPage = page !== lastPage;
  const showFirstEllipsis = page > 2;
  const showLastEllipsis = page < lastPage - 1;

  // Utils
  const handlePageChange = (newPage: number | null) => () => {
    if (newPage === null) return; // Not null guard
    if (newPage < FIRST_PAGE || newPage > lastPage) return; // Available pages guard
    changePage(newPage);
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Previous page */}
          <PaginationItem>
            <Button
              disabled={!prevPage}
              variant="ghost"
              size="icon"
              onClick={handlePageChange(prevPage)}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>

          {showFirstPage && (
            <PaginationItem>
              <PaginationLink onClick={handlePageChange(FIRST_PAGE)}>
                {FIRST_PAGE}
              </PaginationLink>
            </PaginationItem>
          )}

          {showFirstEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Current page */}
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          {showLastEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {showLastPage && (
            <PaginationItem>
              <PaginationLink onClick={handlePageChange(lastPage)}>
                {lastPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next page */}
          <PaginationItem>
            <Button
              disabled={!nextPage}
              variant="ghost"
              size="icon"
              onClick={handlePageChange(nextPage)}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
