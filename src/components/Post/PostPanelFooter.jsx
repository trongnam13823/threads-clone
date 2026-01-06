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
import { useTranslation } from 'react-i18next';

export function PostPanelFooter({
  replyPermissionType,
  setReplyPermissionType,
  replyPermissionTypes,
  isApproved,
  setIsApproved,
  isEmpty,
  isCreating,
  isReplying,
  isUpdating,
  type,
  onSubmit,
}) {
  const { t } = useTranslation();
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
          <span className='font-bold'>{t('postPanelFooter.replyOptions')}</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start'>
          <p className='p-3 pb-0 text-[13px] font-bold text-(--text-secondary)'>
            {t('postPanelFooter.whoCanReply')}
          </p>
          {replyPermissionTypes.map((permissionType) => (
            <DropdownMenuItem key={permissionType.id} onClick={() => setReplyPermissionType(permissionType)}>
              {permissionType.name}{' '}
              <CheckIcon className='size-5 text-inherit' hidden={replyPermissionType.id !== permissionType.id} />
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setIsApproved((prev) => !prev);
            }}
          >
            <span>{t('postPanelFooter.reviewAndApprove')}</span>
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
        {type === POST_PANEL_TYPES.CREATE_POST && t('postPanelFooter.post')}
        {type === POST_PANEL_TYPES.EDIT_POST && t('postPanelFooter.done')}
        {type === POST_PANEL_TYPES.REPLY_POST && t('postPanelFooter.reply')}
      </Button>
    </footer>
  );
}

