import { XIcon, CheckIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import i18n from '@/i18n';

/**
 * Tạo cấu hình toast cho các thao tác post
 * @param {string} action - Hành động: 'edit', 'reply', 'create'
 * @returns {Object} - Toast config object
 */
export function createToastConfig(action) {
  const messages = {
    edit: {
      loading: i18n.t('postPanelToast.editing'),
      success: i18n.t('postPanelToast.edited'),
      error: i18n.t('postPanelToast.editError'),
    },
    reply: {
      loading: i18n.t('postPanelToast.replying'),
      success: i18n.t('postPanelToast.replied'),
      error: i18n.t('postPanelToast.replyError'),
    },
    create: {
      loading: i18n.t('postPanelToast.posting'),
      success: i18n.t('postPanelToast.posted'),
      error: i18n.t('postPanelToast.postError'),
    },
  };

  const msg = messages[action];

  return {
    loading: (
      <div className='flex w-[320px] items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Spinner className='size-4' />
          <span>{msg.loading}</span>
        </div>
      </div>
    ),
    success: () => (
      <div className='flex w-[320px] items-center justify-between gap-2'>
        <span className='flex items-center gap-2'>
          <CheckIcon className='size-4' />
          <span>{msg.success}</span>
        </span>
      </div>
    ),
    error: (
      <div className='flex w-[320px] items-center justify-between gap-2'>
        <span className='flex items-center gap-2'>
          <XIcon className='size-4' />
          <span>{msg.error}</span>
        </span>
      </div>
    ),
  };
}
