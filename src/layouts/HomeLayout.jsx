import paths from "@/configs/paths";
import createColumnLayout from "@/components/Column/helper/createColumnLayout";
import ColumnLayout from "@/components/Column/ColumnLayout";

const HomeLayout = createColumnLayout(<ColumnLayout.Header>Home Layout</ColumnLayout.Header>, paths.home);

export default HomeLayout;
