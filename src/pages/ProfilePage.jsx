import { CreatePostBox } from "@/components/CreatePostBox";

export const ProfilePage = () => {
  return (
    <>
      <CreatePostBox className="border-b border-(--primary-outline)" />
      <div className="flex flex-1 items-center justify-center">
        <p className="text-(--secondary-text)">No threads yet.</p>
      </div>
    </>
  );
};
