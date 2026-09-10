import type { Transaction as TransactionType } from '../../types';
import { TableRow, TableCell } from '@/components/ui/table';
import { LocalizedDate } from '../LocalizedDate';
import { Button, buttonVariants } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

interface TransactionProps extends TransactionType {
  onDelete?: (id: number) => void;
}


const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default function Transaction({ id,
  user,
  place,
  amount,
  date, onDelete
}: TransactionProps) {

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <TableRow data-testid="transaction">
      <TableCell><LocalizedDate date={date} /></TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{place.name}</TableCell>
      <TableCell>{amountFormat.format(amount)}</TableCell>
      <TableCell className='text-right'>
        <div className='flex justify-end gap-1'>
          <Link
            to={`/transactions/edit/${id}`}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <Pencil className='h-4 w-4' />
          </Link>
          {onDelete && (
            <Button
              variant='ghost'
              size='icon'
              aria-label='Delete transaction'
              className='text-destructive hover:text-destructive'
              onClick={handleDelete}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}