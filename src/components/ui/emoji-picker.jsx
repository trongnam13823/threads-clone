import { EmojiPicker as FrimousseEmojiPicker } from 'frimousse';

export function EmojiPicker({ onEmojiSelect }) {
  return (
    <FrimousseEmojiPicker.Root
      onEmojiSelect={onEmojiSelect}
      columns={6}
      sticky={false}
      className='rounded-2xl border border-(--primary-column-outline) bg-(--background-primary) p-(--scroll-size) pr-0'
    >
      <FrimousseEmojiPicker.Viewport className='max-h-[220px]'>
        <FrimousseEmojiPicker.List
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div className='bg-(--background-primary) text-(--text-secondary)' {...props}>
                {category.label}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className='flex size-[42px] items-center justify-center rounded-md text-[1.875rem] transition-colors hover:bg-(--hovered-background)'
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </FrimousseEmojiPicker.Viewport>
    </FrimousseEmojiPicker.Root>
  );
}
