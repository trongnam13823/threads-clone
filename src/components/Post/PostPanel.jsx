import { useState } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import { PostPanelContent } from './PostPanelContent';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { POST_CARD_TYPES, PostCard } from './PostCard';
import { usePostPanel } from '@/hooks/usePostPanel';
import { PostPanelHeader } from './PostPanelHeader';
import { PostPanelFooter } from './PostPanelFooter';

export const REPLY_PERMISSION_TYPES = [
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
  REPLY_POST: 'REPLY_POST',
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
  const {
    posts,
    isEmpty,
    isApproved,
    setIsApproved,
    isCreating,
    isReplying,
    isUpdating,
    handleSetPostContent,
    handleAddPost,
    handleRemovePost,
    handleSubmit,
  } = usePostPanel(type, post, onClose);

  return (
    <div
      className={cn(
        'flex h-svh max-h-svh w-svw flex-col border border-(--lines-primary) bg-(--elevated-background) md:h-fit md:w-155 md:rounded-2xl',
        className
      )}
    >
      <PostPanelHeader CloseElement={CloseElement} type={type} onClose={onClose} />
      <main
        className={cn(
          'flex max-h-[calc(100vh-56px-80px)] flex-col overflow-y-auto px-6 pt-4 md:max-h-[calc(100vh-56px-80px-48px)]'
        )}
      >
        {type === POST_PANEL_TYPES.REPLY_POST && (
          <PostCard post={post} type={POST_CARD_TYPES.REPLY} />
        )}
        {/* Content */}
        {posts.map((p, index) => (
          <PostPanelContent
            key={index}
            userInfo={userInfo}
            content={p.content}
            onContentChange={(content) => handleSetPostContent(index, content)}
            onRemove={() => handleRemovePost(index)}
            index={index}
            type={type}
            placeholder={
              type === POST_PANEL_TYPES.REPLY_POST
                ? `Trả lời ${post?.user?.username}...`
                : undefined
            }
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

      <PostPanelFooter
        replyPermissionType={replyPermissionType}
        setReplyPermissionType={setReplyPermissionType}
        isApproved={isApproved}
        setIsApproved={setIsApproved}
        isEmpty={isEmpty}
        isCreating={isCreating}
        isReplying={isReplying}
        isUpdating={isUpdating}
        type={type}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
