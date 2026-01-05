import { formatNumber } from '@/utils/formatTime';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { MessageCircleIcon } from 'lucide-react';
import { POST_PANEL_TYPES, PostPanel } from './PostPanel';
import { useState } from 'react';

export default function ReplyButton({ isDataVisible, post }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' className='h-9 gap-1 px-3 text-[13px] tabular-nums'>
          <MessageCircleIcon className='size-4.5' />
          {isDataVisible ? post.replies_count > 0 && formatNumber(post.replies_count) : null}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        <PostPanel type={POST_PANEL_TYPES.REPLY_POST} post={post} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
