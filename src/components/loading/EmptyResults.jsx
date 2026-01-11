import { useTranslation } from 'react-i18next';

function EmptyResults({ isEmpty, message }) {
  const { t } = useTranslation();
  if (!isEmpty) return null;

  return (
    <div className='flex h-full flex-1 items-center justify-center py-10'>
      <p className='text-lg text-(--text-secondary)'>{message || t('empty.noData')}</p>
    </div>
  );
}

export default EmptyResults;
