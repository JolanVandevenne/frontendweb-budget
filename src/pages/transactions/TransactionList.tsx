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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';



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

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const hasNextPage = data !== undefined && page * pageSize < data.total;

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
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
          <Button variant="outline" onClick={() => handleSearch(text)} className='w-24'>
            Search
          </Button>
        </div>
      </div>

      <AsyncData loading={isLoading} error={error ?? deleteError} hasData={data !== undefined}>
        <TransactionsTable transactions={data?.items} onDelete={handleDeleteTransaction} />
        <div className='flex items-center justify-between gap-4 mt-4'>
          <Field orientation='horizontal' className='w-fit'>
            <FieldLabel htmlFor='select-rows-per-page'>Rows per page</FieldLabel>
            <Select
              value={pageSize}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className='w-20' id='select-rows-per-page'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent align='start'>
                <SelectGroup>
                  <SelectItem value='2'>2</SelectItem>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='25'>25</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Pagination className='mx-0 w-auto'>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  onClick={handlePreviousPage}
                  aria-disabled={page === 1}
                  className={cn(page === 1 && 'pointer-events-none opacity-50')}
                />
              </PaginationItem>
              <PaginationItem>
                {data?.total
                  ? `Page ${page} of ${Math.ceil(data.total / pageSize)}`
                  : ''}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href='#'
                  onClick={handleNextPage}
                  aria-disabled={!hasNextPage}
                  className={cn(!hasNextPage && 'pointer-events-none opacity-50')}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </AsyncData>
    </>
  );
}
