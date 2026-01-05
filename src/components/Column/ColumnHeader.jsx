import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowLeftIcon, ChevronLeftIcon } from 'lucide-react';
import Back from '@/contexts/pageStack/components/Back';
import { Logo } from '../Logo';
import Menu from '../NavBar/Menu';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

const ColumnHeader = memo(({ children, className, showBack = false }) => {
  const { getHandleProps, isDraggable } = useDragSwap();

  return (
    <>
      {/* header mobile */}
      <nav className='fixed top-0 right-0 left-0 z-20 flex h-(--header-h) items-center justify-center bg-(--header-background) backdrop-blur-xl md:hidden'>
        <Back showBack={showBack}>
          <Button className='group absolute top-1/2 left-4 size-12 -translate-y-1/2' variant='none'>
            <ArrowLeftIcon size={24} className='transition-transform group-hover:scale-105' />
          </Button>
        </Back>

        <Logo size={32} />

        <Menu className='absolute top-1/2 right-4 -translate-y-1/2' />
      </nav>

      {/* header column */}
      <header
        {...getHandleProps?.()}
        className={cn(
          'top-0 z-10 mx-auto flex h-(--header-h) w-full shrink-0 items-center justify-center bg-(--background-secondary) focus-visible:outline-0 max-md:bg-(--elevated-background) md:sticky md:max-w-(--column-max-w)',
          isDraggable && 'bg-transparent',
          className
        )}
      >
        <Back showBack={showBack}>
          <div className='group absolute top-1/2 left-3 z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center max-md:hidden'>
            <Button
              className='size-6 p-0 shadow-[0_2px_8px_0_var(--box-shadow-08)] group-hover:scale-105 group-active:scale-95'
              variant='outline'
              size='icon'
            >
              <ChevronLeftIcon className='mr-0.5 size-4' />
            </Button>
          </div>
        </Back>

        {children}
      </header>
    </>
  );
});

export default ColumnHeader;
