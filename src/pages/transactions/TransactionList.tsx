// src/pages/TransactionList.tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import type { Transaction } from '../../types';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import { getAll } from '../../api';

export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useSWR<Transaction[]>(
    'transactions',
    getAll,
  );

  const filteredTransactions =
    data?.filter((t) =>
      t.place.name.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <>
      <h1>Transactions</h1>

      <div className='flex justify-between mb-4 gap-2'>
        <div className='flex gap-2 w-1/2'>
          <Input
            type='search'
            placeholder='Search by place…'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant='outline' onClick={() => setSearch(text)}>
            Search
          </Button>
        </div>
      </div>

      <AsyncData loading={isLoading} error={error}>
        <TransactionsTable transactions={filteredTransactions} />
      </AsyncData>
    </>
  );
}
