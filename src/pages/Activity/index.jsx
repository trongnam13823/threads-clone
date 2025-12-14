import { PostCard } from "@/components/Post/PostCard";
import { activitys } from "@/mocksAPI";

export const ActivityPage = () => {
  return (
    <div className="flex-1 py-2">
      {activitys.map((post) => (
        <div key={post.id}>
          <PostCard key={post.id} {...post} />
          <div className="ml-auto h-px w-[calc(100%-24px-36px-16px)] bg-(--lines-primary)" />
        </div>
      ))}
    </div>
  );
};
