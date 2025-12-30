import { useCallback, memo } from 'react';
import paths from '@/configs/paths';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import { ListPlusIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { pinColumn } from '@/features/auth/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import useNavigate from '@/contexts/pageStack/hooks/useNavigate';

const PinMenu = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((s) => s.auth.userInfo);
  const columns = useSelector((s) => s.auth.columns);
  const { history } = usePageStack();

  const isHome = [paths.home, paths.following, paths.ghostPosts].includes(history.at(-1));
  const isSingleColumn = columns.length === 1;

  const handleAddColumn = useCallback(
    (path) => {
      dispatch(pinColumn(path));
      navigate(paths.home, { replace: true });
    },
    [dispatch, navigate]
  );

  return (
    isHome && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'group top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-(--floating-button-background) max-md:hidden',
              isSingleColumn
                ? 'fixed right-[calc(50%-var(--column-max-w)/2-10px)] translate-x-full max-lg:right-[calc(50%-var(--column-max-w)/2-var(--nav-desktop-w)/2-10px)]'
                : 'absolute right-0 translate-x-full'
            )}
          >
            <ListPlusIcon className='ml-0.5 size-5 text-(--navigation-icon) group-hover:text-(--icon-primary)' />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' sideOffset={6}>
          <DropdownMenuItem onClick={() => handleAddColumn(paths.forYou)}>
            Dành cho bạn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddColumn(paths.following)}>
            Đang theo dõi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddColumn(paths.ghostPosts)}>
            Bài viết tự hủy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddColumn(paths.search)}>
            Tìm kiếm
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddColumn(paths.activity)}>
            Hoạt động
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAddColumn(paths.profile(userInfo.username))}>
            Trang cá nhân
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
});

export default PinMenu;
