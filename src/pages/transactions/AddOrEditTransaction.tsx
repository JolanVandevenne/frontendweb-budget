import useSWR from 'swr';
import { getAll } from '../../api';
import TransactionForm from '../../components/transactions/TransactionForm';
import AsyncData from '../../components/AsyncData';
import type { Place } from '../../types';

export default function AddOrEditTransaction() {
  const {
    data: places = [],
    error: placesError,
    isLoading: placesLoading,
  } = useSWR<Place[]>('places', getAll);

  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Add transaction</h1>
      <AsyncData error={placesError} loading={placesLoading}>
        <TransactionForm places={places} />
      </AsyncData>
    </>
  );
}
