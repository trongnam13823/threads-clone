import ColumnContent from '@/components/Column/ColumnContent';
import { CreatePostBox } from '@/components/Post/CreatePostBox';
import { PostCard } from '@/components/Post/PostCard';

const FollowingPage = () => {
  return (
    <ColumnContent>
      <div className='flex-1 *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
        <CreatePostBox className='pt-6 max-md:hidden' />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </ColumnContent>
  );
};

export default FollowingPage;
