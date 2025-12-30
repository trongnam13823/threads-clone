import { useEffect, useRef, useState } from 'react';

/**
 * useMediaPlayer - Hook tổng quát cho image và video
 *
 * Hỗ trợ:
 * 1. Lazy load: Load media khi gần viewport (tối ưu performance)
 * 2. Auto play/pause: Tự động play/pause video (optional)
 *
 * @param {Object} [options] - Tùy chọn
 * @param {'image' | 'video'} [options.type='image'] - Loại media
 * @param {string} [options.lazyRootMargin='100%'] - Load media trước (hỗ trợ px và %, default: 100%)
 * @param {Function} [options.onPlaybackChange] - Callback khi visibility thay đổi (entry, media) => void (chỉ cho video)
 * @param {number} [options.playbackThreshold=0.5] - % video visible để trigger callback (0-1, chỉ cho video)
 * @param {string} [options.playbackRootMargin='0%'] - Margin cho playback observer (hỗ trợ px và %, chỉ cho video)
 *
 * @returns {Object} Hook returns
 * @returns {Object} returns.containerRef - Ref cho container element (để lazy load)
 * @returns {Object} returns.mediaRef - Ref cho media element (img/video)
 * @returns {boolean} returns.shouldLoad - Media đã được load chưa
 *
 * @example
 * // Image - chỉ lazy load
 * const { containerRef, mediaRef, shouldLoad } = useMediaPlayer({
 *   type: 'image',
 *   lazyRootMargin: '100%', // hoặc '100px'
 * });
 *
 * @example
 * // Video - với default play/pause
 * const { containerRef, mediaRef, shouldLoad } = useMediaPlayer({
 *   type: 'video',
 *   lazyRootMargin: '150%', // hoặc '200px'
 *   onPlaybackChange: (entry, video) => {
 *     if (entry.isIntersecting) {
 *       video.play().catch(() => {});
 *     } else {
 *       video.pause();
 *     }
 *   },
 *   playbackThreshold: 0.5,
 * });
 *
 * @example
 * // Video - với custom logic
 * const { containerRef, mediaRef, shouldLoad } = useMediaPlayer({
 *   type: 'video',
 *   onPlaybackChange: (entry, video) => {
 *     // Custom logic: chỉ play khi visible >= 70%
 *     if (entry.intersectionRatio >= 0.7) {
 *       video.play().catch(() => {});
 *     } else {
 *       video.pause();
 *     }
 *   },
 * });
 */
export const useMediaPlayer = ({
  type = 'image',
  lazyRootMargin = '100%',
  onPlaybackChange,
  playbackThreshold = 0.5,
  playbackRootMargin = '0%',
} = {}) => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // 1️⃣ Lazy load observer: Load media khi gần viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoad) return;

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            lazyObserver.disconnect(); // Chỉ load 1 lần
          }
        });
      },
      {
        threshold: 0,
        rootMargin: lazyRootMargin,
      }
    );

    lazyObserver.observe(container);

    return () => {
      lazyObserver.disconnect();
    };
  }, [lazyRootMargin, shouldLoad]);

  // 2️⃣ Auto play/pause observer: Chỉ chạy cho video sau khi đã load
  useEffect(() => {
    if (type !== 'video' || !shouldLoad || !onPlaybackChange) return;

    const media = mediaRef.current;
    if (!media) return;

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Gọi callback, để component quyết định logic play/pause
          onPlaybackChange(entry, media);
        });
      },
      {
        threshold: playbackThreshold,
        rootMargin: playbackRootMargin,
      }
    );

    playbackObserver.observe(media);

    return () => {
      playbackObserver.disconnect();
    };
  }, [type, shouldLoad, onPlaybackChange, playbackThreshold, playbackRootMargin, mediaRef]);

  return {
    containerRef,
    mediaRef,
    shouldLoad,
  };
};
