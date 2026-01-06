import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useGetFollowersQuery } from '@/services/users/usersApi';
import { useSelector } from 'react-redux';
import FollowListContent from './FollowListContent';

export default function FollowList() {
  const { t } = useTranslation();
  const userId = useSelector((state) => state.auth.userInfo?.id);
  const [open, setOpen] = useState(false);

  // Get followers total for trigger button (only need initial fetch)
  const { data: followersData } = useGetFollowersQuery({ id: userId, page: 1 }, { skip: !userId });
  const followersTotal = followersData?.pagination?.total ?? 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='text-(--text-secondary) hover:underline'>
        {followersTotal} {t('search.followers')}
      </DialogTrigger>

      <DialogContent className='min-w-full rounded-2xl border border-(--lines-primary) bg-(--elevated-background) max-md:top-[unset] max-md:bottom-0 max-md:left-[unset] max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-b-none md:min-w-[480px]'>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />

        {<FollowListContent userId={userId} />}
      </DialogContent>
    </Dialog>
  );
}
