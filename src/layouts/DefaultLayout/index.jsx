import ColumnBorder from '@/components/Column/ColumnBorder';
import PinMenu from '@/components/Column/PinMenu';
import NavBar from '@/components/NavBar/NavBar';
import CreatePostFAB from '@/components/post/CreatePostFAB';
import paths from '@/configs/paths';
import PageStackProvider from '@/contexts/pageStack/components/PageStackProvider';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const columns = useSelector((s) => s.auth.columns);

  return (
    <PageStackProvider
      path={pathname}
      neverUnmount={[paths.home, paths.following, paths.ghostPosts]}
    >
      <NavBar />
      <CreatePostFAB />
      <ColumnBorder />
      {columns.length === 1 && <PinMenu />}
    </PageStackProvider>
  );
};

export default DefaultLayout;
