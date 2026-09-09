import { isAxiosError } from 'axios';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ErrorProps {
  error?: unknown;
}

export default function Error({ error }: ErrorProps) {
  if (isAxiosError(error)) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertTitle>Oops, something went wrong</AlertTitle>
        <AlertDescription>
          {error?.response?.data?.message || error.message}
          {error?.response?.data?.details &&
            Object.keys(error?.response?.data?.details).length > 0 && (
              <>
                <br />
                {JSON.stringify(error?.response?.data?.details)}
              </>
            )}
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    const msg =
      error instanceof globalThis.Error ? error.message : JSON.stringify(error);
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertTitle>An unexpected error occurred</AlertTitle>
        <AlertDescription>{msg}</AlertDescription>
      </Alert>
    );
  }

  return null;
}
