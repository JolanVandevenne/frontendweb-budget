export default function Loader() {
  return (
    <div
      className='flex flex-col items-center justify-center py-8'
      data-testid='loader'
    >
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary' />
    </div>
  );
}
