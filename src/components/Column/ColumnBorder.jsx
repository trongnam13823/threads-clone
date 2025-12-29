import paths from '@/configs/paths';
import usePageStack from '@/contexts/pageStack/hooks/usePageStack';
import { useSelector } from 'react-redux';

const ColumnBorder = () => {
  const columns = useSelector((s) => s.auth.columns);
  const { history } = usePageStack();
  const isHomePage = history.at(-1) === paths.home;
  const hasColumns = columns.length > 1;

  return isHomePage && hasColumns ? null : (
    <div className='pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center pt-(--header-h) pr-(--scroll-size) max-md:hidden'>
      <div className='relative w-(--column-max-w) flex-1 max-lg:ml-(--nav-desktop-w) max-md:ml-0'>
        <div className='absolute inset-0 rounded-t-3xl outline-12 outline-(--background-secondary)' />
        <div className='absolute inset-0 rounded-t-3xl border border-(--primary-column-outline) shadow-[0_0_12px_0_var(--box-shadow-04)]' />
      </div>
    </div>
  );
};

export default ColumnBorder;
