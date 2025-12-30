import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role='status'
      aria-label='Loading'
      className={cn('size-5 animate-spin text-(--text-secondary)', className)}
      {...props}
    />
  );
}

export { Spinner };
