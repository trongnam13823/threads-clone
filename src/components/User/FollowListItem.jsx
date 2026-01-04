import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import VerifiedBadge from './VerifiedBadge';
import FollowButton from './FollowButton';

const FollowListItem = memo(({ user }) => {
  return (
    <div className='flex items-start gap-3 pt-4 pl-6'>
      <Avatar className='size-10 shrink-0 cursor-pointer'>
        <AvatarImage src={user.avatar_url} alt={user.username} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>

      <div className='flex flex-1 items-center justify-between border-b border-(--lines-primary) pr-6 pb-4'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-1.5'>
            <h3 className='font-bold'>{user.username}</h3>
            {/* {user.verified && <VerifiedBadge className='size-4' />} */}
          </div>
          {user.name && <p className='text-(--text-secondary)'>{user.name}</p>}
        </div>

        <FollowButton user={user} isFollowing={user.pivot ? true : false} />
      </div>
    </div>
  );
});

FollowListItem.displayName = 'FollowListItem';

export default FollowListItem;
