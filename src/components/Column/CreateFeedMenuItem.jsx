import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CirclePlusIcon } from 'lucide-react';

const CreateFeedMenuItem = () => {
  return (
    <DropdownMenuItem className='flex size-full items-center justify-between'>
      <span>Tạo bảng feed mới</span>
      <Button variant='none' size='icon'>
        <CirclePlusIcon className='size-5 text-(--text-primary) hover:scale-105' />
      </Button>
    </DropdownMenuItem>
  );
};

export default CreateFeedMenuItem;

