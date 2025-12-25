import ColumnLayout from "@/components/Column/ColumnLayout";
import paths from "@/configs/paths";
import createColumnLayout from "@/components/Column/helper/createColumnLayout";

const ProfileLayout = createColumnLayout(<ColumnLayout.Header>Profile Layout</ColumnLayout.Header>, paths.home);

export default ProfileLayout;
