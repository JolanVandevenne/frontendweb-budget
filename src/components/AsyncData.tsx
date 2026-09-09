// src/components/AsyncData.tsx
import Loader from './Loader';
import Error from './Error';

interface AsyncDataProps {
  loading: boolean;
  error?: unknown;
  children: React.ReactNode;
}

export default function AsyncData({
  loading,
  error,
  children,
}: AsyncDataProps) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return <>{children}</>;
}
