import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const CreatePostButton = () => {
  return (
    <>
      <Button
        variant="outline"
        className={cn("fixed right-6 bottom-6 z-20 h-[68px] w-[82px] rounded-2xl", "hover:scale-105 max-md:hidden")}
      >
        <PlusIcon className="size-6 stroke-3" />
      </Button>
    </>
  );
};
