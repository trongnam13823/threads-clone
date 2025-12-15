import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CreatePostPanel } from "./CreatePostPanel";
import { useState } from "react";

export const CreatePostFAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover className="top-20" open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("fixed right-6 bottom-6 z-20 h-[68px] w-[82px] rounded-2xl", "hover:scale-105 max-md:hidden")}
        >
          <PlusIcon className="size-6 stroke-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={0}
        className="translate-y-20"
        onInteractOutside={(event) => {
          event.preventDefault();
        }}
      >
        <CreatePostPanel
          className="max-w-[496px]"
          classMainContent="md:max-h-[calc(80vh-56px-80px-48px)]"
          CloseElement={
            <Button variant="none" size="icon-sm" onClick={() => setOpen(false)}>
              <XIcon className="size-6" />
            </Button>
          }
        />
      </PopoverContent>
    </Popover>
  );
};
