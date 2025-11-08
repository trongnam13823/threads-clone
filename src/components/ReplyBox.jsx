import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Maximize2Icon, MoveUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { userInfo } from "@/mocksAPI";

export function ReplyBox({ author }) {
  const [hasContent, setHasContent] = useState(false);
  const editableRef = useRef(null);

  const handleInput = (e) => {
    const el = e.currentTarget;
    const text = el.textContent.trim();

    if (el.innerHTML === "<br>" || text === "") {
      el.innerHTML = "";
      setHasContent(false);
    } else {
      setHasContent(true);
    }
  };

  useEffect(() => {
    editableRef.current.focus();
  }, []);

  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <Avatar className="size-9">
        <AvatarImage src={userInfo.avatar} alt={userInfo.username} />
        <AvatarFallback>{userInfo.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* Editable + Username */}
      <div className="flex flex-1 flex-col">
        <span className="font-bold">{userInfo.username}</span>

        <div
          ref={editableRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={`Reply to ${author.username}...`}
          className={cn(
            "resize-none focus:outline-none",
            "text-(--primary-text)",
            "[&:empty::before]:pointer-events-none",
            "[&:empty::before]:text-(--secondary-text)",
            "[&:empty::before]:content-[attr(data-placeholder)]"
          )}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-start gap-2.5">
        <Button variant="secondary" size="icon-md" className="hover:scale-105">
          <Maximize2Icon className="size-4" />
        </Button>

        {hasContent && (
          <Button size="icon-md" className="hover:scale-105">
            <MoveUpIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
