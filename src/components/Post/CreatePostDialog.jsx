import {
  EllipsisIcon,
  FilmIcon,
  ImageIcon,
  MapPinIcon,
  SmileIcon,
  SquareChartGanttIcon,
  SquareMenuIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { userInfo } from "@/mocksAPI";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Editor from "../Editor";
import { useState } from "react";
import NestedMenu from "../../../NestedMenu";

export const CreatePostDialog = () => {
  const [text, setText] = useState("");

  return (
    <DialogContent
      showCloseButton={false}
      className="min-w-[620px] rounded-2xl border border-(--lines-primary) bg-(--elevated-background) p-0"
    >
      <DialogTitle className="hidden" />
      <DialogDescription className="hidden" />

      <header className="relative flex h-14 items-center justify-between border-b border-(--lines-primary) px-6">
        <Button variant="ghost" className="p-0 text-lg hover:bg-transparent">
          Hủy
        </Button>
        <span className="absolute top-1/2 left-1/2 -translate-1/2 text-base font-bold">Thread mới</span>

        <div className="flex items-center gap-2">
          <Button variant="icon" className="size-9 p-0!">
            <SquareChartGanttIcon className="size-6" />
          </Button>
          <Button variant="icon" className="size-9 p-0!">
            <div className="rounded-full border-2 border-(--primary-text) p-px">
              <EllipsisIcon className="size-4" />
            </div>
          </Button>
        </div>
      </header>

      <main className="px-6 pt-4 pb-1.5">
        <div>
          <Avatar className="size-9 cursor-pointer">
            <AvatarImage src={userInfo.avatar} alt={userInfo.fullname} />
            <AvatarFallback>{userInfo.fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <p>{userInfo.username}</p>
          <Editor value={text} onChange={setText} placeholder={`Có gì mới?`} />
          <div>
            <ImageIcon />
            <FilmIcon />
            <SmileIcon />
            <SquareMenuIcon />
            <MapPinIcon />
          </div>
        </div>

        <NestedMenu />
      </main>
    </DialogContent>
  );
};
