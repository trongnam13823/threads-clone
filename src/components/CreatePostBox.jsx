import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import paths from "@/configs/paths";
import { cn } from "@/lib/utils";
import { userInfo } from "@/mocksAPI";
import { Link } from "react-router";

export const CreatePostBox = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2 px-6 py-4", className)}>
      {/* AVATAR */}
      <Link to={paths.profile(userInfo.username)}>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage src={userInfo.avatar} alt={userInfo.fullname} />
          <AvatarFallback>{userInfo.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>

      {/* QUESTION */}
      <p className={cn("flex-1 cursor-text pl-1 text-left", "text-(--secondary-text)")}>What's new?</p>

      {/* POST BTN */}
      <Button variant="outline">Post</Button>
    </div>
  );
};
