import { useSelector } from 'react-redux';
import HomeColLayout from './HomeColLayout';
import paths from '@/configs/paths';
import HomeColsPage from '@/pages/Home/HomeColsPage';

const HomeLayout = ({ children, className, pageStackName, flag, path }) => {
  const columns = useSelector((s) => s.auth.columns);

  const isHomePage = path === paths.home;
  const hasColumns = columns.length > 1;

  if (flag && isHomePage && hasColumns) {
    return <HomeColsPage pageStackName={pageStackName} className={className} />;
  }

  return (
    <HomeColLayout className={className} pageStackName={pageStackName}>
      {children}
    </HomeColLayout>
  );
};

export default HomeLayout;
