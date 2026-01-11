import { memo, useCallback } from 'react';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { formatNumber } from '@/utils/formatTime';
import { useLikePostMutation } from '@/services/post/postService';

export const LikeButton = memo(({ postId, isLiked, likesCount, isDataVisible }) => {
  const [likePost] = useLikePostMutation();

  const handleLike = useCallback(async () => {
    try {
      await likePost(postId).unwrap();
    } catch {
      // lỗi đã được rollback trong mutation
    }
  }, [likePost, postId]);

  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn(
        'h-9 gap-1 px-3 text-[13px] tabular-nums',
        isLiked && isDataVisible && 'text-(--liked-text)'
      )}
      onClick={handleLike}
    >
      <HeartIcon className={cn('size-4.5', isLiked && isDataVisible && 'fill-current')} />
      {isDataVisible ? formatNumber(likesCount) : null}
    </Button>
  );
});

LikeButton.displayName = 'LikeButton';
