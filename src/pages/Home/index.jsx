import CreateFeedMenuItem from '@/components/column/CreateFeedMenuItem';
import MoreDropdown from '@/components/column/MoreDropdown';
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
