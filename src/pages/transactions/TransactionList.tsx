// src/pages/TransactionList.tsx
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import type { PaginatedResponse, Transaction } from '../../types';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteById, getAllWithPaging } from '../../api';
import { toast } from 'sonner';
import type { KeyboardEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import PaginationControls from '../../components/PaginationControls';



export default function TransactionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error, mutate } = useSWR<PaginatedResponse<Transaction>>(
    `transactions?page=${page}&pageSize=${pageSize}${search ? `&search=${search}` : ''}`,
    getAllWithPaging,
  );

  const {
    trigger: deleteTransaction, error: deleteError,
  } = useSWRMutation('transactions', deleteById);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (e.target.value === '') {
      handleSearch('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(text);
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    await deleteTransaction(id);
    await mutate();
    toast.success('Transaction removed');
  };

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;



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
          <Button variant="outline" onClick={() => handleSearch(text)} className='w-24'>
            Search
          </Button>
        </div>
      </div>

      <AsyncData loading={isLoading} error={error ?? deleteError} hasData={data !== undefined}>
        <TransactionsTable transactions={data?.items} onDelete={handleDeleteTransaction} />
        <div className='mt-4'>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </AsyncData>
    </>
  );
}
