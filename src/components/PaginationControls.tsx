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

const PAGE_SIZE_OPTIONS = [2, 5, 10, 25, 50];

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {

  return (
    <div className='flex w-full items-center justify-between gap-4'>
      <Field orientation='horizontal' className='w-fit'>
        <FieldLabel htmlFor='select-rows-per-page'>Rows per page</FieldLabel>
        <Select
          value={pageSize}
          onValueChange={(value) => {
            onPageSizeChange(value as number);
            onPageChange(1);
          }}
        >
          <SelectTrigger className='w-20' id='select-rows-per-page'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent align='start'>
            <SelectGroup>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      {totalPages > 1 && (
        <Pagination className='mx-0 w-auto'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                aria-disabled={page === 1}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            <PaginationItem>
              <span className='text-sm px-2'>
                {page} / {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(page + 1)}
                aria-disabled={page === totalPages}
                className={
                  page === totalPages ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
      }
    </div >
  );
}
