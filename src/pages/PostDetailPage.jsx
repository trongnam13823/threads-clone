import { PostCard } from "@/components/Post/PostCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postDetail } from "@/mocksAPI";
import { EllipsisIcon, ArrowLeft, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

export const PostDetailPage = () => {
  const { post, replies } = postDetail;

  return (
    <div className="flex size-full min-h-svh flex-col">
      {/* BACK BTN */}
      <Link
        className={cn("absolute top-[calc(var(--header-height)/2)] left-4 z-50 -translate-y-1/2 p-3", "md:hidden")}
        to="/"
      >
        <ArrowLeft size={24} />
      </Link>

      <header
        className={cn(
          "flex items-center justify-center",
          "h-(--header-height)",
          "hidden md:sticky md:top-0 md:block md:bg-(--secondary-background)"
        )}
      >
        {/* BACK BTN */}
        <Button
          asChild
          variant="outline"
          size="icon-sm"
          className={cn(
            "absolute top-1/2 left-6 -translate-y-1/2",
            "shadow-[0_2px_8px_0_var(--box-shadow-08)]",
            "hover:scale-105",
            "max-md:hidden"
          )}
        >
          <Link to="/">
            <ArrowLeft size={16} />
          </Link>
        </Button>

        {/* HEADING */}
        <div className="mx-auto flex h-full w-fit cursor-pointer flex-col items-center justify-center p-2 text-center">
          <p className="font-bold">Thread</p>
          <p className="text-xs text-(--secondary-text)">243K lượt xem</p>
        </div>

        {/* MORE BTN */}
        <Button
          variant="outline"
          size="icon-sm"
          className={cn(
            "absolute top-1/2 right-6 -translate-y-1/2",
            "shadow-[0_2px_8px_0_var(--box-shadow-08)]",
            "hover:scale-105",
            "max-md:hidden"
          )}
        >
          <EllipsisIcon className="size-4.5" />
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center p-px pt-3">
        <div className="flex-1 self-start">
          <PostCard {...post} />
          {/* FILLTER */}
          <div className="px-6">
            <div className="flex items-center justify-between border-t border-(--primary-column-outline) py-4">
              <button className="flex items-center justify-center gap-1">
                <span className="font-bold">Hàng đầu</span>
                <ChevronDownIcon size={16} className="text-(--secondary-icon)" />
              </button>

              <button className="flex items-center justify-center gap-1">
                <span className="text-(--secondary-text)">Xem hoạt động</span>
                <ChevronRightIcon size={16} className="text-(--secondary-icon)" />
              </button>
            </div>
          </div>

          {/* REPLIES */}
          <div className="flex-1 *:border-t *:border-(--primary-column-outline)">
            {replies.map((reply) => (
              <PostCard key={reply.id} {...reply} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
