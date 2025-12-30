import { useCallback, memo } from 'react';
import { useDragScroll } from '@/hooks/useDragScroll';
import { VideoItem } from './VideoItem';
import { ImageItem } from './ImageItem';
import { cn } from '@/lib/utils';

/**
 * MediaList component - Displays a gallery of images and videos
 * @param {Array} mediaList - Array of media URLs
 */
export const MediaList = memo(({ mediaList = [] }) => {
  // Hook kéo thả để cuộn gallery hình ảnh
  const { containerRef: mediaListRef } = useDragScroll({
    direction: 'horizontal',
    dragThreshold: 5,
    sensitivity: 1,
  });

  // Kiểm tra xem URL có phải là video hay không dựa vào đuôi file
  const isVideo = useCallback((url) => {
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'mkv'];
    const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
    return videoExtensions.includes(extension);
  }, []);

  if (!mediaList || mediaList.length === 0) {
    return null;
  }

  const isSingleMedia = mediaList.length === 1;

  return (
    <div
      ref={mediaListRef}
      className={cn(
        'mt-2 flex gap-1.5 overflow-x-hidden',
        !isSingleMedia && '-mr-[24px] -ml-[76px] pr-[24px] pl-[76px]'
      )}
    >
      {mediaList.map((mediaUrl, index) =>
        isVideo(mediaUrl) ? (
          <VideoItem key={index} videoUrl={mediaUrl} isSingleMedia={isSingleMedia} />
        ) : (
          <ImageItem key={index} imageUrl={mediaUrl} isSingleMedia={isSingleMedia} />
        )
      )}
    </div>
  );
});

export default MediaList;
