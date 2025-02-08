import { Button } from '@/components/shadcn-ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/shadcn-ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types
interface PaginationMenuProps {
  page: number;
  lastPage: number;
  itemsPerPageOptions: number[];
  itemsPerPage: number;
  totalItems: number;
  changePage: (newPage: number) => void;
  changeItemsPerPage: (itemsPerPage: number) => void;
}

// Constants
const FIRST_PAGE = 1;

export const PaginationMenu = ({
  itemsPerPageOptions,
  itemsPerPage,
  totalItems,
  page,
  lastPage,
  changeItemsPerPage,
  changePage,
}: PaginationMenuProps) => {
  // Selector values
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);
  const message =
    totalItems > 0
      ? `${firstItem}-${lastItem} of ${totalItems} items`
      : 'No items available';

  return (
    <div className="flex flex-wrap justify-around">
      {/* Selector */}
      <div className="flex items-center text-sm">
        <div className="flex items-center gap-1">
          <p className="whitespace-nowrap">Items per page:</p>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => changeItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[58px] border-none focus:ring-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {itemsPerPageOptions.map((option) => {
                const strOption = option.toString();
                return (
                  <SelectItem key={strOption} value={strOption}>
                    {strOption}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <p className="whitespace-nowrap">{message}</p>
      </div>

      {/* Pagination */}
      <div>
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
    </div>
  );
};
