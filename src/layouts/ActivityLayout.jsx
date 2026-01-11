import ColumnHeader from '@/components/column/ColumnHeader';
import ColumnLayout from '@/components/column/ColumnLayout';
import MoreDropdown from '@/components/column/MoreDropdown';
import PinColumn from '@/components/column/PinColumn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import paths from '@/configs/paths';
import withInfiniteScroll from '@/contexts/infiniteScroll/hoc/withInfiniteScroll';
import NavLink from '@/contexts/pageStack/components/NavLink';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const ActivityLayout = withInfiniteScroll(({ children, className, pageStackName }) => {
  const { t } = useTranslation();
  const { history } = usePageStack();
  const currentPath = history.at(-1);

  const navLinks = [
    { path: paths.activity, name: t('activity.all'), title: t('activity.activity') },
    { path: paths.activityFollows, name: t('activity.follows') },
    { path: paths.activityReplies, name: t('activity.replyThreads') },
    { path: paths.activityMentions, name: t('activity.mentions') },
    { path: paths.activityQuotes, name: t('activity.quotes') },
    { path: paths.activityReposts, name: t('activity.reposts') },
    { path: paths.activityVerified, name: t('activity.verified') },
  ];

  const currentNav = navLinks.find((link) => link.path === currentPath);

  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader>
        <MoreDropdown>
          <PinColumn />
        </MoreDropdown>

        {/* HEADING DESKTOP*/}
        <div className='mx-auto flex h-full w-fit cursor-pointer items-center justify-center gap-4 p-2 text-center max-md:hidden'>
          <p className='font-bold'>{currentNav?.title || currentNav?.name || ''}</p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className={cn(
                  'size-6 shadow-[0_2px_8px_0_var(--box-shadow-08)]',
                  'hover:scale-105'
                )}
              >
                <ChevronDownIcon className='size-4.5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='data-[state=closed]:animate-none!'>
              {navLinks.map(({ path, name }) => (
                <NavLink end replace key={path} to={path} className='w-full'>
                  {({ isActive }) => (
                    <DropdownMenuItem className='flex items-center justify-between'>
                      <span>{name}</span>
                      {isActive && <CheckIcon className='size-5 text-(--primary-text)' />}
                    </DropdownMenuItem>
                  )}
                </NavLink>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* HEADING MOBILE */}
        <ScrollArea className='max-w-full md:hidden' type='always'>
          <div className='mb-4 flex gap-1.5 px-3 py-1'>
            {navLinks.map(({ path, name }) => (
              <NavLink
                end
                replace
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'shrink-0 rounded-full border border-(--lines-primary) px-4 leading-[34px] font-bold',
                    isActive ? 'bg-(--background-tertiary)' : ''
                  )
                }
              >
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </ColumnHeader>

      {/* ColumnContent */}
      {children}
    </ColumnLayout>
  );
});

export default ActivityLayout;
