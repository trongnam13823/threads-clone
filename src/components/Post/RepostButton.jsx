import { memo, useCallback } from 'react';
import { Repeat2Icon, MessageSquareQuoteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { formatNumber } from '@/utils/formatTime';
import { useRepostPostMutation } from '@/services/posts/postsApi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export const RepostButton = memo(({ postId, isReposted, repostsCount, isDataVisible }) => {
  const [repostPost] = useRepostPostMutation();

  const handleRepost = useCallback(async () => {
    try {
      await repostPost(postId).unwrap();
      if (isReposted) {
        toast.success('Đã gỡ');
      } else {
        toast.success('Đã đăng lại');
      }
    } catch {
      if (isReposted) {
        toast.error('Gỡ thất bại');
      } else {
        toast.error('Đăng lại thất bại');
      }
    }
  }, [repostPost, postId, isReposted]);

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
          <span>{isReposted ? 'Gỡ' : 'Đăng lại'}</span>
          <Repeat2Icon className='size-5 text-inherit' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleQuote} className='gap-3'>
          <span>Trích dẫn</span>
          <MessageSquareQuoteIcon className='size-5' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

RepostButton.displayName = 'RepostButton';
