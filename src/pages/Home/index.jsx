import CreateFeedMenuItem from '@/components/Column/CreateFeedMenuItem';
import MoreDropdown from '@/components/Column/MoreDropdown';
import ForYouPage from './ForYouPage';

export default function HomePage() {
  return (
    <ForYouPage
      dropdownElement={
        <MoreDropdown>
          <CreateFeedMenuItem />
        </MoreDropdown>
      }
    />
  );
}
