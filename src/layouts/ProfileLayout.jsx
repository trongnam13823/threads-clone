import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';
import MaybePageStack from '@/contexts/pageStack/components/MaybePageStack';

const ProfileLayout = ({
  children,
  className,
  fromRouteRenderer,
  routeRendererPath,
  autoUpdateUrl,
}) => {
  return (
    <MaybePageStack
      enabled={!fromRouteRenderer}
      path={routeRendererPath}
      autoUpdateUrl={autoUpdateUrl}
    >
      <ColumnLayout className={className}>
        <ColumnHeader>Profile Layout</ColumnHeader>

        {/* ColumnContent */}
        {children ? children : <Outlet />}
      </ColumnLayout>
    </MaybePageStack>
  );
};

export default ProfileLayout;
