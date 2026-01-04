import {
  AlignHorizontalDistributeCenterIcon,
  CheckIcon,
  EllipsisIcon,
  SquareChartGanttIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { PostPanelContent } from './PostPanelContent';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import paths from '@/configs/paths';
import { Link } from 'react-router';
import { useCreatePostMutation, useEditPostMutation } from '@/services/posts/postsApi';

const REPLY_PERMISSION_TYPES = [
  { id: 1, name: 'Bất kỳ ai' },
  { id: 2, name: 'Người theo dõi của bạn' },
  {
    id: 3,
    name: 'Trang cá nhân mà bạn theo dõi',
  },
  {
    id: 4,
    name: 'Chỉ khi được nhắc đến',
  },
];

export const POST_PANEL_TYPES = {
  CREATE_POST: 'CREATE_POST',
  EDIT_POST: 'EDIT_POST',
};

export function PostPanel({
  onClose,
  className,
  CloseElement,
  type = POST_PANEL_TYPES.CREATE_POST,
  post,
}) {
  const [replyPermissionType, setReplyPermissionType] = useState(REPLY_PERMISSION_TYPES[0]);
  const userInfo = useSelector((s) => s.auth.userInfo);
  const [posts, setPosts] = useState([{ content: post?.content || '' }]);
  const [isApproved, setIsApproved] = useState(false);
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [editPost, { isLoading: isUpdating }] = useEditPostMutation();

  const isEmpty = posts.at(-1)?.content.trim() === '';

  const handleSetPostContent = (index, content) => {
    setPosts(posts.map((post, i) => (i === index ? { ...post, content } : post)));
  };

  const handleAddPost = () => {
    if (isEmpty) return;
    setPosts([...posts, { content: '' }]);
  };

  const handleRemovePost = (index) => {
    if (index === 0) return;
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (isEmpty || isCreating || isUpdating) return;

    const firstPost = posts[0];

    toast.promise(
      type === POST_PANEL_TYPES.CREATE_POST
        ? createPost({ content: firstPost.content }).unwrap()
        : editPost({ id: post.id, content: firstPost.content }).unwrap(),

      {
        loading: (
          <div className='flex w-[320px] items-center justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <Spinner className='size-4' />
              <span>
                {type === POST_PANEL_TYPES.CREATE_POST ? 'Đang đăng' : 'Đang chỉnh sửa'}...
              </span>
            </div>
          </div>
        ),
        success: (data) => (
          <div className='flex w-[320px] items-center justify-between gap-2'>
            <span className='flex items-center gap-2'>
              <CheckIcon className='size-4' />
              <span>{type === POST_PANEL_TYPES.CREATE_POST ? 'Đã đăng' : 'Đã chỉnh sửa'}</span>
            </span>
            <Link to={paths.postDetail(data.data?.id)} className='cursor-pointer hover:underline'>
              Xem
            </Link>
          </div>
        ),
        error: (
          <div className='flex w-[320px] items-center justify-between gap-2'>
            <span className='flex items-center gap-2'>
              <XIcon className='size-4' />
              <span>
                {type === POST_PANEL_TYPES.CREATE_POST ? 'Lỗi khi đăng' : 'Lỗi khi chỉnh sửa'}
              </span>
            </span>
          </div>
        ),
      }
    );

    onClose();
  };

  return (
    <div
      className={cn(
        'flex h-svh max-h-svh w-svw flex-col border border-(--lines-primary) bg-(--elevated-background) md:h-fit md:w-155 md:rounded-2xl',
        className
      )}
    >
      {/* Header */}
      <header className='relative flex h-14 shrink-0 items-center justify-between border-b border-(--lines-primary) px-6'>
        {CloseElement ? (
          CloseElement
        ) : (
          <Button variant='ghost' className='p-0 text-lg hover:bg-transparent' onClick={onClose}>
            Hủy
          </Button>
        )}

        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold'>
          {type === POST_PANEL_TYPES.CREATE_POST ? 'Thread mới' : 'Chỉnh sửa thread'}
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
      <main
        className={cn(
          'flex max-h-[calc(100vh-56px-80px)] flex-col overflow-y-auto px-6 pt-4 md:max-h-[calc(100vh-56px-80px-48px)]'
        )}
      >
        {/* Content */}
        {posts.map((post, index) => (
          <PostPanelContent
            key={index}
            userInfo={userInfo}
            content={post.content}
            onContentChange={(content) => handleSetPostContent(index, content)}
            onRemove={() => handleRemovePost(index)}
            index={index}
            type={type}
          />
        ))}

        <div
          hidden={type === POST_PANEL_TYPES.EDIT_POST}
          className={cn('flex items-center gap-2', isEmpty && 'opacity-50')}
        >
          <div className='flex size-9 items-center justify-center'>
            <Avatar className='size-4'>
              <AvatarImage src={userInfo.avatar_url} alt={userInfo.username} />
              <AvatarFallback>{userInfo.username}</AvatarFallback>
            </Avatar>
          </div>
          <button
            className={cn('text-(--text-secondary)', isEmpty && 'cursor-not-allowed')}
            onClick={handleAddPost}
          >
            Thêm vào thread
          </button>
        </div>
      </main>

      {/* Footer */}
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
                <CheckIcon
                  className='size-5 text-inherit'
                  hidden={replyPermissionType.id !== t.id}
                />
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
          className={cn((isEmpty || isCreating || isUpdating) && 'cursor-not-allowed opacity-50')}
          onClick={handleSubmit}
        >
          {type === POST_PANEL_TYPES.CREATE_POST ? 'Đăng' : 'Xong'}
        </Button>
      </footer>
    </div>
  );
}
