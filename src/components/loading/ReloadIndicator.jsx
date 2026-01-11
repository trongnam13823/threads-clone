import { cn } from '@/lib/utils';
import { Spinner } from '../ui/spinner';

export default function ReloadIndicator({ isReloading }) {
  return (
    <div
      aria-busy={isReloading}
      aria-hidden={!isReloading}
      className={cn(
        'flex items-center justify-center overflow-hidden border-b-0! transition-[min-height,max-height]',
        isReloading ? 'max-h-20 min-h-20' : 'max-h-0 min-h-0'
      )}
    >
      {isReloading && <Spinner className='size-5' />}
    </div>
  );
}
