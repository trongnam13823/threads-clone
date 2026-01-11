import { Logo } from '../logo';
import { Button } from '../ui/button';
import { HeartIcon, HomeIcon, PlusIcon, SearchIcon, UserIcon } from 'lucide-react';
import paths from '@/configs/paths';
import Menu from './Menu';
import { useSelector } from 'react-redux';
import NavLink from '@/contexts/pageStack/components/NavLink';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PostPanel } from '../post/PostPanel';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const userInfo = useSelector((s) => s.auth.userInfo);
  const [open, setOpen] = useState(false);
  // Home icon should be active for all home-related paths

  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-20 flex h-svh w-(--nav-desktop-w) flex-col items-center justify-between bg-(--side-navigation-background) py-4 backdrop-blur-lg',
        'max-md:top-auto max-md:bottom-0 max-md:left-0 max-md:h-(--nav-mobile-h) max-md:w-full max-md:flex-row max-md:p-0'
      )}
    >
      <Logo className='max-md:hidden' />

      <nav className='flex flex-col gap-4 max-md:size-full max-md:flex-row max-md:gap-2'>
        <Button
          asChild
          variant='ghost'
          className='h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background) max-md:size-full max-md:flex-1'
        >
          <NavLink replace to={paths.home}>
            {({ isActive }) => (
              <HomeIcon
                size={24}
                className={isActive ? 'text-(--icon-primary)' : 'text-(--navigation-icon)'}
              />
            )}
          </NavLink>
        </Button>

        <Button
          asChild
          variant='ghost'
          className='h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background) max-md:size-full max-md:flex-1'
        >
          <NavLink replace to={paths.search}>
            {({ isActive }) => (
              <SearchIcon
                size={24}
                className={isActive ? 'text-(--icon-primary)' : 'text-(--navigation-icon)'}
              />
            )}
          </NavLink>
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant='secondary'
              className='group h-12 w-15 rounded-xl bg-(--navigation-item-hover-background) text-(--navigation-icon) max-md:size-full max-md:flex-1'
            >
              <PlusIcon size={24} strokeWidth={3} className='group-hover:text-(--icon-primary)' />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle className='hidden' />
            <DialogDescription className='hidden' />
            <PostPanel onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        <Button
          asChild
          variant='ghost'
          className='h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background) max-md:size-full max-md:flex-1'
        >
          <NavLink replace to={paths.activity}>
            {({ isActive }) => (
              <HeartIcon
                size={24}
                className={isActive ? 'text-(--icon-primary)' : 'text-(--navigation-icon)'}
              />
            )}
          </NavLink>
        </Button>

        <Button
          asChild
          variant='ghost'
          className='h-12 w-15 rounded-xl hover:bg-(--navigation-item-hover-background) max-md:size-full max-md:flex-1'
        >
          <NavLink replace to={paths.profile(userInfo.username)}>
            {({ isActive }) => (
              <UserIcon
                size={24}
                className={isActive ? 'text-(--icon-primary)' : 'text-(--navigation-icon)'}
              />
            )}
          </NavLink>
        </Button>
      </nav>

      <Menu className='mb-4 max-md:hidden' />
    </div>
  );
};

export default NavBar;
