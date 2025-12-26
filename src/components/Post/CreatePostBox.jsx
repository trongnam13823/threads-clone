import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import paths from "@/configs/paths";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useSelector } from "react-redux";

export const CreatePostBox = ({ className }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn("flex items-center gap-2 px-6 py-4", className)}>
          {/* AVATAR */}
          <Link to={paths.profile(userInfo.username)}>
            <Avatar className="size-9 cursor-pointer">
              <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
              <AvatarFallback>{userInfo.username}</AvatarFallback>
            </Avatar>
          </Link>

          {/* QUESTION */}
          <p className={cn("flex-1 cursor-text pl-1 text-left", "text-(--text-secondary)")}>What's new?</p>

          {/* POST BTN */}
          <Button variant="outline">Post</Button>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
      </DialogContent>
    </Dialog>
  );
};
