import ColumnContent from '@/components/Column/ColumnContent';
import paths from '@/configs/paths';
import Link from '@/contexts/pageStack/components/Link';
import { useSelector } from 'react-redux';

const SearchPage = () => {
  const userInfo = useSelector((s) => s.auth.userInfo);

  return (
    <ColumnContent>
      <div className='h-80 w-full shrink-0'>
        SearchPage SearchPage SearchPage ipsum dolor sit amet consectetur adipisicing elit.
        Inventore modi quod totam ipsam, error suscipit illo unde accusamus aperiam vel iure ex
        minima repudiandae amet rerum! Incidunt voluptatibus reiciendis maiores.
      </div>
      <div className='h-80 w-full shrink-0'></div>
      <div className='h-80 w-full shrink-0'>
        SearchPage SearchPage SearchPage ipsum dolor sit amet consectetur adipisicing elit.
        Inventore modi quod totam ipsam, error suscipit
        <Link to={paths.profile(userInfo.username)} className='text-pink-400'>
          To Profile
        </Link>
        illo unde accusamus aperiam vel iure ex minima repudiandae amet rerum! Incidunt voluptatibus
        reiciendis maiores.
      </div>
      <div className='h-80 w-full shrink-0'>
        SearchPage SearchPage SearchPage ipsum dolor sit amet consectetur adipisicing elit.
        Inventore modi quod totam ipsam, error suscipit illo unde accusamus aperiam vel iure ex
        minima repudiandae amet rerum! Incidunt voluptatibus reiciendis maiores.
      </div>
    </ColumnContent>
  );
};
export default SearchPage;
