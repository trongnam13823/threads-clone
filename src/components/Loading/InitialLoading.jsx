import { Spinner } from '../ui/spinner';

function InitialLoading({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className='flex flex-1 items-center justify-center py-10'>
      <Spinner className='size-10' />
    </div>
  );
}

export default InitialLoading;
