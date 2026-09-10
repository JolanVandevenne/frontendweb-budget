// src/components/LabelInput.tsx
import type { ComponentPropsWithoutRef } from 'react';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';


interface LabelInputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  name: string;
}


const LabelInput = ({
  label,
  name,
  placeholder,
  type,
  ...rest
}: LabelInputProps) => {
  const { control, formState: { isSubmitting } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel id={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={isSubmitting}
            onChange={(e) =>
              field.onChange(
                type === 'number' ? e.target.valueAsNumber : e.target.value,
              )
            }
            {...rest}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default LabelInput;
