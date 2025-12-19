import { Outlet } from "react-router";
import ColumnLayout from "../components/Column/ColumnLayout";

const ProfileLayout = ({ children, sortableData, ...props }) => {
  return (
    <ColumnLayout sortableData={sortableData} {...props}>
      <div>ProfileLayout header</div>
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};
export default ProfileLayout;
