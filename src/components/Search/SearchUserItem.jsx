import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export const SearchUserItem = memo(() => {
  return (
    <div className='flex gap-3 pt-4 pl-6'>
      {/* AVATAR */}
      <Avatar className='size-9 shrink-0 cursor-pointer'>
        <AvatarImage src={''} alt={''} />
        <AvatarFallback>{'namdeptrai'}</AvatarFallback>
      </Avatar>

      {/* INFO */}
      <div className='flex flex-1 flex-col border-b border-(--lines-primary) pr-6 pb-3'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='font-bold'>{'namdeptrai'}</h3>
            <p className='text-(--text-secondary)'>{'Nam Đẹp Trai'}</p>
          </div>

          <Button className='h-[34px] min-w-[104px] rounded-[10px] font-bold'>Theo dõi</Button>
        </div>

        <p className='mt-1 mb-4'>
          {'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'}
        </p>

        <p className='text-(--text-secondary)'>{'435567'.toLocaleString('en-US')} người theo dõi</p>
      </div>
    </div>
  );
});

export default SearchUserItem;
