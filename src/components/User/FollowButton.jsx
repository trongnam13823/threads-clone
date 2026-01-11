import { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useFollowUserMutation, useUnfollowUserMutation } from '@/services/users/userService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const FollowButton = memo(({ user, isFollowing: initialFollowing }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: unfollowLoading }] = useUnfollowUserMutation();
  const isLoading = followLoading || unfollowLoading;

  const handleFollow = async () => {
    if (isLoading) return;
    try {
      await followUser(user.id).unwrap();
      toast.success(t('follow.followed'));
    } catch {
      toast.error(t('follow.actionFailed'));
    }
  };

  const handleUnfollow = async () => {
    if (isLoading) return;
    try {
      await unfollowUser(user.id).unwrap();
      toast.success(t('follow.unfollowed'));
      setOpen(false);
    } catch {
      toast.error(t('follow.actionFailed'));
    }
  };

  const handleClick = () => {
    if (initialFollowing) {
      setOpen(true); // show confirm dialog
    } else {
      handleFollow(); // follow trực tiếp
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isLoading}
        variant={initialFollowing ? 'outline' : 'default'}
        className={cn(
          'h-[34px] min-w-[104px] rounded-[10px] font-bold',
          initialFollowing && 'border-(--lines-primary) text-(--text-secondary)'
        )}
      >
        {initialFollowing ? t('follow.following') : t('follow.follow')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='w-[280px] rounded-2xl border border-(--lines-primary) bg-(--elevated-background) text-center'>
          <div className='p-6'>
            <Avatar className='mx-auto size-16'>
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>

            <p className='mt-4 font-bold'>{t('follow.unfollowConfirm', { username: user.username })}</p>
          </div>

          <div className='relative flex border-t border-inherit'>
            <div className='absolute left-1/2 h-full w-px -translate-x-1/2 bg-(--lines-primary)' />

            <button className='h-[54px] flex-1' onClick={() => setOpen(false)}>
              {t('follow.cancel')}
            </button>

            <button
              className='h-[54px] flex-1 font-bold text-(--error-text)'
              disabled={isLoading}
              onClick={handleUnfollow}
            >
              {t('follow.unfollow')}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

FollowButton.displayName = 'FollowButton';

export default FollowButton;
