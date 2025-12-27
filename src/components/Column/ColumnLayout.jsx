import { Children } from 'react';
import { cn } from '@/lib/utils';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

const ColumnLayout = ({ children, className, pageStackName }) => {
  const [header, content] = Children.toArray(children);

  const { isDraggable } = useDragSwap();

  return (
    <div
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
};

export default ColumnLayout;
