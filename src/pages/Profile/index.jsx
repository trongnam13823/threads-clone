import { useTranslation } from 'react-i18next';
import { CreatePostBox } from '@/components/Post/CreatePostBox';

const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <CreatePostBox className='border-b border-(--lines-primary)' />
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-(--text-secondary)'>{t('profile.noThreads')}</p>
      </div>
    </>
  );
};

export default ProfilePage;
