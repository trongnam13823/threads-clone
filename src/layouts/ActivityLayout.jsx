import { Outlet } from "react-router";
import ColumnLayout from "../components/Column/ColumnLayout";
import Back from "@/contexts/history/components/Back";

const ActivityLayout = ({ children, sortableData, ...props }) => {
  return (
    <ColumnLayout sortableData={sortableData} {...props}>
      <div>
        <Back>Quay lại</Back> ActivityLayout header
      </div>
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};
export default ActivityLayout;
