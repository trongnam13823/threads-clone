import paths from "@/configs/paths";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProfilePage = () => {
  const userInfo = useSelector((s) => s.auth.userInfo);

  return (
    <>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200">
        consectetur adipisicing elit. Inventore modi quod totam ipsam, error suscipit illo unde accusamus aperiam vel
        iure ex minima repudiandae amet rerum! Incidunt voluptatibus reiciendis maiores.
      </div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200">
        Lorem ipsum dolor sit amet
        <Link to={paths.profileReplies(userInfo.username)} className="text-pink-400">
          To Profile Replies
        </Link>
        onsectetur adipisicing elit. Recusandae amet tenetur iusto, ipsam sed omnis blanditiis consectetur perspiciatis,
        est deleniti veniam. Error saepe quasi modi natus facere libero eligendi at.
      </div>
      <div className="h-80 w-full shrink-0 bg-gray-200"></div>
      <div className="h-80 w-full shrink-0 bg-gray-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi quod totam ipsam, error suscipit illo
        unde accusamus aperiam vel iure ex minima repudiandae amet rerum! Incidunt voluptatibus reiciendis maiores.
      </div>
    </>
  );
};

export default ProfilePage;
