import { Button } from '@/components/shadcn-ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/shadcn-ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomSelect } from './custom-select';
import { CustomSelectProps } from './types';

// Types
interface PaginationMenuProps extends CustomSelectProps {
  lastPage: number;
  changePage: (newPage: number) => void;
}

// Constants
const FIRST_PAGE = 1;

export const PaginationMenu = ({
  page,
  lastPage,
  changePage,
  ...customSelectProps
}: PaginationMenuProps) => {
  return (
    <div className="flex flex-wrap justify-around">
      {/* Selector */}
      <CustomSelect page={page} {...customSelectProps} />

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <Button
              disabled={page <= FIRST_PAGE}
              variant="ghost"
              size="icon"
              onClick={() => changePage(page - 1)}
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>

          {/* First */}
          {page > FIRST_PAGE && (
            <PaginationItem>
              <PaginationLink onClick={() => changePage(FIRST_PAGE)}>
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
              <PaginationLink onClick={() => changePage(lastPage)}>
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
              onClick={() => changePage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
