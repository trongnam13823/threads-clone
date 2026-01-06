import { CreatePostBox } from '@/components/Post/CreatePostBox';

const ProfilePage = () => {
  return (
    <>
      <CreatePostBox className='border-b border-(--lines-primary)' />
      <div className='flex flex-1 items-center justify-center'>
        <p className='text-(--text-secondary)'>Chưa có thread nào.</p>
      </div>
    </>
  );
};

export default ProfilePage;
