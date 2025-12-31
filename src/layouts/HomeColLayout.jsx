import paths from '@/configs/paths';
import NavLink from '@/contexts/pageStack/components/NavLink';
import { cn } from '@/lib/utils';
import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import FeedDropdownContent from '@/components/Column/FeedDropdownContent';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import { useSelector } from 'react-redux';
import { ChevronDownIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useInfiniteScroll from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';
import withInfiniteScroll from '@/contexts/infiniteScroll/hoc/withInfiniteScroll';

const HomeColLayout = withInfiniteScroll(({ children, className, pageStackName }) => {
  const { reload } = useInfiniteScroll();

  const columns = useSelector((state) => state.auth.columns);
  const hasColumns = columns.length > 1;

  const { pages, history } = usePageStack();
  const initPath = pages[0].path;
  const currentPath = history.at(-1);

  const navLinks = [
    {
      path: hasColumns ? paths.forYou : paths.home,
      name: 'Dành cho bạn',
    },
    {
      path: paths.following,
      name: 'Đang theo dõi',
    },
    {
      path: paths.ghostPosts,
      name: 'Bài viết tự hủy',
    },
  ];

  const currentNavLink = navLinks.find((link) => link.path === currentPath) ?? navLinks[0];
  const currentFeedName = currentNavLink?.name || 'Dành cho bạn';

  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      {hasColumns && initPath === paths.home ? (
        <ColumnHeader className='flex items-center justify-center gap-4 select-none'>
          <span className='cursor-pointer font-bold' onClick={reload}>
            {currentFeedName}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className='size-6 p-0 shadow-[0_2px_8px_0_var(--box-shadow-08)] group-hover:scale-105 group-active:scale-95'
                variant='outline'
                size='icon'
              >
                <ChevronDownIcon className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <FeedDropdownContent />
          </DropdownMenu>
        </ColumnHeader>
      ) : (
        <ColumnHeader className='gap-12 text-center max-md:gap-0'>
          {navLinks.map(({ path, name }) => {
            return (
              (!hasColumns || path === initPath) && (
                <NavLink
                  key={path}
                  to={path}
                  replace
                  onClick={() => path === currentPath && reload()}
                  className={({ isActive }) =>
                    cn(
                      'flex shrink-0 items-center justify-center font-bold text-(--text-secondary) select-none active:opacity-65 max-md:h-(--nav-mobile-h) max-md:flex-1 max-md:border-b-2',
                      isActive && 'border-(--text-primary) text-(--text-primary)',
                      path === paths.ghostPosts && 'max-md:hidden'
                    )
                  }
                >
                  <span>{name}</span>
                </NavLink>
              )
            );
          })}
        </ColumnHeader>
      )}

      {/* ColumnContent */}
      {children}
    </ColumnLayout>
  );
});

export default HomeColLayout;
