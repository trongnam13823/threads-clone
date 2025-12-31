import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { useDispatch, useSelector } from 'react-redux';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import SearchInput from '@/components/Search/SearchInput';
import ColumnContent from '@/components/Column/ColumnContent';
import { setText } from '@/features/search/searchSlice';
import useInfiniteScroll from '@/contexts/infiniteScroll/hooks/useInfiniteScroll';
import withInfiniteScroll from '@/contexts/infiniteScroll/hoc/withInfiniteScroll';

const SearchLayout = withInfiniteScroll(({ children, className, pageStackName }) => {
  const dispatch = useDispatch();
  const { reload } = useInfiniteScroll();
  const searchText = useSelector((state) => state.search.text);
  const [inputValue, setInputValue] = useState(searchText);
  const [debouncedValue] = useDebounce(inputValue, 500);

  // Sync local state với Redux state khi Redux state thay đổi từ bên ngoài
  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  // Dispatch vào Redux khi debounced value thay đổi
  useEffect(() => {
    if (debouncedValue !== searchText) {
      dispatch(setText(debouncedValue));
    }
  }, [debouncedValue, searchText, dispatch]);

  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader className='max-md:hidden'>
        <button onClick={reload} type='button' className='cursor-pointer font-bold'>
          Tìm kiếm
        </button>
      </ColumnHeader>

      {/* ColumnContent */}
      <ColumnContent
        dropdownElement={
          <MoreDropdown>
            <PinColumn />
          </MoreDropdown>
        }
      >
        <div className='flex h-full flex-1 flex-col'>
          <SearchInput
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          {children}
        </div>
      </ColumnContent>
    </ColumnLayout>
  );
});

export default SearchLayout;
