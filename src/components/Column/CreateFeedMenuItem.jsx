import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { CirclePlusIcon } from 'lucide-react';

const CreateFeedMenuItem = () => {
  const { t } = useTranslation();
  return (
    <DropdownMenuItem className='flex size-full items-center justify-between'>
      <span>{t('pin.createNewFeedBoard')}</span>
      <Button variant='none' size='icon'>
        <CirclePlusIcon className='size-5 text-(--text-primary) hover:scale-105' />
      </Button>
    </DropdownMenuItem>
  );
};

export default CreateFeedMenuItem;

