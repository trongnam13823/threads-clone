import { memo, useState, useRef, useCallback } from 'react';
import { DownloadIcon, CheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { POST_CARD_TYPES, PostCard } from './PostCard';
import { cn } from '@/lib/utils';
import { toBlob, toPng } from 'html-to-image';
import { copyBlobToClipboard } from 'copy-image-clipboard';
import { toast } from 'sonner';

export const ShareImage = memo(({ post }) => {
  const [isDataVisible, setIsDataVisible] = useState(true);
  const imageContainerRef = useRef(null);

  const handleCopyImage = useCallback(async () => {
    const node = imageContainerRef.current;
    if (!node) return;

    try {
      const blob = await toBlob(node, {
        backgroundColor: 'var(--background-tertiary)',
      });

      await copyBlobToClipboard(blob);
      toast.success('Đã sao chép hình ảnh');
    } catch {
      toast.error('Lỗi khi sao chép hình ảnh');
    }
  }, [post.id]);

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

      toast.success('Đã tải hình ảnh');
    } catch {
      toast.error('Lỗi khi tải hình ảnh');
    }
  }, [post.id]);

  return (
    <div className='overflow-hidden rounded-2xl bg-(--background-tertiary)'>
      <div ref={imageContainerRef} className='rounded-[inherit] p-8'>
        <PostCard post={post} type={POST_CARD_TYPES.IMAGE} isDataVisible={isDataVisible} />
      </div>

      <div className='-mt-8 flex items-center gap-2 px-4 py-3'>
        <div className='size-6 rounded-full border-3 border-(--radio-border-color-selected) bg-[#fafafa]'></div>
        <div className='size-6 rounded-full border-3 border-transparent bg-[#181818]'></div>
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

          <span>Hiển thị số liệu</span>
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
            Sao chép
          </Button>
        </div>
      </div>
    </div>
  );
});

ShareImage.displayName = 'ShareImage';

