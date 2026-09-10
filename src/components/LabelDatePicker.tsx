import type { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { LocalizedDate } from './LocalizedDate';

interface LabelDatePickerFieldProps extends Omit<
  ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect'
> {
  label: string;
  name: string;
  placeholder?: string;
  testId?: string;
}

const LabelDatePicker = ({
  label,
  name,
  placeholder = 'Pick a date',
  testId,
  ...rest
}: LabelDatePickerFieldProps) => {
  const { control, formState: { isSubmitting } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel id={field.name}>{label}</FieldLabel>
          <Popover>
            <PopoverTrigger
              disabled={isSubmitting}
              render={
                <Button
                  variant='outline'
                  data-empty={!field.value}
                  className='justify-start text-left font-normal data-[empty=true]:text-muted-foreground'
                  data-testid={testId}
                />
              }
              className='flex w-full justify-between'
            >
              {field.value ? (
                <LocalizedDate date={field.value} />
              ) : (
                <span>{placeholder}</span>
              )}
              <ChevronDownIcon className='size-4' />
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                weekStartsOn={1}
                {...rest}
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default LabelDatePicker;
