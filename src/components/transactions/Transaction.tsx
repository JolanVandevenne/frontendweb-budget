import type { Transaction as TransactionType } from '../../types';
import { TableRow, TableCell} from '../ui/table'
import { LocalizedDate } from '../LocalizedDate';
import { LocalizedAmount } from '../LocalizedAmount';

type TransactionProps = TransactionType;

export default function Transaction({ user, place, amount, date}: TransactionProps) {

  return (
    <>
      <TableRow>
        <TableCell><LocalizedDate date= {date}/></TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{place.name}</TableCell>
        <TableCell><LocalizedAmount amount= {amount}/></TableCell>
      </TableRow>
    </>
    );

}