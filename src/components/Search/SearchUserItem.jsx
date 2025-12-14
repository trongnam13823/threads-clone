import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function SearchUserItem({ username, avatar, fullname, bio, followers }) {
  return (
    <div className="flex gap-3 pt-4 pl-6">
      {/* AVATAR */}
      <Avatar className="size-9 shrink-0 cursor-pointer">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>{fullname.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      {/* INFO */}
      <div className="flex flex-1 flex-col border-b border-(--lines-primary) pr-6 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">{username}</h3>
            <p className="text-(--secondary-text)">{fullname}</p>
          </div>

          <Button className="h-[34px] min-w-[104px] font-bold">Theo dõi</Button>
        </div>

        <p className="mt-1 mb-4">{bio}</p>

        <p className="text-(--secondary-text)">{followers.toLocaleString("en-US")} người theo dõi</p>
      </div>
    </div>
  );
}
