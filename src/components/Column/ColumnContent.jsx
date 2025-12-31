import { memo, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';
import useInfiniteScroll from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';

const ColumnContent = memo(({ children, className, dropdownElement }) => {
  const { isDraggable } = useDragSwap();
  const { registerScrollEl } = useInfiniteScroll();

  const ref = useRef(null);

  useEffect(() => {
    if (isDraggable && ref.current) {
      registerScrollEl(ref.current);
    }
  }, [registerScrollEl, isDraggable]);

  const Main = isDraggable ? ScrollArea : 'main';

  return (
    <>
      {dropdownElement && dropdownElement}

      <Main
        ref={isDraggable ? ref : null}
        className={cn(
          'mx-auto w-full flex-1 bg-(--elevated-background) transition-transform md:max-w-(--column-max-w) md:p-px',
          isDraggable &&
            'h-[calc(100svh-var(--header-h))] overflow-y-auto rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]',
          className
        )}
      >
        {children}
      </Main>
    </>
  );
});

ColumnContent.displayName = 'ColumnContent';

export default ColumnContent;
