import { FilmIcon, ImageIcon, MapPinIcon, SmileIcon, SquareMenuIcon, XIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { POST_PANEL_TYPES } from './PostPanel';

export function PostPanelContent({
  userInfo,
  content,
  onContentChange,
  onRemove,
  index,
  type,
  placeholder = 'Có gì mới?',
}) {
  return (
    <div className='flex gap-3 pb-[5px]'>
      <div className='flex flex-col items-center gap-3'>
        <Avatar className='size-9 cursor-pointer'>
          <AvatarImage src={userInfo.avatar_url} alt={userInfo.username} />
          <AvatarFallback>{userInfo.username}</AvatarFallback>
        </Avatar>
        <div
          hidden={type === POST_PANEL_TYPES.EDIT_POST}
          className='h-full w-[2px] bg-(--lines-primary)'
        ></div>
      </div>

      <div className='flex flex-1 flex-col'>
        <div className='flex items-center justify-between'>
          <p className='font-bold'>{userInfo.username}</p>
          <Button hidden={index === 0} variant='icon' size='icon-sm' onClick={onRemove}>
            <XIcon size={16} className='text-(--secondary-icon)' />
          </Button>
        </div>

        <Textarea
          autoFocus
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={index === 0 ? placeholder : 'Bạn nói gì thêm đi...'}
        />

        <div
          hidden={type === POST_PANEL_TYPES.EDIT_POST}
          className='mt-1 -ml-2 flex text-(--secondary-icon)'
        >
          <div className='flex cursor-pointer p-2 transition-transform hover:scale-105'>
            <ImageIcon size={20} />
          </div>
          <div className='flex cursor-pointer p-2 transition-transform hover:scale-105'>
            <FilmIcon size={20} />
          </div>
          <div className='flex cursor-pointer p-2 transition-transform hover:scale-105'>
            <SmileIcon size={20} />
          </div>
          <div className='flex cursor-pointer p-2 transition-transform hover:scale-105'>
            <SquareMenuIcon size={20} />
          </div>
          <div className='flex cursor-pointer p-2 transition-transform hover:scale-105'>
            <MapPinIcon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
