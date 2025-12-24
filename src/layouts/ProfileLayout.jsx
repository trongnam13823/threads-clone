import { Outlet } from "react-router";
import ColumnLayout from "./ColumnLayout";

const ProfileLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <ColumnLayout.Header>Profile Layout</ColumnLayout.Header>
      <ColumnLayout.Content> {children ? children : <Outlet />}</ColumnLayout.Content>
    </ColumnLayout>
  );
};
export default ProfileLayout;
