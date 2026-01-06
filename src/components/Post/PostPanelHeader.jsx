import { Button } from '../ui/button';
import { EllipsisIcon, SquareChartGanttIcon } from 'lucide-react';
import { POST_PANEL_TYPES } from './PostPanel';
import { useTranslation } from 'react-i18next';

export function PostPanelHeader({ CloseElement, type, onClose }) {
  const { t } = useTranslation();
  return (
    <header className='relative flex h-14 shrink-0 items-center justify-between border-b border-(--lines-primary) px-6'>
      {CloseElement ? (
        CloseElement
      ) : (
        <Button variant='ghost' className='p-0 text-lg hover:bg-transparent' onClick={onClose}>
          {t('common.cancel')}
        </Button>
      )}

      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold'>
        {type === POST_PANEL_TYPES.CREATE_POST && t('postPanel.newThread')}
        {type === POST_PANEL_TYPES.EDIT_POST && t('postPanel.editThread')}
        {type === POST_PANEL_TYPES.REPLY_POST && t('postPanel.replyThread')}
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

