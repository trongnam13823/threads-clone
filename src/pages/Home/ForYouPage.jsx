import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import { CreatePostBox } from '@/components/Post/CreatePostBox';
import { PostCard } from '@/components/Post/PostCard';

const ForYouPage = ({ dropdownElement }) => {
  return (
    <ColumnContent
      dropdownElement={
        dropdownElement || (
          <MoreDropdown>
            <PinColumn />
          </MoreDropdown>
        )
      }
    >
      <div className='flex-1 *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none'>
        <CreatePostBox className='pt-6 max-md:hidden' />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </ColumnContent>
  );
};

export default ForYouPage;
