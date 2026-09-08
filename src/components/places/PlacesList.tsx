import { useState } from 'react';
import { PLACE_DATA } from '../../api/mock_data';
import Place from './Place';

const PlacesList = () => {
  const [places, setPlaces] = useState(PLACE_DATA);

  const handleDeletePlace = (id: number) => {
    setPlaces((places) => places.filter((p) => p.id !== id));
  };

  const handleRatePlace = (id: number, rating: number) => {
    const newPlaces = places.map((p) => (p.id === id ? { ...p, rating } : p));
    setPlaces(newPlaces);
  };

  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Places</h1>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {places
          .sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase()),
          )
          .map((p) => (
            <Place key={p.id} {...p} onDelete={handleDeletePlace} onRate={handleRatePlace} />
          ))}
      </div>
    </>
  );
};

export default PlacesList;