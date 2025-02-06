import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { CustomSelectProps } from './types';

export const CustomSelect = ({
  itemsPerPageOptions,
  itemsPerPage,
  totalItems,
  page,
  changeItemsPerPage,
}: CustomSelectProps) => {
  // Message values
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);
  const message =
    totalItems > 0
      ? `Showing ${firstItem}-${lastItem} of ${totalItems} items`
      : 'No items available';

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Selector */}
      <div className="flex items-center">
        <p className="whitespace-nowrap">Items per page:</p>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => changeItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[58px] border-none focus:ring-transparent">
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <p className="whitespace-nowrap">{message}</p>
    </div>
  );
};
