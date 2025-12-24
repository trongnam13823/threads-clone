import { Outlet } from "react-router";
import ColumnLayout from "./ColumnLayout";

const ActivityLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <ColumnLayout.Header>Activity Layout</ColumnLayout.Header>
      <ColumnLayout.Content>{children ? children : <Outlet />}</ColumnLayout.Content>
    </ColumnLayout>
  );
};
export default ActivityLayout;
