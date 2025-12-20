import { Outlet } from "react-router";
import ColumnLayout from "../components/Column/ColumnLayout";

const ProfileLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <header>ProfileLayout header</header>
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};
export default ProfileLayout;
