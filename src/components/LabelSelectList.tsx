import type { ComponentPropsWithoutRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';


interface SelectListItem {
  value: number | string;
  label: string;
}



interface LabelSelectListProps extends Omit<
  ComponentPropsWithoutRef<typeof Select>,
  'value' | 'items' | 'onValueChange' | 'onOpenChange'
> {
  label: string;
  name: string;
  items: SelectListItem[];
  placeholder?: string;
}

const LabelSelectList = ({
  label,
  name,
  items,
  placeholder,
  ...rest
}: LabelSelectListProps) => {
  const { control, formState: { isSubmitting } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Select
            value={field.value || null}
            items={items}
            onValueChange={field.onChange}
            onOpenChange={() => field.onBlur()}
            disabled={isSubmitting}
            {...rest}
          >
            <SelectTrigger id={field.name}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default LabelSelectList;
