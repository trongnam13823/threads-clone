import paths from '@/configs/paths';
import NavLink from '@/contexts/pageStack/components/NavLink';
import { cn } from '@/lib/utils';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import MoreDropdown from '@/components/Column/MoreDropdown';
import { CirclePlusIcon, Pin } from 'lucide-react';
import ColumnHeader from '@/components/Column/ColumnHeader';
import MaybePageStack from '@/contexts/pageStack/components/MaybePageStack';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import { useSelector } from 'react-redux';

const HomeLayout = ({
  children,
  className,
  fromRouteRenderer,
  routeRendererPath,
  autoUpdateUrl,
}) => {
  const columns = useSelector((state) => state.auth.columns);

  const { pages } = usePageStack();
  const path = routeRendererPath ?? paths.home;
  const initPath = pages ? pages[0].path : path;

  const navLinks = [
    { path: columns.length > 0 ? paths.forYou : paths.home, name: 'Dành cho bạn' },
    { path: paths.following, name: 'Đang theo dõi' },
    { path: paths.ghostPosts, name: 'Bài viết tự hủy' },
  ];

  return (
    <MaybePageStack
      enabled={!fromRouteRenderer}
      path={routeRendererPath}
      autoUpdateUrl={autoUpdateUrl}
      neverUnmount={[paths.following, paths.ghostPosts]}
    >
      <ColumnLayout className={className}>
        {columns.length > 0 && initPath === paths.home ? (
          <ColumnHeader></ColumnHeader>
        ) : (
          <ColumnHeader className='gap-12'>
            {navLinks.map(({ path, name }) => {
              const isNoColumns = columns.length === 0;
              const isInitPathWithColumns = columns.length > 0 && path === initPath;
              return (
                (isNoColumns || isInitPathWithColumns) && (
                  <NavLink
                    key={path}
                    to={path}
                    replace
                    className={({ isActive }) =>
                      cn(
                        'font-bold text-(--text-secondary) active:opacity-65',
                        isActive && 'text-(--text-primary)'
                      )
                    }
                  >
                    {name}
                  </NavLink>
                )
              );
            })}
          </ColumnHeader>
        )}

        {/* ColumnContent */}
        {children ? children : <Outlet />}
      </ColumnLayout>
    </MaybePageStack>
  );
};

export default HomeLayout;
