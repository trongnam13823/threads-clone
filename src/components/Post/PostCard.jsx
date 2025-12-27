import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EllipsisIcon, HeartIcon, MessageCircleIcon, Repeat2Icon, SendIcon } from 'lucide-react';
import paths from '@/configs/paths';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from '@/contexts/pageStack/components/Link';
import { ReplyBox } from './ReplyBox';

export const PostCard = () => {
  const [showReply, setShowReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1);

  const handleLike = () => {
    setLikes((prev) => prev + (liked ? -1 : 1));
    setLiked((prev) => !prev);
  };

  const handleToggleReply = () => {
    setShowReply(!showReply);
  };

  const handlePostClick = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      alert('oke oke');
    }
  };

  return (
    <div className='flex flex-col gap-4 px-6 py-3'>
      {/* POST CONTENT*/}
      <div className='flex gap-4'>
        {/* LEFT */}
        <div className='flex w-9 flex-col items-center gap-4'>
          {/* AUTHOR AVATAR */}
          <Avatar className='size-9 cursor-pointer'>
            <AvatarImage src={null} alt={'namdeptrai'} />
            <AvatarFallback>namdeptrai</AvatarFallback>
          </Avatar>

          {/* LINE REPLY */}
          <div
            className={cn('w-0.5 flex-1', 'bg-(--primary-outline)', showReply ? 'block' : 'hidden')}
          ></div>
        </div>

        {/* RIGHT */}
        <div className='flex-1'>
          {/* HEADER */}
          <div className='flex items-center'>
            {/* AUTHOR NAME */}
            <Link to={paths.profile('namdeptrai')} className={cn('font-bold', 'hover:underline')}>
              <span>namdeptrai</span>
            </Link>
            {/* CREATED AT */}
            <span className='ml-1.5 text-(--text-secondary)'>1 giờ</span>
            {/* MORE BTN */}
            <Button
              variant='ghost'
              size='icon-sm'
              className={cn('ml-auto', 'text-(--text-secondary)', 'hover:scale-105')}
            >
              <EllipsisIcon className='size-4.5' />
            </Button>
          </div>

          {/* BODY (content html)*/}
          <div
            onClick={() => handlePostClick()}
            className={cn(
              'mt-1 cursor-pointer',
              'text-(--text-primary)',
              '[&>*:not(:first-child)]:mt-2.5'
            )}
            dangerouslySetInnerHTML={{
              __html: 'Có những nỗi nhớ không cần lý do, chỉ cần một bản nhạc.',
            }}
          />

          {/* ACTION BTNS */}
          <div className='mt-1.5 -mb-1 -ml-3 flex items-center'>
            {/* LIKE BTN */}
            <Button
              variant='ghost'
              size='icon'
              className={cn(
                'h-9 gap-1 px-3 text-[13px] tabular-nums',
                liked && 'text-(--liked-text)'
              )}
              onClick={handleLike}
            >
              <HeartIcon className={cn('size-4.5', liked && 'fill-current')} />
              {likes}
            </Button>

            {/* REPLY BTN */}
            <Button
              variant='ghost'
              size='icon'
              className='h-9 gap-1 px-3 text-[13px] tabular-nums'
              onClick={handleToggleReply}
            >
              <MessageCircleIcon className='size-4.5' /> {4}
            </Button>

            {/* REPOST BTN */}
            <Button variant='ghost' size='icon' className='h-9 gap-1 px-3 text-[13px] tabular-nums'>
              <Repeat2Icon size={24} strokeWidth={1.5} className='size-6 stroke-[1.5]' /> {45}
            </Button>

            {/* SHARE BTN */}
            <Button variant='ghost' size='icon' className='h-9 gap-1 px-3 text-[13px] tabular-nums'>
              <SendIcon className='size-4.5' /> {14}
            </Button>
          </div>
        </div>
      </div>

      {/* REPLY Box */}
      {showReply && <ReplyBox />}
    </div>
  );
};
