import SuggestionsList from '@/components/Search/SuggestionsList';
import SearchResultsList from '@/components/Search/SearchResultsList';
import { useSelector } from 'react-redux';

const SearchPage = () => {
  const q = useSelector((state) => state.search.text);
  const isSearching = q.length > 1;

  return <>{isSearching ? <SearchResultsList /> : <SuggestionsList />}</>;
};
export default SearchPage;
