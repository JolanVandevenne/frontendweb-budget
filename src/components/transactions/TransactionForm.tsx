import type { Place, Transaction } from '../../types';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FieldGroup
} from '@/components/ui/field';
import useSWRMutation from 'swr/mutation';
import { save } from '../../api';
import Error from '../Error';
import { Link, useNavigate } from 'react-router';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LabelInput from '../LabelInput';
import LabelSelectList from '../LabelSelectList';
import LabelDatePicker from '../LabelDatePicker';

interface TransactionFormProps {
  places?: Place[];
  transaction?: Transaction;
}

const EMPTY_TRANSACTION: Partial<Transaction> = {
  id: undefined,
  amount: 0,
  date: new Date().toISOString(),
  place: { id: 0, name: '', rating: 0 },
  user: { id: 0, name: '' },
};

const formSchema = z.object({
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

export default function TransactionForm({ places = [], transaction = EMPTY_TRANSACTION as Transaction }: TransactionFormProps,) {
  const navigate = useNavigate();

  const { trigger: saveTransaction, error: saveError } = useSWRMutation('transactions', save);

  const form = useForm<TransactionFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      placeId: transaction?.place.id,
      amount: transaction?.amount ?? 0,
    },
    values: transaction
      ? {
        date: transaction?.date ? new Date(transaction.date) : new Date(),
        placeId: transaction.place.id,
        amount: transaction.amount,
      }
      : undefined,
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: TransactionFormValues) => {
    if (!isValid) return;
    await saveTransaction(
      {
        id: transaction?.id,
        ...values,
      },
      {
        throwOnError: false,
        onSuccess: () => { navigate('/transactions') }
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <LabelInput
              label='amount'
              name='amount'
              placeholder='0.00'
              type='number'
              data-testid="amount-input"
            />
            <LabelSelectList
              label='Place'
              name='placeId'
              placeholder='Place'
              items={placesSelectItems}
            />
            <LabelDatePicker
              label='Date'
              name='date'
              placeholder='Pick a date'
              testId="date-picker-trigger"
            />
          </FieldGroup>
          <div className="flex justify-end gap-2 pt-6">
            <Button type="submit" disabled={isSubmitting} >
              {transaction?.id ? 'Save transaction' : 'Add transaction'}
            </Button>
            <Link to="/transactions" className={cn(buttonVariants({ variant: 'outline' }))}>
              Cancel
            </Link>
          </div>
        </form>
      </FormProvider>

    </>
  );
}
