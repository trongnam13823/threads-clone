import paths from '@/configs/paths';
import ColumnHeader from '@/components/Column/ColumnHeader';
import ColumnLayout from '@/components/Column/ColumnLayout';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import MaybePageStack from '@/contexts/pageStack/components/MaybePageStack';

const ProfileLayout = ({
  children,
  className,
  fromRouteRenderer,
  routeRendererPath,
  autoUpdateUrl,
}) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <MaybePageStack
      enabled={!fromRouteRenderer}
      url={routeRendererPath ?? paths.profile(userInfo.username)}
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
