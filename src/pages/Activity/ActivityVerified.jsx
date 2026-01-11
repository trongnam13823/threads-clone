import { useTranslation } from 'react-i18next';
import ColumnContent from '@/components/Column/ColumnContent';

const ActivityVerified = () => {
  const { t } = useTranslation();
  return (
    <ColumnContent>
      <div className='flex size-full items-center justify-center py-2'>
        <p className='text-(--text-secondary)'>{t('activity.noActivity')}</p>
      </div>
    </ColumnContent>
  );
};

export default ActivityVerified;
