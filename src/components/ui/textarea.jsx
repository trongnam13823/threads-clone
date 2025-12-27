import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }) {
  return (
    <textarea
      autoFocus
      data-slot='textarea'
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        'min-h-fit resize-none border-0 p-0 shadow-none placeholder:text-(--text-secondary) focus-visible:ring-0',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
