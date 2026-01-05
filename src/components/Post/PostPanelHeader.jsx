import { Button } from '../ui/button';
import { EllipsisIcon, SquareChartGanttIcon } from 'lucide-react';
import { POST_PANEL_TYPES } from './PostPanel';

export function PostPanelHeader({ CloseElement, type, onClose }) {
  return (
    <header className='relative flex h-14 shrink-0 items-center justify-between border-b border-(--lines-primary) px-6'>
      {CloseElement ? (
        CloseElement
      ) : (
        <Button variant='ghost' className='p-0 text-lg hover:bg-transparent' onClick={onClose}>
          Hủy
        </Button>
      )}

      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold'>
        {type === POST_PANEL_TYPES.CREATE_POST && 'Thread mới'}
        {type === POST_PANEL_TYPES.EDIT_POST && 'Thread chỉnh sửa '}
        {type === POST_PANEL_TYPES.REPLY_POST && 'Thread trả lời'}
      </span>

      <div className='flex items-center gap-2'>
        <Button variant='icon' className='size-9 p-0!'>
          <SquareChartGanttIcon className='size-6' />
        </Button>

        <Button variant='icon' className='size-9 p-0!'>
          <div className='rounded-full border-2 border-(--text-primary) p-px'>
            <EllipsisIcon className='size-4' />
          </div>
        </Button>
      </div>
    </header>
  );
}

