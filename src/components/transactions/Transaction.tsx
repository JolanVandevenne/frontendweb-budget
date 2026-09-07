import type { Transaction as TransactionType } from '../../types';
import { Separator } from '@/components/ui/separator';

type TransactionProps = Omit<TransactionType, 'id' | 'date'>;

export default function Transaction({ user, place, amount }: TransactionProps) {
  return (
    <>
      <div className='text-center m-2'>
        {user.name} gaf €{amount} uit bij {place.name}
      </div>
      <Separator />
    </>);

}