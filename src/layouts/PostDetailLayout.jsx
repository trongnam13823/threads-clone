import ColumnHeader from '@/components/column/ColumnHeader';
import ColumnLayout from '@/components/column/ColumnLayout';
import useInfiniteScroll from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';
import withInfiniteScroll from '@/contexts/infiniteScroll/hoc/withInfiniteScroll';

const PostDetailLayout = withInfiniteScroll(({ children, className, pageStackName }) => {
  const { reload } = useInfiniteScroll();

  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader className='max-md:hidden' showBack={true}>
        <button onClick={reload} type='button' className='cursor-pointer font-bold'>
          Thread
        </button>
      </ColumnHeader>

      {/* ColumnContent */}
      {children}
    </ColumnLayout>
  );
});

export default PostDetailLayout;
