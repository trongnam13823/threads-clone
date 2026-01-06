import { useTranslation } from 'react-i18next';

const ProfileRepliesPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-(--text-secondary)'>{t('profile.noThreads')}</p>
      </div>
    </>
  );
};

export default ProfileRepliesPage;
