import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisIcon, HeartIcon, MessageCircleIcon, Repeat2Icon, SendIcon } from "lucide-react";
import { ReplyBox } from "@/components/ReplyBox";
import { Link, useNavigate } from "react-router";
import paths from "@/configs/paths";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { timeAgo } from "@/lib/timeAgo";

export const PostCard = ({ id, author, createdAt, content, stats }) => {
  const navigate = useNavigate();

  const [showReply, setShowReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(stats.likes);

  const handleLike = () => {
    setLikes((prev) => prev + (liked ? -1 : 1));
    setLiked((prev) => !prev);
  };

  const handleToggleReply = () => {
    setShowReply(!showReply);
  };

  const handlePostClick = (userId, postId) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      navigate(paths.postDetail(userId, postId));
    }
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-3">
      {/* POST CONTENT*/}
      <div className="flex gap-4">
        {/* LEFT */}
        <div className="flex w-9 flex-col items-center gap-4">
          {/* AUTHOR AVATAR */}
          <Avatar className="size-9 cursor-pointer">
            <AvatarImage src={author.avatar} alt={author.username} />
            <AvatarFallback>{author.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          {/* LINE REPLY */}
          <div className={cn("w-0.5 flex-1", "bg-(--primary-outline)", showReply ? "block" : "hidden")}></div>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          {/* HEADER */}
          <div className="flex items-center">
            {/* AUTHOR NAME */}
            <Link to={paths.profile(author.username)} className={cn("font-bold", "hover:underline")}>
              <span>{author.username}</span>
            </Link>
            {/* CREATED AT */}
            <span className="ml-1.5 text-(--secondary-text)">{timeAgo(createdAt)}</span>
            {/* MORE BTN */}
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn("ml-auto", "text-(--secondary-text)", "hover:scale-105")}
            >
              <EllipsisIcon className="size-4.5" />
            </Button>
          </div>

          {/* BODY (content html)*/}
          <div
            onClick={() => handlePostClick(author.id, id)}
            className={cn("mt-1 cursor-pointer", "text-(--primary-text)", "[&>*:not(:first-child)]:mt-2.5")}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* ACTION BTNS */}
          <div className="mt-1.5 -mb-1 -ml-3 flex items-center">
            {/* LIKE BTN */}
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 gap-1 px-3 text-[13px]", liked && "text-(--liked-text)")}
              onClick={handleLike}
            >
              <HeartIcon className={cn("size-4.5", liked && "fill-current")} />
              {likes}
            </Button>

            {/* REPLY BTN */}
            <Button variant="ghost" size="icon" className="h-9 gap-1 px-3 text-[13px]" onClick={handleToggleReply}>
              <MessageCircleIcon className="size-4.5" /> {stats.comments}
            </Button>

            {/* REPOST BTN */}
            <Button variant="ghost" size="icon" className="h-9 gap-1 px-3 text-[13px]">
              <Repeat2Icon size={24} strokeWidth={1.5} className="size-6 stroke-[1.5]" /> {stats.reposts}
            </Button>

            {/* SHARE BTN */}
            <Button variant="ghost" size="icon" className="h-9 gap-1 px-3 text-[13px]">
              <SendIcon className="size-4.5" /> {stats.shares}
            </Button>
          </div>
        </div>
      </div>

      {/* REPLY Box */}
      {showReply && <ReplyBox author={author} />}
    </div>
  );
};
