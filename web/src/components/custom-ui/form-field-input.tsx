import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn-ui/form';
import { Input } from '@/components/shadcn-ui/input';
import { Control, FieldValues, Path } from 'react-hook-form';

// Types
interface FormFieldInputProps<T extends FieldValues> {
  control: Control<T>;
  input: Path<T>;
}
export const FormFieldInput = <T extends FieldValues>({
  control,
  input,
}: FormFieldInputProps<T>) => {
  const label = input.charAt(0).toUpperCase() + input.slice(1);

  return (
    <FormField
      control={control}
      name={input}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center">
          <FormLabel>{label}</FormLabel>
          <FormControl className="col-span-3">
            <Input placeholder={input} {...field} />
          </FormControl>
          <FormMessage className="col-span-4" />
        </FormItem>
      )}
    />
  );
};
