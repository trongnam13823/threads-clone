import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { PinIcon, PinOffIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { pinColumn, unpinColumn } from '@/features/auth/authSlice';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import paths from '@/configs/paths';
import useNavigate from '@/contexts/pageStack/hooks/useNavigate';
import useDragSwap from '@/contexts/dragSwap/hooks/useDragSwap';

const PinColumn = () => {
  const dispatch = useDispatch();
  const { history } = usePageStack();
  const currentPath = history.at(-1);
  const navigate = useNavigate();

  const { isDraggable, data } = useDragSwap();

  const handleClick = () => {
    if (isDraggable && data?.id) {
      // Unpin by column ID
      dispatch(unpinColumn(data.id));
    } else {
      // Pin by path
      dispatch(pinColumn(currentPath));
    }
    navigate(paths.home, { replace: true });
  };

  return (
    <DropdownMenuItem
      className='flex size-full items-center justify-between'
      onSelect={handleClick}
    >
      <span>{isDraggable ? 'Bỏ ghim' : 'Ghim lên trang chủ'}</span>
      <Button variant='none' size='icon'>
        {isDraggable ? (
          <PinOffIcon className='size-5 text-(--text-primary) hover:scale-105' />
        ) : (
          <PinIcon className='size-5 text-(--text-primary) hover:scale-105' />
        )}
      </Button>
    </DropdownMenuItem>
  );
};

export default PinColumn;
