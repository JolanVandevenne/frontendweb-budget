import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import PlacesCards from '../../components/places/PlacesCards';
import { getAll, deleteById, updateById } from '../../api';
import AsyncData from '../../components/AsyncData';
import type { Place } from '../../types';

export default function PlacesList() {
  const {
    data, error, isLoading,
  } = useSWR<Place[]>('places', getAll);

  const { trigger: deletePlace, error: deleteError } = useSWRMutation('places', deleteById);

  const {
    trigger: savePlace, error: saveError,
  } = useSWRMutation('places', updateById);

  const handleDelete = async (id: number) => {
    await deletePlace(id);
  }

  const handleRate = async (data: { id: number; name: string, rating: number }) => {
    await savePlace(data);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Places</h1>
      <AsyncData loading={isLoading} error={error ?? deleteError ?? saveError}>
        <PlacesCards places={data} onRate={handleRate} onDelete={handleDelete} />
      </AsyncData>
    </>
  );
}