import type { Place as PlaceType } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceProps extends PlaceType {
  onDelete: (id: number) => void;
}

const Place = ({ id, name, onDelete }: PlaceProps) => {

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base'>{name}</CardTitle>
        <CardAction>
          <Button
            variant='link'
            onClick={handleDelete}
            className='text-destructive hover:text-destructive'
          >
            Verwijder
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default Place;