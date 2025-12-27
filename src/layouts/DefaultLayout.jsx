import ColumnBorder from '@/components/Column/ColumnBorder';
import NavDesktop from '@/components/NavBar/NavDesktop';
import NavMobile from '@/components/NavBar/NavMobile';
import CreatePostFAB from '@/components/Post/CreatePostFAB';
import paths from '@/configs/paths';
import PageStackProvider from '@/contexts/pageStack/components/PageStackProvider';
import { useLocation } from 'react-router';

const DefaultLayout = () => {
  const { pathname } = useLocation();

  return (
    <PageStackProvider
      path={pathname}
      neverUnmount={[paths.home, paths.following, paths.ghostPosts]}
    >
      <NavDesktop />
      <NavMobile />
      <CreatePostFAB />
      <ColumnBorder />
    </PageStackProvider>
  );
};

export default DefaultLayout;
