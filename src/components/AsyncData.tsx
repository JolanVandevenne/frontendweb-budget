import Loader from './Loader';
import Error from './Error';

interface AsyncDataProps {
  loading: boolean;
  error?: unknown;
  children: React.ReactNode;
  hasData?: boolean;
}

export default function AsyncData({
  loading,
  error,
  children,
  hasData,
}: AsyncDataProps) {

  if (loading && !hasData) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return <>{children}</>;
}