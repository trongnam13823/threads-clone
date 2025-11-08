import { CreatePostBox } from "@/components/CreatePostBox";
import { PostCard } from "@/components/PostCard";
import { allPosts } from "@/mocksAPI";

export const HomePage = () => {
  return (
    <div className="flex-1 *:border-b *:border-(--primary-column-outline) [&>*:last-child]:border-none">
      <CreatePostBox className="pt-6 max-md:hidden" />

      {allPosts.map(({ id, author, createdAt, content, stats }) => (
        <PostCard key={id} author={author} createdAt={createdAt} content={content} stats={stats} />
      ))}
    </div>
  );
};
