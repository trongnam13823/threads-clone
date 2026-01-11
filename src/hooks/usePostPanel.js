import { useState } from 'react';
import { toast } from 'sonner';
import {
  useCreatePostMutation,
  useEditPostMutation,
  useReplyPostMutation,
} from '@/services/post/postService';
import { POST_PANEL_TYPES } from '@/components/post/PostPanel';
import { createRepliesChain } from '@/components/post/helper/createRepliesChain';
import { createToastConfig } from '@/components/post/helper/createToastConfig.jsx';
import { useTranslation } from 'react-i18next';

export function usePostPanel(type, post, onClose) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([
    { content: type === POST_PANEL_TYPES.EDIT_POST ? post?.content || '' : '' },
  ]);
  const [isApproved, setIsApproved] = useState(false);
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [replyPost, { isLoading: isReplying }] = useReplyPostMutation();
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

  const createPostWithReplies = async (postsList) => {
    const firstPost = postsList[0];

    // Tạo post đầu tiên
    const firstPostResult = await createPost({
      content: firstPost.content,
    }).unwrap();

    const firstPostId = firstPostResult.data?.id;
    if (!firstPostId) {
      throw new Error(t('postPanel.cannotGetFirstPostId'));
    }

    // Tạo các reply posts (từ index 1 trở đi) - tuần tự vì mỗi reply cần reply vào reply trước đó
    if (postsList.length > 1) {
      await createRepliesChain(replyPost, postsList, 1, firstPostId);
    }

    // Tất cả replies đã được tạo, trả về kết quả post đầu tiên
    return firstPostResult;
  };

  const createReplyWithReplies = async (postsList, parentPostId) => {
    const firstReply = postsList[0];

    // Tạo reply đầu tiên vào post gốc
    const firstReplyResult = await replyPost({
      id: parentPostId,
      content: firstReply.content,
    }).unwrap();

    const firstReplyId = firstReplyResult.data?.id;
    if (!firstReplyId) {
      throw new Error(t('postPanel.cannotGetFirstReplyId'));
    }

    // Tạo các reply posts (từ index 1 trở đi) - tuần tự vì mỗi reply cần reply vào reply trước đó
    if (postsList.length > 1) {
      await createRepliesChain(replyPost, postsList, 1, firstReplyId);
    }

    // Tất cả replies đã được tạo, trả về kết quả reply đầu tiên
    return firstReplyResult;
  };

  const handleSubmit = async () => {
    if (isEmpty || isCreating || isReplying || isUpdating) return;

    if (type === POST_PANEL_TYPES.EDIT_POST) {
      const firstPost = posts[0];
      toast.promise(editPost({ id: post.id, content: firstPost.content }).unwrap(), {
        ...createToastConfig('edit'),
      });
      onClose();
      return;
    }

    if (type === POST_PANEL_TYPES.REPLY_POST) {
      if (!post?.id) {
        toast.error(t('postPanel.postNotFound'));
        return;
      }

      toast.promise(createReplyWithReplies(posts, post.id), {
        ...createToastConfig('reply'),
      });
      onClose();
      return;
    }

    // CREATE_POST type
    toast.promise(createPostWithReplies(posts), {
      ...createToastConfig('create'),
    });

    onClose();
  };

  return {
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
  };
}
