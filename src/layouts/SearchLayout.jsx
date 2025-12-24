import ColumnLayout from "./ColumnLayout";

const SearchLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <ColumnLayout.Header>Search Layout</ColumnLayout.Header>
      <ColumnLayout.Content>{children}</ColumnLayout.Content>
    </ColumnLayout>
  );
};
export default SearchLayout;
