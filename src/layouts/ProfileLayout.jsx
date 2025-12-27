import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';

const ProfileLayout = ({ children, className, pageStackName }) => {
  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader>Profile Layout</ColumnHeader>

      {/* ColumnContent */}
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};

export default ProfileLayout;
