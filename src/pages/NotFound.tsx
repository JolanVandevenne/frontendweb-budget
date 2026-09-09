import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NotFound() {
  return (
    <>
      <h1 className='text-3xl font-semibold mb-4'>Not found</h1>
      <Alert variant='destructive'>
        <AlertDescription>
          There is no page at this url. Try something else.
        </AlertDescription>
      </Alert>
    </>
  );
}