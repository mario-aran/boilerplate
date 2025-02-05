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
  changePage,
}: CustomPaginationProps) => {
  // Utils
  const handlePageChange = (newPage: number) => () => {
    if (newPage < FIRST_PAGE || newPage > lastPage) return; // Guard against invalid pages
    changePage(newPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <Button
            disabled={page <= FIRST_PAGE}
            variant="ghost"
            size="icon"
            onClick={handlePageChange(page - 1)}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {/* First */}
        {page > FIRST_PAGE && (
          <PaginationItem>
            <PaginationLink onClick={handlePageChange(FIRST_PAGE)}>
              {FIRST_PAGE}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis before current */}
        {page > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Current */}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {/* Ellipsis after current */}
        {page < lastPage - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last */}
        {page < lastPage && (
          <PaginationItem>
            <PaginationLink onClick={handlePageChange(lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <Button
            disabled={page >= lastPage}
            variant="ghost"
            size="icon"
            onClick={handlePageChange(page + 1)}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
