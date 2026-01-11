import { useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';
import { useMediaPlayer } from '@/hooks/useMediaPlayer';

/**
 * ImageItem component - Hiển thị image với lazy loading
 * @param {string} imageUrl - URL của image
 * @param {boolean} isSingleMedia - Có phải là media duy nhất trong gallery không
 */
export const ImageItem = memo(({ imageUrl, isSingleMedia }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Lazy load cho image
  const { containerRef: ref, shouldLoad } = useMediaPlayer({
    type: 'image',
    lazyRootMargin: '100%', // Image nhẹ hơn → load trước 100%
  });

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return (
    <div ref={ref} className={cn('relative flex rounded-lg', !isSingleMedia && 'shrink-0')}>
      {shouldLoad && (
        <img
          src={imageUrl}
          alt='media'
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'rounded-[inherit] object-cover transition-opacity duration-300',
            isSingleMedia ? 'max-w-full' : 'max-h-(--media-max-h)',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'opacity-50'
          )}
        />
      )}

      {/* Loading placeholder */}
      {!shouldLoad && (
        <div
          className={cn(
            'rounded-[inherit] bg-gray-200 dark:bg-gray-800',
            isSingleMedia ? 'h-64 w-full' : 'h-(--media-max-h) w-64'
          )}
        />
      )}

      {/* Loading spinner khi đang load */}
      {shouldLoad && !isLoaded && !hasError && (
        <div className='absolute inset-0 flex items-center justify-center rounded-[inherit] bg-gray-200 dark:bg-gray-800'>
          <div className='size-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600'></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center rounded-[inherit] bg-gray-200 dark:bg-gray-800'>
          <span className='text-sm text-gray-500'>Failed to load image</span>
        </div>
      )}

      <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-(--always-dark-overlay)'></div>
    </div>
  );
});
