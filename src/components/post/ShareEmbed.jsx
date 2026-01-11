import { memo, useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { Button } from '../ui/button';
import paths from '@/configs/paths';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';
import InitialLoading from '../loading/InitialLoading';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const ShareEmbed = memo(({ post, isAnimationEnd }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  const embedCode = useMemo(() => {
    return `<iframe id="post-iframe" src="${window.location.origin}${paths.postEmbed(post.id)}" style="width:100%;height:0;border:0"></iframe> <script>window.addEventListener("message",e=>{if(e.data?.type==="resize"){document.getElementById("post-iframe").style.height=e.data.height+"px"}})</script>`;
  }, [post.id]);

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === 'resize') {
        iframeRef.current.style.height = e.data.height + 'px';
        iframeRef.current.style.opacity = 1;

        setIsLoading(false);
      }
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

  const handleCopyEmbedCode = useCallback(async () => {
    copy(embedCode);
    toast.success(t('share.embedCopied'));
  }, [embedCode, t]);

  return (
    <div className='rounded-2xl bg-(--elevated-background) p-6'>
      <div className='relative min-h-[150px]'>
        {isAnimationEnd && (
          <iframe
            ref={iframeRef}
            src={paths.postEmbed(post.id)}
            className={cn('h-[150px] w-full border-0 opacity-0')}
          />
        )}
        {isLoading && <InitialLoading isLoading={isLoading} className='absolute inset-0' />}
      </div>

      <div className='mt-6 flex items-center gap-3 rounded-[inherit] bg-(--background-tertiary) px-4 py-3'>
        <input className='absolute size-0' />
        <input className='flex-1 focus:outline-0' type='text' readOnly value={embedCode} />
        <Button onClick={handleCopyEmbedCode} className='h-[34px] rounded-[10px] font-bold'>
          {t('share.copy')}
        </Button>
      </div>
    </div>
  );
});

ShareEmbed.displayName = 'ShareEmbed';
