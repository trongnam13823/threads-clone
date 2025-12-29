import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';

const SearchLayout = ({ children, className, pageStackName }) => {
  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader className='font-bold max-md:hidden'>Tìm kiếm</ColumnHeader>

      {/* ColumnContent */}
      {children}
    </ColumnLayout>
  );
};

export default SearchLayout;
