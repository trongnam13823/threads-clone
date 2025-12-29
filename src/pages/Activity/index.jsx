import ColumnContent from '@/components/Column/ColumnContent';
import { PostCard } from '@/components/Post/PostCard';

const ActivityPage = () => {
  return (
    <ColumnContent>
      <div className='py-3'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <PostCard />
            <div className='ml-auto h-px w-[calc(100%-24px-36px-16px)] bg-(--lines-primary)' />
          </div>
        ))}
      </div>
    </ColumnContent>
  );
};

export default ActivityPage;
