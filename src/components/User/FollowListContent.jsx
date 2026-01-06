import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FollowListItem from './FollowListItem';
import usersApi, { useGetFollowersQuery, useGetFollowingsQuery } from '@/services/users/usersApi';
import useInfiniteQueryList from '@/hooks/useInfiniteQueryList';
import useInfiniteScroll from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import LoadMoreTrigger from '@/components/Loading/LoadMoreTrigger';
import InitialLoading from '@/components/Loading/InitialLoading';
import EmptyResults from '@/components/Loading/EmptyResults';
import ReloadIndicator from '@/components/Loading/ReloadIndicator';

const TABS = {
  FOLLOWINGS: 'followings',
  FOLLOWERS: 'followers',
};

export default function FollowListContent({ userId }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(TABS.FOLLOWINGS);
  const scrollAreaRef = useRef(null);
  const { registerScrollEl } = useInfiniteScroll();

  // Get queryState để lấy initialPage và totals
  const selectFollowings = usersApi.endpoints.getFollowings.select({ id: userId });
  const followingsQueryState = useSelector(selectFollowings);
  const followingsTotal = followingsQueryState?.data?.pagination?.total ?? 0;

  const selectFollowers = usersApi.endpoints.getFollowers.select({ id: userId });
  const followersQueryState = useSelector(selectFollowers);
  const followersTotal = followersQueryState?.data?.pagination?.total ?? 0;

  /** ===== FOLLOWINGS ===== */
  const {
    items: followings,
    isLoading: isLoadingFollowings,
    isReloading: isReloadingFollowings,
    hasMore: hasMoreFollowings,
    sentinelRef: followingsSentinelRef,
  } = useInfiniteQueryList({
    queryHook: useGetFollowingsQuery,
    queryParams: { id: userId },
    queryOptions: {
      skip: !userId || activeTab !== TABS.FOLLOWINGS,
    },
    initialPage: followingsQueryState?.data?.pagination?.current_page ?? 1,
  });

  /** ===== FOLLOWERS ===== */
  const {
    items: followers,
    isLoading: isLoadingFollowers,
    isReloading: isReloadingFollowers,
    hasMore: hasMoreFollowers,
    sentinelRef: followersSentinelRef,
  } = useInfiniteQueryList({
    queryHook: useGetFollowersQuery,
    queryParams: { id: userId },
    queryOptions: {
      skip: !userId || activeTab !== TABS.FOLLOWERS,
    },
    initialPage: followersQueryState?.data?.pagination?.current_page ?? 1,
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Register scrollAreaRef với InfiniteScrollProvider từ bên ngoài
  useEffect(() => {
    if (scrollAreaRef.current) {
      registerScrollEl(scrollAreaRef.current);
    }
  }, [registerScrollEl, activeTab]);

  return (
    <div className='flex w-full flex-col gap-0'>
      {/* TAB BUTTONS */}
      <div className='inline-flex min-h-16 items-center justify-center'>
        <button
          onClick={() => handleTabChange(TABS.FOLLOWINGS)}
          className={cn(
            'h-full flex-1 border-b border-(--lines-primary) font-bold text-(--text-secondary) transition-colors',
            'flex flex-col items-center justify-center gap-0',
            activeTab === 'followings' && 'border-(--text-primary) text-(--text-primary)'
          )}
        >
          <span className='text-base'>{t('followList.following')}</span>
          <span className='text-xs font-normal'>{followingsTotal}</span>
        </button>

        <button
          onClick={() => handleTabChange(TABS.FOLLOWERS)}
          className={cn(
            'h-full flex-1 border-b border-(--lines-primary) font-bold text-(--text-secondary) transition-colors',
            'flex flex-col items-center justify-center gap-0',
            activeTab === 'followers' && 'border-(--text-primary) text-(--text-primary)'
          )}
        >
          <span className='text-base'>{t('followList.followers')}</span>
          <span className='text-xs font-normal'>{followersTotal}</span>
        </button>
      </div>

      {/* FOLLOWINGS */}
      {activeTab === TABS.FOLLOWINGS && (
        <ScrollArea ref={scrollAreaRef} className='max-h-[80svh] md:max-h-[calc(100svh-64px-48px)]'>
          <div>
            <InitialLoading isLoading={isLoadingFollowings} />
            <ReloadIndicator isReloading={isReloadingFollowings} />
            <EmptyResults
              isEmpty={!isLoadingFollowings && followings.length === 0}
              message={t('followList.notFollowingAnyone')}
            />

            {followings.length > 0 && (
              <>
                {followings.map((user) => (
                  <FollowListItem key={user.id} user={{ ...user, is_following: true }} />
                ))}
                <LoadMoreTrigger ref={followingsSentinelRef} hasMore={hasMoreFollowings} />
              </>
            )}
          </div>
        </ScrollArea>
      )}

      {/* FOLLOWERS */}
      {activeTab === TABS.FOLLOWERS && (
        <ScrollArea ref={scrollAreaRef} className='max-h-[80svh] md:max-h-[calc(100svh-64px-48px)]'>
          <div>
            <InitialLoading isLoading={isLoadingFollowers} />
            <ReloadIndicator isReloading={isReloadingFollowers} />
            <EmptyResults
              isEmpty={!isLoadingFollowers && followers.length === 0}
              message={t('followList.noFollowers')}
            />

            {followers.length > 0 && (
              <>
                {followers.map((user) => (
                  <FollowListItem key={user.id} user={user} />
                ))}
                <LoadMoreTrigger ref={followersSentinelRef} hasMore={hasMoreFollowers} />
              </>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
