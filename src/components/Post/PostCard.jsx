import { useCallback, memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import paths from '@/configs/paths';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from '@/contexts/pageStack/components/Link';
import MediaList from './MediaList';
import { formatRelativeTime } from '@/utils/formatTime';
import { LikeButton } from './LikeButton';
import { RepostButton } from './RepostButton';
import { ShareButton } from './ShareButton';
import { Logo } from '../Logo';
import PostMenu from './PostMenu';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';
import useNavigate from '@/contexts/pageStack/hooks/useNavigate';
import ReplyButton from './ReplyButton';

export const POST_CARD_TYPES = {
  DEFAULT: 'default',
  IMAGE: 'image',
  EMBED: 'embed',
  REPLY: 'reply',
};

export const PostCard = memo(
  ({ post = {}, type = POST_CARD_TYPES.DEFAULT, isDataVisible = true }) => {
    const navigate = useNavigate();

    const handlePostClick = useCallback(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        navigate(paths.postDetail(post.id));
      }
    }, [navigate, post.id]);

    const handleCopyLink = useCallback(async () => {
      try {
        const postUrl = paths.postDetail(post.id);
        copy(window.location.origin + postUrl);
        toast.success('Đã sao chép liên kết');
      } catch {
        toast.error('Không thể sao chép liên kết');
      }
    }, [post.id]);

    return (
      <div
        className={cn(
          'relative flex flex-col gap-4 overflow-hidden px-6 py-3',
          type === POST_CARD_TYPES.IMAGE &&
            'pointer-events-none rounded-[inherit] bg-(--elevated-background) p-4 pb-[28px]',
          type === POST_CARD_TYPES.EMBED &&
            'pointer-events-none rounded-xl border border-(--lines-primary) bg-(--elevated-background) px-5 pt-4 pb-8',
          type === POST_CARD_TYPES.REPLY && 'p-0 pb-3'
        )}
      >
        <Logo hidden={type !== POST_CARD_TYPES.IMAGE} className='absolute right-2 bottom-1 w-6' />
        <Button
          hidden={type !== POST_CARD_TYPES.EMBED}
          asChild
          variant='secondary'
          size='icon'
          className='pointer-events-auto absolute right-4 bottom-3 flex h-10 items-center gap-1 rounded-[10px] px-4 py-0 text-xs font-bold'
        >
          <a href={paths.postDetail(post.id)} target='_blank'>
            <span>Xem trên Threads</span>
            <Logo className='w-4.5' isLink={false} />
          </a>
        </Button>
        {/* POST CONTENT*/}
        <div className='flex gap-4'>
          {/* LEFT */}
          <div
            hidden={type !== POST_CARD_TYPES.DEFAULT && type !== POST_CARD_TYPES.REPLY}
            className='flex w-9 flex-col items-center gap-3'
          >
            {/* AUTHOR AVATAR */}
            <Avatar className='size-9 cursor-pointer'>
              <AvatarImage src={post.user.avatar_url} alt={post.user.username} />
              <AvatarFallback>{post.user.username}</AvatarFallback>
            </Avatar>

            {/* LINE REPLY */}
            <div
              className={cn(
                'hidden min-h-3 w-0.5 flex-1',
                'bg-(--primary-outline)',
                type === POST_CARD_TYPES.REPLY && 'block'
              )}
            ></div>
          </div>

          {/* RIGHT */}
          <div className='flex-1'>
            {/* HEADER */}
            <div className='flex items-center'>
              <div
                hidden={type === POST_CARD_TYPES.DEFAULT || type === POST_CARD_TYPES.REPLY}
                className='mr-2'
              >
                <Avatar className='size-9 cursor-pointer'>
                  <AvatarImage src={post.user.avatar_url} alt={post.user.username} />
                  <AvatarFallback>{post.user.username}</AvatarFallback>
                </Avatar>
              </div>

              {/* AUTHOR NAME */}
              <Link
                to={paths.profile(post.user.username)}
                className={cn('font-bold', 'hover:underline')}
              >
                <span>{post.user.username}</span>
              </Link>

              {/* CREATED AT */}
              <span
                className={cn(
                  'ml-1.5 text-(--text-secondary)',
                  type === POST_CARD_TYPES.EMBED && 'ml-auto'
                )}
                hidden={!isDataVisible}
              >
                {formatRelativeTime(post.created_at)}
              </span>
              {/* MORE BTN */}
              {type === POST_CARD_TYPES.DEFAULT && (
                <PostMenu post={post} onCopyLink={handleCopyLink} />
              )}
            </div>

            {/* BODY (content html)*/}
            <div
              onClick={() => handlePostClick()}
              className={cn(
                'mt-1 cursor-pointer wrap-break-word break-all whitespace-normal',
                'text-(--text-primary)',
                '[&>*:not(:first-child)]:mt-2.5',
                type === POST_CARD_TYPES.IMAGE && 'mt-3',
                type === POST_CARD_TYPES.REPLY && 'pointer-events-none'
              )}
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />

            {/* MEDIA */}
            {post.media_urls && post.media_urls.length > 0 && (
              <MediaList mediaList={post.media_urls} className='pointer-events-auto' />
            )}

            {/* ACTION BTNS */}
            <div
              className={cn(
                'mt-1.5 -mb-1 -ml-3 flex items-center',
                type === POST_CARD_TYPES.REPLY && 'hidden'
              )}
            >
              {/* LIKE BTN */}
              <LikeButton
                postId={post.id}
                isLiked={post.is_liked_by_auth}
                likesCount={post.likes_count}
                isDataVisible={isDataVisible}
              />

              {/* REPLY BTN */}
              <ReplyButton isDataVisible={isDataVisible} post={post} />

              {/* REPOST BTN */}
              <RepostButton
                postId={post.id}
                isReposted={post.is_reposted_by_auth}
                repostsCount={post.reposts_and_quotes_count}
                isDataVisible={isDataVisible}
              />

              {/* SHARE BTN */}
              <ShareButton post={post} onCopyLink={handleCopyLink} isDataVisible={isDataVisible} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PostCard.displayName = 'PostCard';
