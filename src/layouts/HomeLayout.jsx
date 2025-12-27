import { useSelector } from 'react-redux';
import HomeColLayout from './HomeColLayout';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import paths from '@/configs/paths';
import HomeColsPage from '@/pages/Home/HomeColsPage';
import { ListPlusIcon } from 'lucide-react';

const HomeLayout = ({ children, className, pageStackName, flag }) => {
  const columns = useSelector((s) => s.auth.columns);
  const { history } = usePageStack();

  const isHomePage = history.at(-1) === paths.home;
  const hasColumns = columns.length > 0;

  if (flag && isHomePage && hasColumns) {
    return <HomeColsPage pageStackName={pageStackName} />;
  }

  return (
    <HomeColLayout className={className} pageStackName={pageStackName}>
      {children}
      {isHomePage && !hasColumns && (
        <button className='group fixed top-1/2 right-[calc(50%-var(--column-max-w)/2-10px)] z-20 flex size-9 translate-x-full -translate-y-1/2 items-center justify-center rounded-full bg-(--floating-button-background) max-lg:right-[calc(50%-var(--column-max-w)/2-var(--nav-desktop-w)/2-10px)] max-md:hidden'>
          <ListPlusIcon className='ml-0.5 size-5 text-(--navigation-icon) group-hover:text-(--icon-primary)' />
        </button>
      )}
    </HomeColLayout>
  );
};

export default HomeLayout;
