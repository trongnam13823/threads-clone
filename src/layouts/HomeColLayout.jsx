import paths from '@/configs/paths';
import NavLink from '@/contexts/pageStack/components/NavLink';
import { cn } from '@/lib/utils';
import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import { useSelector } from 'react-redux';

const HomeColLayout = ({ children, className, pageStackName }) => {
  const columns = useSelector((state) => state.auth.columns);
  const hasColumns = columns.length > 0;

  const { pages } = usePageStack();
  const initPath = pages[0].path;

  const navLinks = [
    { path: hasColumns ? paths.forYou : paths.home, name: 'Dành cho bạn' },
    { path: paths.following, name: 'Đang theo dõi' },
    { path: paths.ghostPosts, name: 'Bài viết tự hủy' },
  ];

  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      {hasColumns && initPath === paths.home ? (
        <ColumnHeader></ColumnHeader>
      ) : (
        <ColumnHeader className='gap-12'>
          {navLinks.map(({ path, name }) => {
            return (
              (!hasColumns || path === initPath) && (
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
  );
};

export default HomeColLayout;
