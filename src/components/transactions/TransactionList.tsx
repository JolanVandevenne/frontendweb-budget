import Transaction from './Transaction';
import { TRANSACTION_DATA } from '../../api/mock_data';
import type { Transaction as TransactionType } from '../../types';

export default function TransactionList() {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Transactions</h1>
      {TRANSACTION_DATA.map((trans: TransactionType) => (
        <Transaction key={trans.id} {...trans} />
      ))}
    </>
  );
}
