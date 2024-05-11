"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BotAvatar({ src }: { src: string }) {
  return (
    <Avatar className="size-12">
      <AvatarImage src={src} alt="companion" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
