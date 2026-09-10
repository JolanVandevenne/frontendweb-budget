import type { Place as PlaceType } from '../../types';
import Place from './Place';

interface PlacesCardsProps {
  places?: PlaceType[];
  onRate: (data: { id: number; name: string, rating: number }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function PlacesCards({ places, onRate, onDelete }: PlacesCardsProps) {
  if (!places) return null;

  if (places.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">There are no places yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places
        .toSorted((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p) => (
          <Place key={p.id} {...p} onRate={onRate} onDelete={onDelete} />
        ))}
    </div>
  );
}