import { useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useMediaPlayer } from '@/hooks/useMediaPlayer';

/**
 * VideoItem component - Xử lý hiển thị và logic cho một video trong gallery
 * @param {string} videoUrl - URL của video
 * @param {boolean} isSingleMedia - Có phải là media duy nhất trong gallery không
 */
export const VideoItem = memo(({ videoUrl, isSingleMedia }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Lazy load + auto play/pause cho video
  const {
    containerRef,
    mediaRef: videoRef,
    shouldLoad,
  } = useMediaPlayer({
    type: 'video',
    lazyRootMargin: '200px', // Video nặng → load trước 200px
    playbackThreshold: 0.5, // Video phải hiển thị ít nhất 50% để trigger callback
    playbackRootMargin: '0px',
    onPlaybackChange: useCallback((entry, video) => {
      if (entry.isIntersecting) {
        // Video vào viewport → play
        video.play().catch(() => {
          // Autoplay bị block → ignore
        });
      } else {
        // Video ra ngoài viewport → pause
        video.pause();
      }
    }, []),
  });

  // Xử lý click vào nút mute/unmute
  const handleMuteToggle = useCallback(
    (e) => {
      e.stopPropagation();
      const video = videoRef.current;
      if (video) {
        video.muted = !video.muted;
        setIsMuted(video.muted);
      }
    },
    [videoRef]
  );

  return (
    <div
      ref={containerRef}
      className='relative flex shrink-0 rounded-lg'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            className={cn(
              'rounded-[inherit] object-cover',
              isSingleMedia ? 'max-w-full' : 'max-h-(--media-max-h)'
            )}
          />

          {/* Volume Icon - chỉ hiện khi hover */}
          {isHovered && (
            <div
              className='pointer-events-auto absolute right-2 bottom-2 cursor-pointer rounded-full bg-black/50 p-1.5 transition-opacity hover:bg-black/70'
              onClick={handleMuteToggle}
            >
              {isMuted ? (
                <VolumeXIcon className='size-4 text-white' />
              ) : (
                <Volume2Icon className='size-4 text-white' />
              )}
            </div>
          )}
        </>
      ) : (
        // Loading placeholder cho video
        <div
          className={cn(
            'rounded-[inherit] bg-gray-200 dark:bg-gray-800',
            isSingleMedia ? 'h-64 w-full' : 'h-(--media-max-h) w-64'
          )}
        />
      )}

      <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-(--always-dark-overlay)'></div>
    </div>
  );
});
