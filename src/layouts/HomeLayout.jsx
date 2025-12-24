import { Outlet } from "react-router";
import ColumnLayout from "./ColumnLayout";

const HomeLayout = ({ children, className }) => {
  return (
    <ColumnLayout className={className}>
      <ColumnLayout.Header>Home Layout</ColumnLayout.Header>
      <ColumnLayout.Content> {children ? children : <Outlet />}</ColumnLayout.Content>
    </ColumnLayout>
  );
};

export default HomeLayout;
