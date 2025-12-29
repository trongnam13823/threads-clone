import {
  EllipsisIcon,
  FilmIcon,
  ImageIcon,
  MapPinIcon,
  SmileIcon,
  SquareChartGanttIcon,
  SquareMenuIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { Textarea } from '../ui/textarea';

const types = [
  { id: 1, name: 'Bất kỳ ai', desc: 'Bất kỳ ai cũng có thể trả lời và trích dẫn' },
  { id: 2, name: 'Người theo dõi của bạn', desc: 'Người theo dõi có thể trả lời và trích dẫn' },
  {
    id: 3,
    name: 'Trang cá nhân mà bạn theo dõi',
    desc: 'Trang cá nhân mà bạn theo dõi có thể trả lời và trích dẫn',
  },
  {
    id: 4,
    name: 'Chỉ khi được nhắc đến',
    desc: 'Trang cá nhân mà bạn nhắc đến có thể trả lời và trích dẫn',
  },
];

export function CreatePostPanel({ onClose, className, classMainContent, CloseElement }) {
  const [text, setText] = useState('');
  const [type, setType] = useState(types[0]);
  const userInfo = useSelector((s) => s.auth.userInfo);

  return (
    <div
      className={cn(
        'flex h-svh max-h-svh w-svw flex-col border border-(--lines-primary) bg-(--elevated-background) md:h-fit md:w-155 md:rounded-2xl',
        className
      )}
    >
      {/* Header */}
      <header className='relative flex h-14 shrink-0 items-center justify-between border-b border-(--lines-primary) px-6'>
        {CloseElement ? (
          CloseElement
        ) : (
          <Button variant='ghost' className='p-0 text-lg hover:bg-transparent' onClick={onClose}>
            Hủy
          </Button>
        )}

        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold'>
          Thread mới
        </span>

        <div className='flex items-center gap-2'>
          <Button variant='icon' className='size-9 p-0!'>
            <SquareChartGanttIcon className='size-6' />
          </Button>

          <Button variant='icon' className='size-9 p-0!'>
            <div className='rounded-full border-2 border-(--text-primary) p-px'>
              <EllipsisIcon className='size-4' />
            </div>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main
        className={cn(
          'flex max-h-[calc(100vh-56px-80px)] gap-3 overflow-y-auto px-6 pt-4 pb-1.5 md:max-h-[calc(100vh-56px-80px-48px)]',
          classMainContent
        )}
      >
        <Avatar className='size-9 cursor-pointer'>
          <AvatarImage src={userInfo.avatar_url} alt={userInfo.username} />
          <AvatarFallback>{userInfo.username}</AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-col'>
          <p className='font-bold'>{userInfo.username}</p>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Có gì mới?'
          />

          <div className='mt-1 -ml-2 flex text-(--secondary-icon)'>
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
      </main>

      {/* Footer */}
      <footer className='mt-auto flex h-20 shrink-0 items-center justify-between px-6'>
        <DropdownMenu>
          <DropdownMenuTrigger className='text-(--text-secondary)'>{type.desc}</DropdownMenuTrigger>

          <DropdownMenuContent align='start'>
            {types.map((t) => (
              <DropdownMenuItem key={t.id} onClick={() => setType(t)}>
                {t.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant='outline' disabled={!text.trim()}>
          Đăng
        </Button>
      </footer>
    </div>
  );
}
