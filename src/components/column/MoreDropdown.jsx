import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

export default function MoreDropdown({ children }) {
  const { isDraggable } = useDragSwap();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='max-md:hidden'>
        <div
          className={cn(
            'group 0 top-[calc(var(--header-h)/2)] z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center',
            isDraggable
              ? 'absolute right-3'
              : 'fixed left-1/2 translate-x-[calc(var(--column-max-w)/2-100%-12px)]'
          )}
        >
          <Button
            className='size-6 p-0 shadow-[0_2px_8px_0_var(--box-shadow-08)] group-hover:scale-105 group-active:scale-95'
            variant='outline'
            size='icon'
          >
            <EllipsisIcon className='size-4' />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={-6}
        alignOffset={-12}
        className='data-[state=closed]:animate-none!'
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
