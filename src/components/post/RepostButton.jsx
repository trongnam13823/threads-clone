import { memo, useCallback } from 'react';
import { Repeat2Icon, MessageSquareQuoteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { formatNumber } from '@/utils/formatTime';
import { useRepostPostMutation } from '@/services/posts/postService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const RepostButton = memo(({ postId, isReposted, repostsCount, isDataVisible }) => {
  const { t } = useTranslation();
  const [repostPost] = useRepostPostMutation();

  const handleRepost = useCallback(async () => {
    try {
      await repostPost(postId).unwrap();
      if (isReposted) {
        toast.success(t('repost.removed'));
      } else {
        toast.success(t('repost.reposted'));
      }
    } catch {
      toast.error(t('repost.repostFailed'));
    }
  }, [repostPost, postId, isReposted, t]);

  const handleQuote = useCallback(() => {
    // TODO: Implement quote functionality
    console.log('Quote post:', postId);
  }, [postId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            'h-9 gap-1 px-3 text-[13px] tabular-nums',
            isReposted && isDataVisible && 'text-(--success-text)'
          )}
        >
          <Repeat2Icon className='size-6 stroke-[1.5]' />
          {isDataVisible ? repostsCount > 0 && formatNumber(repostsCount) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' sideOffset={4} className='min-w-48'>
        <DropdownMenuItem
          onClick={handleRepost}
          className={cn(
            'gap-3',
            isReposted &&
              'text-(--notification-badge-background) hover:text-(--notification-badge-background)!'
          )}
        >
          <span>{isReposted ? t('repost.remove') : t('repost.repost')}</span>
          <Repeat2Icon className='size-5 text-inherit' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleQuote} className='gap-3'>
          <span>{t('quote.quote')}</span>
          <MessageSquareQuoteIcon className='size-5' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

RepostButton.displayName = 'RepostButton';
