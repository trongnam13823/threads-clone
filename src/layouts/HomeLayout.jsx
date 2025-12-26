import paths from '@/configs/paths';
import NavLink from '@/contexts/pageStack/components/NavLink';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import MoreDropdown from '@/components/Column/MoreDropdown';
import { CirclePlusIcon } from 'lucide-react';
import ColumnHeader from '@/components/Column/ColumnHeader';
import MaybePageStack from '@/contexts/pageStack/components/MaybePageStack';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';

const HomeLayout = ({
  children,
  className,
  fromRouteRenderer,
  routeRendererPath,
  autoUpdateUrl,
}) => {
  return (
    <MaybePageStack
      enabled={!fromRouteRenderer}
      url={routeRendererPath ?? paths.home}
      autoUpdateUrl={autoUpdateUrl}
      neverUnmount={[paths.following, paths.ghostPosts]}
    >
      <ColumnLayout className={className}>
        <ColumnHeader className='gap-6'>
          <NavLink
            to={paths.home}
            replace
            className={({ isActive }) =>
              cn(
                'font-bold text-(--text-secondary) active:opacity-65',
                isActive && 'text-(--text-primary)'
              )
            }
          >
            Dành cho bạn
          </NavLink>
          <NavLink
            to={paths.following}
            replace
            className={({ isActive }) =>
              cn(
                'font-bold text-(--text-secondary) active:opacity-65',
                isActive && 'text-(--text-primary)'
              )
            }
          >
            Đang theo dõi
          </NavLink>
          <NavLink
            to={paths.ghostPosts}
            replace
            className={({ isActive }) =>
              cn(
                'font-bold text-(--text-secondary) active:opacity-65',
                isActive && 'text-(--text-primary)'
              )
            }
          >
            Bài viết tự hủy
          </NavLink>

          <MoreDropdown>
            <DropdownMenuItem className='flex items-center justify-between'>
              Tạo bảng feed mới <CirclePlusIcon className='size-5 text-inherit' />
            </DropdownMenuItem>
          </MoreDropdown>
        </ColumnHeader>

        {/* ColumnContent */}
        {children ? children : <Outlet />}
      </ColumnLayout>
    </MaybePageStack>
  );
};

export default HomeLayout;
