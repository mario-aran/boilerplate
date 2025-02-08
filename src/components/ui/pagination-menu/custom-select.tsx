import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { CustomSelectProps } from './types';

export const CustomSelect = ({
  page,
  itemsPerPageOptions,
  itemsPerPage,
  totalItems,
  changeItemsPerPage,
}: CustomSelectProps) => {
  // Values
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, totalItems);
  const message =
    totalItems > 0
      ? `${firstItem}-${lastItem} of ${totalItems} items`
      : 'No items available';

  return (
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
  );
};
