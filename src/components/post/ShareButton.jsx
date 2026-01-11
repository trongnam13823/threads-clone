import { memo, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SendIcon, LinkIcon, ImageIcon, CodeIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShareImage } from './ShareImage';
import { ShareEmbed } from './ShareEmbed';

export const SHARE_DIALOG_TYPES = {
  IMAGE: 'image',
  EMBED: 'embed',
};

const DIALOG_CLASSNAMES = {
  [SHARE_DIALOG_TYPES.IMAGE]: 'w-full max-md:p-3 md:w-[620px]',
  [SHARE_DIALOG_TYPES.EMBED]: 'w-full max-md:p-3 md:w-[620px]',
};

export const ShareButton = memo(({ post, onCopyLink }) => {
  const { t } = useTranslation();
  const [dialogType, setDialogType] = useState(SHARE_DIALOG_TYPES.IMAGE);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const dialogClassName = useMemo(() => DIALOG_CLASSNAMES[dialogType], [dialogType]);

  useEffect(() => {
    setIsAnimationEnd(false);
  }, [dialogType]);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='h-9 gap-1 px-3 text-[13px] tabular-nums'>
            <SendIcon className='size-4.5' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start' sideOffset={4} className='min-w-56'>
          <DropdownMenuItem onClick={onCopyLink} className='gap-3'>
            <span>{t('share.copyLink')}</span>
            <LinkIcon className='size-5 text-inherit' />
          </DropdownMenuItem>

          <DialogTrigger asChild>
            <DropdownMenuItem
              className='gap-3'
              onClick={() => setDialogType(SHARE_DIALOG_TYPES.IMAGE)}
            >
              <span>{t('share.copyAsImage')}</span>
              <ImageIcon className='size-5 text-inherit' />
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogTrigger asChild>
            <DropdownMenuItem
              className='gap-3'
              onClick={() => setDialogType(SHARE_DIALOG_TYPES.EMBED)}
            >
              <span>{t('share.getEmbedCode')}</span>
              <CodeIcon className='size-5 text-inherit' />
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent
        className={dialogClassName}
        onAnimationEnd={() => {
          setIsAnimationEnd(true);
        }}
      >
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        {dialogType === SHARE_DIALOG_TYPES.IMAGE && <ShareImage post={post} />}
        {dialogType === SHARE_DIALOG_TYPES.EMBED && (
          <ShareEmbed post={post} isAnimationEnd={isAnimationEnd} />
        )}
      </DialogContent>
    </Dialog>
  );
});

ShareButton.displayName = 'ShareButton';
