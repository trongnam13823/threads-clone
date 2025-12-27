import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';
import MaybePageStack from '@/contexts/pageStack/components/MaybePageStack';

const SearchLayout = ({
  children,
  className,
  fromRouteRenderer,
  routeRendererPath,
  autoUpdateUrl,
}) => {
  return (
    <MaybePageStack
      enabled={!fromRouteRenderer}
      autoUpdateUrl={autoUpdateUrl}
      path={routeRendererPath}
    >
      <ColumnLayout className={className}>
        <ColumnHeader>Search Layout</ColumnHeader>

        {/* ColumnContent */}
        {children ? children : <Outlet />}
      </ColumnLayout>
    </MaybePageStack>
  );
};

export default SearchLayout;
