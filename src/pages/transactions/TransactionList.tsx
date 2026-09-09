// src/pages/TransactionList.tsx
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import type { Transaction } from '../../types';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteById, getAll } from '../../api';
import { toast } from 'sonner';
import type { KeyboardEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';



export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (e.target.value === '') {
      setSearch('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(text);
    }
  };

  const { data, isLoading, error, mutate } = useSWR(
    `transactions?${search ? `search=${search}` : ''}`,
    getAll<Transaction[]>,
  );

  const {
    trigger: deleteTransaction, error: deleteError,
  } = useSWRMutation('transactions', deleteById);


  const handleDeleteTransaction = async (id: number) => {
    await deleteTransaction(id);
    await mutate();
    toast.success('Transaction removed');
  };

  return (
    <>
      <h1>Transactions</h1>

      <div className='flex justify-between mb-4 gap-2'>
        <div className='flex gap-2 w-1/2'>
          <Input
            type='search'
            placeholder='Search by place…'
            value={text}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown} />
          <Button variant="outline" onClick={() => setSearch(text)} className='w-24'>
            Search
          </Button>
        </div>
      </div>

      <AsyncData loading={isLoading} error={error ?? deleteError} hasData={data !== undefined}>
        <TransactionsTable transactions={data} onDelete={handleDeleteTransaction} />
      </AsyncData>
    </>
  );
}
