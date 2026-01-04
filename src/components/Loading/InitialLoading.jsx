import { Spinner } from '../ui/spinner';
import { cn } from '@/lib/utils';

function InitialLoading({ isLoading, className }) {
  if (!isLoading) return null;

  return (
    <div className={cn('flex h-full flex-1 items-center justify-center py-10', className)}>
      <Spinner className='size-10' />
    </div>
  );
}

export default InitialLoading;
