import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';

const ActivityLayout = ({ children, className, pageStackName }) => {
  return (
    <ColumnLayout className={className} pageStackName={pageStackName}>
      <ColumnHeader>Activity Layout</ColumnHeader>

      {/* ColumnContent */}
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};

export default ActivityLayout;
