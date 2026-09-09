import { useLocation, useNavigate } from 'react-router';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <h1 className='text-3xl font-semibold mb-4'>Not found</h1>
      <Alert variant='destructive'>
        <AlertDescription>
          There is nothing at {pathname},<br />
          <Button
            variant='link'
            onClick={handleGoHome}
            className='text-destructive hover:text-destructive pl-0'
          >
            go back home
          </Button>
        </AlertDescription>
      </Alert>
    </>
  );
}
