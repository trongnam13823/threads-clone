import ColumnContent from '@/components/Column/ColumnContent';
import MoreDropdown from '@/components/Column/MoreDropdown';
import PinColumn from '@/components/Column/PinColumn';
import SearchUserItem from '@/components/Search/SearchUserItem';
import { Button } from '@/components/ui/button';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';

const SearchPage = () => {
  return (
    <ColumnContent
      className=''
      dropdownElement={
        <MoreDropdown>
          <PinColumn />
        </MoreDropdown>
      }
    >
      {/* INPUT */}
      <div className='px-6 pt-6'>
        <div className='flex h-11 items-center gap-2 rounded-2xl border border-(--lines-primary) bg-(--background-secondary) px-4'>
          <label htmlFor='search-input'>
            <SearchIcon className='text-(--navigation-icon)' size={20} />
          </label>
          <input
            id='search-input'
            type='text'
            className='flex-1 text-(--text-primary) outline-none placeholder:text-(--text-secondary)'
            placeholder='Tìm kiếm'
          />
          <Button variant='ghost' size='icon' className='p-2'>
            <SlidersHorizontalIcon className='size-5 text-(--navigation-icon)' />
          </Button>
        </div>
      </div>

      <h2 className='px-6 pt-5 pb-1.5 font-bold text-(--text-secondary)'>Gợi ý theo dõi</h2>

      <div className='flex flex-col'>
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
        <SearchUserItem />
      </div>
    </ColumnContent>
  );
};
export default SearchPage;
