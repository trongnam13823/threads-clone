import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import VerifiedBadge from '@/components/User/VerifiedBadge';

export const SearchUserItem = memo(({ user }) => {
  return (
    <div className='flex gap-3 pt-4 pl-6'>
      {/* AVATAR */}
      <Avatar className='size-9 shrink-0 cursor-pointer'>
        <AvatarImage src={user.avatar_url} alt={user.username} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>

      {/* INFO */}
      <div className='flex flex-1 flex-col border-b border-(--lines-primary) pr-6 pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <h3 className='font-bold'>{user.username}</h3>
            {user.verified && <VerifiedBadge className='ml-0.5 size-4' />}
          </div>

          <Button className='h-[34px] min-w-[104px] rounded-[10px] font-bold'>
            {user.is_following ? 'Đã theo dõi' : 'Theo dõi'}
          </Button>
        </div>

        {user.name && <p className='text-(--text-secondary)'>{user.name}</p>}

        {user.bio && <p className='mt-1 mb-4 line-clamp-2'>{user.bio}</p>}

        <p className='text-(--text-secondary)'>
          {user.followers_count.toLocaleString('en-US')} người theo dõi
        </p>
      </div>
    </div>
  );
});

SearchUserItem.displayName = 'SearchUserItem';

export default SearchUserItem;
