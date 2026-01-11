import CreateFeedMenuItem from '@/components/Column/CreateFeedMenuItem';
import MoreDropdown from '@/components/Column/MoreDropdown';
import ForYou from './ForYou';

export default function HomePage() {
  return (
    <ForYou
      dropdownElement={
        <MoreDropdown>
          <CreateFeedMenuItem />
        </MoreDropdown>
      }
    />
  );
}
