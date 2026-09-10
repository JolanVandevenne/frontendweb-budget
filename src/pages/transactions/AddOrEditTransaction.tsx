import { useParams } from 'react-router';
import useSWR from 'swr';
import { getById, getAll } from '../../api';
import TransactionForm from '../../components/transactions/TransactionForm';
import AsyncData from '../../components/AsyncData';
import type { Transaction, Place } from '../../types';

export default function AddOrEditTransaction() {
  const { id } = useParams<{ id: string }>();

  const {
    data: transaction,
    error: transactionError,
    isLoading: transactionLoading,
  } = useSWR<Transaction>(id ? `transactions/${id}` : null, getById);

  const {
    data: places = [],
    error: placesError,
    isLoading: placesLoading,
  } = useSWR<Place[]>('places', getAll);

  return (
    <>
      <h1>
        {id ? 'Edit transaction' : 'Add transaction'}
      </h1>
      <AsyncData
        error={transactionError ?? placesError}
        loading={transactionLoading || placesLoading}
      >
        <TransactionForm places={places} transaction={transaction} />
      </AsyncData>
    </>
  );
}
