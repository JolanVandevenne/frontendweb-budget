import type { Transaction as TransactionType } from '../../types';
import { TableRow, TableCell } from '../ui/table';

type TransactionProps = TransactionType;

const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

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
      <TableCell>{dateFormat.format(new Date(date))}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{place.name}</TableCell>
      <TableCell>{amountFormat.format(amount)}</TableCell>
    </TableRow>
  );
}