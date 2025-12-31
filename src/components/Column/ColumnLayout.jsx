import { Children, memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';
import useInfiniteScroll from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';

const ColumnLayout = memo(({ children, className, pageStackName }) => {
  const [header, content] = Children.toArray(children);

  const { isDraggable } = useDragSwap();
  const { registerScrollEl } = useInfiniteScroll();

  const ref = useCallback(
    (node) => {
      if (node) {
        registerScrollEl(node);
      }
    },
    [registerScrollEl]
  );

  return (
    <div
      ref={isDraggable ? null : ref}
      data-page-stack-name={pageStackName}
      className={cn(
        'absolute inset-0 flex flex-col overflow-y-scroll bg-(--background-secondary) max-md:mt-(--header-h) max-md:mb-(--nav-mobile-h) max-md:ml-0',
        isDraggable ? 'overflow-y-auto bg-transparent' : 'max-lg:ml-(--nav-desktop-w)',
        className
      )}
    >
      {header}
      {content}
    </div>
  );
});

export default ColumnLayout;
