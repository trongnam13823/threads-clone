import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Maximize2Icon, MoveUpIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Textarea } from '../ui/textarea';

export function ReplyBox() {
  const userInfo = useSelector((s) => s.auth.userInfo);
  const [text, setText] = useState('');

  return (
    <div className='flex gap-4'>
      {/* Avatar */}
      <Avatar className='size-9'>
        <AvatarImage src={userInfo.avatar_url} alt={userInfo.username} />
        <AvatarFallback>{userInfo.username}</AvatarFallback>
      </Avatar>

      {/* Editable + Username */}
      <div className='flex flex-1 flex-col'>
        <span className='font-bold'>{userInfo.username}</span>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Trả lời abc..'
        />
      </div>

      {/* Action Buttons */}
      <div className='flex items-start gap-2.5'>
        <Button variant='secondary' size='icon-md' className='hover:scale-105'>
          <Maximize2Icon className='size-4' />
        </Button>

        {text.trim() && (
          <Button size='icon-md' className='hover:scale-105'>
            <MoveUpIcon className='size-4' />
          </Button>
        )}
      </div>
    </div>
  );
}
