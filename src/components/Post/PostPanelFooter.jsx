import { AlignHorizontalDistributeCenterIcon, CheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { REPLY_PERMISSION_TYPES, POST_PANEL_TYPES } from './PostPanel';

export function PostPanelFooter({
  replyPermissionType,
  setReplyPermissionType,
  isApproved,
  setIsApproved,
  isEmpty,
  isCreating,
  isReplying,
  isUpdating,
  type,
  onSubmit,
}) {
  return (
    <footer className='mt-auto flex h-20 shrink-0 items-center justify-between px-6'>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'flex items-center gap-2 text-(--text-secondary)',
            isApproved && 'text-(--text-primary)'
          )}
        >
          <AlignHorizontalDistributeCenterIcon className='size-5' />
          <span className='font-bold'>Các lựa chọn để kiểm soát câu trả lời</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start'>
          <p className='p-3 pb-0 text-[13px] font-bold text-(--text-secondary)'>
            Ai có thể trả lời và trích dẫn
          </p>
          {REPLY_PERMISSION_TYPES.map((t) => (
            <DropdownMenuItem key={t.id} onClick={() => setReplyPermissionType(t)}>
              {t.name}{' '}
              <CheckIcon className='size-5 text-inherit' hidden={replyPermissionType.id !== t.id} />
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setIsApproved((prev) => !prev);
            }}
          >
            <span>Xem xét và phê duyệt câu trả lời</span>
            <Switch className='h-6 w-10' checked={isApproved} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant='outline'
        className={cn(
          (isEmpty || isCreating || isReplying || isUpdating) && 'cursor-not-allowed opacity-50'
        )}
        onClick={onSubmit}
      >
        {type === POST_PANEL_TYPES.CREATE_POST && 'Đăng'}
        {type === POST_PANEL_TYPES.EDIT_POST && 'Xong'}
        {type === POST_PANEL_TYPES.REPLY_POST && 'Trả lời'}
      </Button>
    </footer>
  );
}

