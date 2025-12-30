import { memo } from 'react';
import { HashIcon } from 'lucide-react';

export const SearchTopicItem = memo(({ topic }) => {
  return (
    <div className='flex gap-3 pt-4 pl-6'>
      {/* ICON */}
      <div className='flex size-9 shrink-0 items-center justify-center rounded-full bg-(--background-secondary)'>
        <HashIcon className='size-5 text-(--text-secondary)' />
      </div>

      {/* INFO */}
      <div className='flex flex-1 flex-col border-b border-(--lines-primary) pr-6 pb-3'>
        <div className='flex items-center justify-between'>
          <h3 className='font-bold'>#{topic.name}</h3>
        </div>

        {topic.description && <p className='mt-1 mb-4 line-clamp-2 text-(--text-secondary)'>{topic.description}</p>}

        <p className='text-(--text-secondary)'>
          {topic.posts_count.toLocaleString('en-US')} bài viết
        </p>
      </div>
    </div>
  );
});

SearchTopicItem.displayName = 'SearchTopicItem';

export default SearchTopicItem;

