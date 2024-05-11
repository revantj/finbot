"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

export function UserAvatar() {
  const { user } = useUser();
  return (
    <Avatar className="size-12">
      <AvatarImage src={user?.imageUrl} alt="companion" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
