import { forwardRef } from 'react';
import { Spinner } from '../ui/spinner';

const LoadMoreTrigger = forwardRef(({ hasMore }, ref) => {
  if (!hasMore) return null;

  return (
    <div ref={ref} className='flex min-h-20 items-center justify-center'>
      <Spinner className='size-5' />
    </div>
  );
});

LoadMoreTrigger.displayName = 'LoadMoreTrigger';

export default LoadMoreTrigger;
