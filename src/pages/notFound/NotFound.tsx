import { useLocation, Link } from 'react-router'
import { Alert, AlertDescription } from '@/components/ui/alert'


export default function NotFound() {
    const { pathname } = useLocation()
  
    return (
        <>
            <h1 className='text-3xl font-semibold mb-4'>Not Found</h1>
            <Alert variant='destructive'>
                <AlertDescription>
                    There is nothing at {pathname}, try something else. <br />
                    <Link to="/" replace className='underline hover:no-underline'>
                        go back home
                    </Link>
                </AlertDescription>
            </Alert>
        </>
    )
}