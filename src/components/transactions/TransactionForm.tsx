import type { Place } from '../../types';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { LocalizedDate } from '../LocalizedDate';
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';

interface TransactionFormProps {
  places?: Place[];
}

const formSchema = z.object({
  userId: z
    .number({ error: 'User Id is required and must be a number' })
    .min(1, 'User Id must be minimum 1'),
  amount: z
    .number({ error: 'Amount is required and must be a number' })
    .refine((value) => !isNaN(value), {
      message: 'Amount is required and must be a number',
    })
    .refine((value) => value !== 0, { message: '0 is not a valid amount' }),
  placeId: z.number({ error: 'Place is required' }).min(1, 'Place is required'),
  date: z
    .date()
    .max(
      new Date().setDate(new Date().getDate() + 1),
      'Date cannot be in the future',
    )
});

type TransactionFormValues = z.infer<typeof formSchema>;

export default function TransactionForm({ places = [] }: TransactionFormProps) {
  const { trigger: saveTransaction, error: saveError } = useSWRMutation('transactions', save);

  const form = useForm<TransactionFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: 0,
      amount: 0,
      placeId: 0,
      date: new Date()
    },
  });
  const { isValid } = form.formState;

  const onSubmit = async (values: TransactionFormValues) => {
    if (!isValid) return;
    await saveTransaction(
      {
        ...values,
      },
      {
        throwOnError: false,
        onSuccess: () => form.reset()
      },
    );
  };

  const placesSelectItems = places.map((place) => ({
    value: place.id,
    label: place.name,
  }));

  return (
    <>
      <Error error={saveError} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name='userId'
            render={(
              { field, fieldState },
            ) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>User Id</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type='number'
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='amount'
            render={(
              { field, fieldState },
            ) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type='number'
                  placeholder='0.00'
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="placeId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Place</FieldLabel>
                <Select
                  value={field.value || null}
                  items={placesSelectItems}
                  onValueChange={field.onChange}
                  onOpenChange={() => field.onBlur()}
                >
                  <SelectTrigger id={field.name} className="w-45">
                    <SelectValue placeholder="Place" />
                  </SelectTrigger>
                  <SelectContent>
                    {placesSelectItems.map((item) => (
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

          <Controller
            control={form.control}
            name='date'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel id={field.name}>Date</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant='outline'
                        data-empty={!field.value}
                        className='justify-start text-left font-normal data-[empty=true]:text-muted-foreground'
                      />
                    }
                    className='flex w-full justify-between'
                  >
                    {field.value ? (
                      <LocalizedDate date={field.value} />
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <ChevronDownIcon className='size-4' />
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      weekStartsOn={1}
                      disabled={{ after: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </FieldGroup>
        <div className='flex justify-end gap-2 pt-6'>
          <Button type='submit'>Add transaction</Button>
        </div>
      </form>

    </>
  );
}
