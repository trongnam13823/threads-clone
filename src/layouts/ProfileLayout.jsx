import ColumnLayout from "./ColumnLayout";

const ProfileLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <ColumnLayout.Header>Profile Layout</ColumnLayout.Header>
      <ColumnLayout.Content>{children}</ColumnLayout.Content>
    </ColumnLayout>
  );
};
export default ProfileLayout;
