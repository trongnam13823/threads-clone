import Back from "@/contexts/PageStack/components/Back";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";

const BackButton = () => {
  return (
    <Back>
      <div className="group absolute top-1/2 left-3 z-20 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center max-md:hidden">
        <Button
          className="size-6 shadow-[0_2px_8px_0_var(--box-shadow-08)] group-hover:scale-105 group-active:scale-95"
          variant="outline"
          size="icon"
        >
          <ChevronLeftIcon className="mr-0.5 size-4" />
        </Button>
      </div>
    </Back>
  );
};

export default BackButton;
