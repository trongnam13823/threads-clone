import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import NavLink from '@/contexts/pageStack/components/NavLink';
import paths from '@/configs/paths';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SquareKanbanIcon, InstagramIcon } from 'lucide-react';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import ColumnContent from '@/components/Column/ColumnContent';
import FollowList from '@/components/User/FollowList';
import withInfiniteScroll from '@/contexts/infiniteScroll/hoc/withInfiniteScroll';

const ProfileLayout = withInfiniteScroll(({ children, className, pageStackName }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const navLinks = [
    { path: paths.profile(userInfo.username), name: 'Threads' },
    { path: paths.profileReplies(userInfo.username), name: 'Thread trả lời' },
    { path: paths.profileMedia(userInfo.username), name: 'File phương tiện' },
    { path: paths.profileReposts(userInfo.username), name: 'Bài đăng lại' },
  ];

  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader className='font-bold max-md:hidden'>
        <span>Trang cá nhân</span>
        <MoreDropdown>
          <PinColumn />
        </MoreDropdown>
      </ColumnHeader>

      {/* ColumnContent */}

      <ColumnContent>
        <div className='flex min-h-full flex-1 flex-col'>
          {/* INFO */}
          <div className='h-fit w-full px-6 pt-4.5 pb-2.5'>
            {/* NAME & AVATAR */}
            <div className='flex justify-between'>
              <div>
                <p className='text-2xl font-bold'>{userInfo.username}</p>
                <p className='text-[15px]'>{userInfo.name}</p>
              </div>

              <Avatar className='size-[84px] cursor-pointer'>
                <AvatarImage src={userInfo.avatar_url} alt={userInfo.name} />
                <AvatarFallback>{userInfo.name}</AvatarFallback>
              </Avatar>
            </div>
            {/* FOLLOWER */}
            <div className='flex items-center justify-between'>
              <FollowList />

              <div>
                <Button variant='ghost' size='icon' className='size-9'>
                  <SquareKanbanIcon className={cn('size-6', 'rotate-180 text-(--icon-primary)')} />
                </Button>
                <Button variant='ghost' size='icon' className='size-9'>
                  <InstagramIcon className={cn('size-6', 'text-(--icon-primary)')} />
                </Button>
              </div>
            </div>
          </div>

          {/* EDIT BTN */}
          <div className='px-6 py-3'>
            <Button variant='outline' className='h-8.5 w-full'>
              Chỉnh sửa trang cá nhân
            </Button>
          </div>

          {/* NAV LINKS */}
          <nav
            className={cn('flex h-[50px] justify-center gap-0 overflow-x-hidden max-sm:text-sm')}
          >
            {navLinks.map(({ path, name }) => (
              <NavLink
                replace
                end
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'flex flex-1 items-center justify-center border-b p-2',
                    'border-(--primary-outline) text-(--text-secondary)',
                    isActive && 'border-(--text-primary) text-(--text-primary)'
                  )
                }
              >
                <Button
                  asChild
                  variant='none'
                  className='p-0 font-bold text-current transition-transform'
                >
                  <span>{name}</span>
                </Button>
              </NavLink>
            ))}
          </nav>

          {children}
        </div>
      </ColumnContent>
    </ColumnLayout>
  );
});

export default ProfileLayout;
