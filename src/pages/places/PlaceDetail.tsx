// src/pages/places/PlaceDetail.tsx
import { useParams } from 'react-router';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import type { Place } from '../../types';

const PlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const idAsNumber = Number(id);

  const {
    data: place,
    error: placeError,
    isLoading: placeLoading,
  } = useSWR<Place & { transactions: import('../../types').Transaction[] }>(
    id ? `places/${idAsNumber}` : null,
    getById,
  );

  if (!place) {
    return (
      <>
        <h1>Place not found</h1>
        <p>No place was found with id {id}.</p>
      </>
    );
  }

  return (
    <AsyncData loading={placeLoading} error={placeError}>
      <h1>Place {place.name}</h1>
      <TransactionsTable transactions={place.transactions} />
    </AsyncData>
  );
};

export default PlaceDetail;
