import { XIcon, CheckIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

/**
 * Tạo cấu hình toast cho các thao tác post
 * @param {string} action - Hành động: 'edit', 'reply', 'create'
 * @returns {Object} - Toast config object
 */
export function createToastConfig(action) {
  const messages = {
    edit: {
      loading: 'Đang chỉnh sửa...',
      success: 'Đã chỉnh sửa',
      error: 'Lỗi khi chỉnh sửa',
    },
    reply: {
      loading: 'Đang trả lời...',
      success: 'Đã trả lời',
      error: 'Lỗi khi trả lời',
    },
    create: {
      loading: 'Đang đăng...',
      success: 'Đã đăng',
      error: 'Lỗi khi đăng',
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

