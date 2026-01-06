import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  ChevronLeft,
  ChevronRightIcon,
  MenuIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useState } from 'react';
import FeedDropdownContent, { FEED_UI_TYPE } from '../Column/FeedDropdownContent';
import { logoutThunk } from '@/features/auth/authThunks';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/hooks/useTheme';

export const SUB_MENU = {
  EMPTY: 'empty',
  FEED: 'feed',
  THEME: 'theme',
};

function Menu({ className }) {
  const [subMenu, setSubMenu] = useState(SUB_MENU.EMPTY);
  const { theme, setTheme } = useTheme();

  const dispatch = useDispatch();
  const handleBack = () => {
    setSubMenu(SUB_MENU.EMPTY);
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setSubMenu(SUB_MENU.EMPTY);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant='none' className={cn('group size-12 text-(--navigation-icon)', className)}>
          <MenuIcon size={24} className='group-hover:text-(--icon-primary)' />
        </Button>
      </DropdownMenuTrigger>

      {subMenu === SUB_MENU.EMPTY && (
        <DropdownMenuContent align='start' sideOffset={0}>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setSubMenu(SUB_MENU.THEME);
            }}
          >
            <span>Giao diện</span>
            <ChevronRightIcon className='size-5 text-(--text-secondary)' />
          </DropdownMenuItem>
          <DropdownMenuItem>Thông tin chi tiết</DropdownMenuItem>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setSubMenu(SUB_MENU.FEED);
            }}
          >
            <span>Bảng feed</span>
            <ChevronRightIcon className='size-5 text-(--text-secondary)' />
          </DropdownMenuItem>
          <DropdownMenuItem>Đã lưu</DropdownMenuItem>
          <DropdownMenuItem>Đã thích</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Báo cáo sự cố</DropdownMenuItem>
          <DropdownMenuItem
            className='text-(--error-text) hover:text-(--error-text)!'
            onClick={() => {
              dispatch(logoutThunk());
            }}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}

      {subMenu === SUB_MENU.FEED && (
        <FeedDropdownContent
          align='start'
          sideOffset={0}
          type={FEED_UI_TYPE.SUB_MENU}
          onBack={handleBack}
        />
      )}

      {subMenu === SUB_MENU.THEME && (
        <DropdownMenuContent align='start' sideOffset={0} className='p-4'>
          <div className='flex h-[35px] items-center gap-4'>
            <Button variant='none' size='icon' className='group' onClick={handleBack}>
              <ChevronLeft className='size-6 text-(--text-primary) group-hover:scale-110' />
            </Button>
            <span className='mx-auto font-bold'>Giao diện</span>
          </div>

          <ul className='mt-2 flex items-center gap-4 rounded-xl bg-(--background-secondary) text-(--text-secondary)'>
            <li
              className={cn(
                'flex h-11 w-24 flex-1 cursor-pointer items-center justify-center rounded-[inherit] border border-transparent',
                theme === 'light' &&
                  'border-(--lines-primary) bg-(--floating-button-background) text-(--icon-primary)'
              )}
              onClick={() => setTheme('light')}
            >
              <SunIcon className='size-4.5' />
            </li>
            <li
              className={cn(
                'flex h-11 w-24 flex-1 cursor-pointer items-center justify-center rounded-[inherit] border border-transparent',
                theme === 'dark' &&
                  'border-(--lines-primary) bg-(--floating-button-background) text-(--icon-primary)'
              )}
              onClick={() => setTheme('dark')}
            >
              <MoonIcon className='size-4.5' />
            </li>
            <li
              className={cn(
                'flex h-11 w-24 flex-1 cursor-pointer items-center justify-center rounded-[inherit] border border-transparent',
                theme === 'system' &&
                  'border-(--lines-primary) bg-(--floating-button-background) text-(--icon-primary)'
              )}
              onClick={() => setTheme('system')}
            >
              <MonitorIcon className='size-4.5' />
            </li>
          </ul>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default Menu;
