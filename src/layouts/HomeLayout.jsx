import { Outlet } from "react-router";
import ColumnLayout from "../components/Column/ColumnLayout";
import Back from "@/contexts/history/components/Back";

const HomeLayout = ({ children }) => {
  return (
    <ColumnLayout>
      <header className="flex gap-4">
        <Back>back</Back>
        <span>Dành cho bạn</span>
      </header>
      {children ? children : <Outlet />}
    </ColumnLayout>
  );
};
export default HomeLayout;
