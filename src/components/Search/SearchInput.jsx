import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SearchInput({ value, onChange, onClick }) {
  return (
    <div className='px-6 pt-6' onClick={onClick}>
      <div className='flex h-11 items-center gap-2 rounded-2xl border border-(--lines-primary) bg-(--background-secondary) px-4'>
        <label htmlFor='search-input'>
          <SearchIcon className='text-(--navigation-icon)' size={20} />
        </label>
        <input
          id='search-input'
          type='text'
          value={value}
          autoFocus={true}
          onChange={onChange}
          autoComplete='off'
          className='flex-1 text-(--text-primary) outline-none placeholder:text-(--text-secondary)'
          placeholder='Tìm kiếm'
        />
        <Button variant='ghost' size='icon' className='p-2'>
          <SlidersHorizontalIcon className='size-5 text-(--navigation-icon)' />
        </Button>
      </div>
    </div>
  );
}
