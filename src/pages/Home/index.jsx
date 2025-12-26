import ColumnContent from "@/components/Column/ColumnContent";
import { CreatePostBox } from "@/components/Post/CreatePostBox";
import { PostCard } from "@/components/Post/PostCard";

export default function HomePage() {
  return (
    <ColumnContent className="flex-1 *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none">
      <CreatePostBox className="pt-6 max-md:hidden" />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </ColumnContent>
  );
}
