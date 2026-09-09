import type { Place as PlaceType } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import StarRating from './StarRating';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router';

interface PlaceProps extends PlaceType {
  onDelete: (id: number) => void;
  onRate: (id: number, newRating: number) => void;
}

const Place = ({ id, name, rating, onDelete, onRate }: PlaceProps) => {

  const handleRate = (newRating: number) => {
    onRate(id, newRating);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base'>
          <Link to={`/places/${id}`} className='hover:underline'>
            {name}
          </Link>
        </CardTitle>
        <CardAction>
          <Button
            variant='link'
            onClick={handleDelete}
            size='icon'
            className='text-destructive hover:text-destructive'
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <StarRating selectedStars={rating} onRate={handleRate} />
      </CardContent>
    </Card>
  );
};

export default Place;