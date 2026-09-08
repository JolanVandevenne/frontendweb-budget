import type { Transaction as TransactionType } from '../../types';
import { TableRow, TableCell } from '@/components/ui/table';
import { LocalizedDate } from '../LocalizedDate';

type TransactionProps = TransactionType;


const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default function Transaction({
  user,
  place,
  amount,
  date,
}: TransactionProps) {
  return (
    <TableRow>
      <TableCell><LocalizedDate date={date} /></TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{place.name}</TableCell>
      <TableCell>{amountFormat.format(amount)}</TableCell>
    </TableRow>
  );
}