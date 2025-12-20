import { Outlet } from "react-router";
import ColumnLayout from "../components/Column/ColumnLayout";
import Back from "@/contexts/history/components/Back";

const ActivityLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <header>
        <Back>Quay lại</Back> ActivityLayout header
      </header>
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};
export default ActivityLayout;
