import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

const Toaster = ({ ...props }) => {
  const { theme = 'light' } = useTheme();

  return (
    <Sonner
      theme={theme}
      className='toaster group text'
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />,
      }}
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
        '--border-radius': 'var(--radius)',
      }}
      position='bottom-center'
      toastOptions={{
        style: {
          background: 'var(--primary-button-background)',
          color: 'var(--primary-button-text)',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '500',
          width: 'fit-content',
          justifySelf: 'center',
          border: 'none',
        },
        classNames: {
          icon: 'hidden!',
          title: 'font-bold!',
        },
      }}
      visibleToasts={1}
      {...props}
    />
  );
};

export { Toaster };
