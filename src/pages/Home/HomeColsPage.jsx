import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { setColumns } from '@/features/auth/authSlice';
import { useDragSwap } from '@/hooks/useDragSwap';
import DragSwapProvider from '@/contexts/dragSwap/components/DragSwapProvider';
import paths from '@/configs/paths';
import PageStackProvider from '@/contexts/pageStack/components/PageStackProvider';
import PinMenu from '@/components/Column/PinMenu';

export default function HomeColsPage({ className, pageStackName }) {
  const dispatch = useDispatch();
  const columns = useSelector((s) => s.auth.columns);

  // Memoize onReorder callback để tránh useDragSwap tạo lại handlers
  const handleReorder = useCallback(
    (newColumns) => {
      dispatch(setColumns(newColumns));
    },
    [dispatch]
  );

  const { getItemProps, getHandleProps, isDraggingRef } = useDragSwap(columns, {
    onReorder: handleReorder,
    gap: 12,
  });

  return (
    <div
      data-page-stack-name={pageStackName}
      className={cn('absolute inset-0 ml-(--nav-desktop-w) bg-(--background-secondary)', className)}
    >
      <ul
        className={cn(
          'relative flex h-full gap-3 overflow-x-auto overflow-y-hidden pr-[calc(var(--nav-desktop-w)+20px)] pl-5 *:first-of-type:ml-auto *:last-of-type:mr-auto'
        )}
      >
        {columns.map((column, index) => (
          <li
            key={column.id}
            {...getItemProps(index)}
            className='relative w-full max-w-(--column-max-w) min-w-(--column-min-w)'
          >
            <DragSwapProvider
              getHandleProps={() => getHandleProps(index)}
              data={column}
              isDraggingRef={isDraggingRef}
            >
              <PageStackProvider
                flag={false}
                path={column.path}
                neverUnmount={
                  column.path === paths.home ? [paths.home, paths.following, paths.ghostPosts] : []
                }
                autoUpdateUrl={false}
              />
            </DragSwapProvider>
          </li>
        ))}

        <li className='relative h-full w-0'>
          <PinMenu />
        </li>
      </ul>
    </div>
  );
}
