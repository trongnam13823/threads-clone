import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <>
      <Outlet /> {/* Nơi các route sẽ render */}
      <Toaster /> {/* Bây giờ Toaster nằm trong context router */}
    </>
  );
};

export default RootLayout;
