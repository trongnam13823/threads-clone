import paths from '@/configs/paths';
import NavLink from '@/contexts/pageStack/components/NavLink';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { CheckIcon, ChevronLeft, CirclePlusIcon } from 'lucide-react';

export const FEED_UI_TYPE = {
  HOME_HEADER: 'home_header',
  ADD_COLUMN: 'add_column',
  SUB_MENU: 'sub_menu',
};

const FeedDropdownContent = ({ type = FEED_UI_TYPE.HOME_HEADER, onBack, ...props }) => {
  return (
    <DropdownMenuContent
      align='center'
      sideOffset={6}
      className='data-[state=closed]:animate-none!'
      {...props}
    >
      <div
        className={cn(
          'flex items-center justify-between p-3 text-xl font-bold',
          type === FEED_UI_TYPE.SUB_MENU && ''
        )}
      >
        <div className='flex items-center gap-4'>
          {type === FEED_UI_TYPE.SUB_MENU && (
            <Button variant='none' size='icon' className='group' onClick={onBack}>
              <ChevronLeft className='size-6 text-(--text-primary) group-hover:scale-110' />
            </Button>
          )}
          <span>Bảng Feed</span>
        </div>
        <Button variant='none' size='icon' className='group'>
          <CirclePlusIcon className='size-5 text-(--text-primary) group-hover:scale-105' />
        </Button>
      </div>
      <DropdownMenuSeparator />
      <NavLink to={paths.home} replace>
        {({ isActive }) => (
          <DropdownMenuItem className='flex size-full items-center justify-between'>
            <span>Dành cho bạn</span>
            <CheckIcon className={cn('size-4 text-inherit', isActive ? 'block' : 'hidden')} />
          </DropdownMenuItem>
        )}
      </NavLink>
      <NavLink to={paths.following} replace>
        {({ isActive }) => (
          <DropdownMenuItem className='flex size-full items-center justify-between'>
            <span>Đang theo dõi</span>
            <CheckIcon className={cn('size-4 text-inherit', isActive ? 'block' : 'hidden')} />
          </DropdownMenuItem>
        )}
      </NavLink>
      <NavLink to={paths.ghostPosts} replace>
        {({ isActive }) => (
          <DropdownMenuItem className='flex size-full items-center justify-between'>
            <span>Bài viết tự hủy</span>
            <CheckIcon className={cn('size-4 text-inherit', isActive ? 'block' : 'hidden')} />
          </DropdownMenuItem>
        )}
      </NavLink>
    </DropdownMenuContent>
  );
};

export default FeedDropdownContent;
