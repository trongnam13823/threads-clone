import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';
import MaybePageStack from '@/contexts/pageStack/components/MaybePageStack';

const ActivityLayout = ({
  children,
  className,
  fromRouteRenderer,
  routeRendererPath,
  autoUpdateUrl,
}) => {
  return (
    <MaybePageStack
      enabled={!fromRouteRenderer}
      initPath={routeRendererPath}
      autoUpdateUrl={autoUpdateUrl}
    >
      <ColumnLayout className={className}>
        <ColumnHeader>Activity Layout</ColumnHeader>

        {/* ColumnContent */}
        {children ? children : <Outlet />}
      </ColumnLayout>
    </MaybePageStack>
  );
};

export default ActivityLayout;
