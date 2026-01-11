import { POST_CARD_TYPES, PostCard } from '@/components/post/PostCard';
import { useGetPostDetailQuery } from '@/services/posts/postService';
import { useParams } from 'react-router';
import { useEffect, useRef } from 'react';

export default function PostEmbed() {
  const { postId } = useParams();
  const { data: postDetail } = useGetPostDetailQuery(postId);
  const observerRef = useRef(null);
  const lastHeightRef = useRef(null);
  const stabilityTimeoutRef = useRef(null);

  useEffect(() => {
    if (!postDetail) return;
    if (window === window.parent) return;

    const initializeHeightTracking = async () => {
      const target = document.documentElement;

      // Hàm gửi chiều cao với debounce
      const sendHeight = () => {
        const height = target.scrollHeight;

        if (lastHeightRef.current === height) return;

        lastHeightRef.current = height;
        window.parent.postMessage({ type: 'resize', height }, '*');
      };

      const debouncedSendHeight = () => {
        if (stabilityTimeoutRef.current) {
          clearTimeout(stabilityTimeoutRef.current);
        }
        // Đợi 200ms sau thay đổi cuối cùng mới gửi
        stabilityTimeoutRef.current = setTimeout(sendHeight, 200);
      };

      // Đợi tất cả ảnh tải xong
      const images = Array.from(document.images);

      const imagePromises = images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      });

      await Promise.all(imagePromises);

      // Đợi thêm để đảm bảo layout ổn định sau khi ảnh load
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Gửi chiều cao ngay sau khi ảnh tải xong
      sendHeight();

      // Setup observer cho các thay đổi sau đó
      observerRef.current = new ResizeObserver(debouncedSendHeight);
      observerRef.current.observe(target);
    };

    const timeoutId = setTimeout(initializeHeightTracking, 500);

    return () => {
      clearTimeout(timeoutId);
      if (stabilityTimeoutRef.current) {
        clearTimeout(stabilityTimeoutRef.current);
      }
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [postDetail]);

  if (!postDetail) return null;
  return <PostCard post={postDetail.data} type={POST_CARD_TYPES.EMBED} />;
}
