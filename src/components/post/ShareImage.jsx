import { memo, useState, useRef, useCallback, useMemo } from 'react';
import { DownloadIcon, CheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { POST_CARD_TYPES, PostCard } from './PostCard';
import { cn } from '@/lib/utils';
import { toBlob, toPng } from 'html-to-image';
import { copyBlobToClipboard } from 'copy-image-clipboard';
import { toast } from 'sonner';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';

export const ShareImage = memo(({ post }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isDataVisible, setIsDataVisible] = useState(true);

  // Lấy theme thực tế từ system nếu theme là 'system'
  const initialTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  const [imageTheme, setImageTheme] = useState(initialTheme);
  const imageContainerRef = useRef(null);

  const handleCopyImage = useCallback(async () => {
    const node = imageContainerRef.current;
    if (!node) return;

    try {
      const blob = await toBlob(node, {
        backgroundColor: 'var(--background-tertiary)',
      });

      await copyBlobToClipboard(blob);
      toast.success(t('share.imageCopied'));
    } catch {
      toast.error(t('common.error'));
    }
  }, [post.id, t]);

  const handleDownloadImage = useCallback(async () => {
    if (!imageContainerRef.current) return;

    try {
      const dataUrl = await toPng(imageContainerRef.current, {
        backgroundColor: 'var(--background-tertiary)',
      });

      const link = document.createElement('a');
      link.download = `post-${post.id}.png`;
      link.href = dataUrl;
      link.click();

      toast.success(t('share.imageDownloaded'));
    } catch {
      toast.error(t('common.error'));
    }
  }, [post.id, t]);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-(--background-tertiary)',
        imageTheme === 'light' ? 'light' : 'dark'
      )}
    >
      <div ref={imageContainerRef} className='rounded-[inherit] p-8'>
        <PostCard post={post} type={POST_CARD_TYPES.IMAGE} isDataVisible={isDataVisible} />
      </div>

      <div className='-mt-8 flex items-center gap-2 px-4 py-3'>
        <div
          className={cn(
            'size-6 cursor-pointer rounded-full border-3 bg-[#fafafa] transition-colors',
            imageTheme === 'light' ? 'border-(--radio-border-color-selected)' : 'border-transparent'
          )}
          onClick={() => setImageTheme('light')}
        ></div>
        <div
          className={cn(
            'size-6 cursor-pointer rounded-full border-3 bg-[#181818] transition-colors',
            imageTheme === 'dark' ? 'border-(--radio-border-color-selected)' : 'border-transparent'
          )}
          onClick={() => setImageTheme('dark')}
        ></div>
      </div>

      <div className='flex items-center justify-between bg-(--elevated-background) p-4'>
        <div
          className='flex cursor-pointer items-center gap-2 select-none'
          onClick={() => setIsDataVisible((prev) => !prev)}
        >
          <div
            className={cn(
              'flex size-6 items-center justify-center rounded-full border-2 border-(--lines-primary)',
              isDataVisible && 'border-(--background-inverse) bg-(--background-inverse)'
            )}
          >
            <CheckIcon
              className={cn(
                'mt-0.5 size-4 stroke-3',
                isDataVisible ? 'text-(--icon-inverse)' : 'text-transparent'
              )}
            />
          </div>

          <span className='text-(--text-primary)'>{t('share.showData')}</span>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-[34px] rounded-[10px] px-2'
            onClick={handleDownloadImage}
          >
            <DownloadIcon className='size-5' />
          </Button>
          <Button className='h-[34px] rounded-[10px] font-bold' onClick={handleCopyImage}>
            {t('share.copy')}
          </Button>
        </div>
      </div>
    </div>
  );
});
ShareImage.displayName = 'ShareImage';
