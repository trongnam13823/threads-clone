import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

const CreatePostFAB = () => {
  return (
    <Button
      variant="outline"
      className={
        "absolute right-6 bottom-6 h-17 w-20.5 rounded-2xl hover:scale-105 max-md:hidden shadow-[0_6px_8px_0_var(--box-shadow-08)] z-40"
      }
    >
      <PlusIcon className="size-6 stroke-3" />
    </Button>
  );
};

export default CreatePostFAB;
