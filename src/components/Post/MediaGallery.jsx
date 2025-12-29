import { useCallback, memo } from 'react';
import { useDragScroll } from '@/hooks/useDragScroll';
import { VideoItem } from './VideoItem';
import { ImageItem } from './ImageItem';

/**
 * MediaGallery component - Displays a gallery of images and videos
 * @param {Array} mediaList - Array of media URLs
 */
export const MediaGallery = memo(({ mediaList = [] }) => {
  // Hook kéo thả để cuộn gallery hình ảnh
  const { containerRef: mediaGalleryRef } = useDragScroll({
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
      ref={mediaGalleryRef}
      className='mt-2 -mr-[24px] -ml-[76px] flex gap-1.5 overflow-x-hidden pr-[24px] pl-[76px]'
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
