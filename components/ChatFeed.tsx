"use client";
import React from "react";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { BotAvatar } from "./BotAvatar";
import { BeatLoader } from "react-spinners";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export interface ChatFeedProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const ChatFeed = ({ role, content, isLoading, src }: ChatFeedProps) => {
  const { toast } = useToast();

  const onCopy = () => {
    if (!content) {
      return null;
    }
    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard.",
    });
  };
  return (
    <div
      className={cn(
        "flex group items-start w-full gap-x-5",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="w-auto rounded-md bg-accent p-4 text-sm font-normal antialiased">
        {isLoading ? <BeatLoader size={6} color="black" /> : content}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onCopy}
          className="opacity-0 transition group-hover:opacity-100"
        >
          <Copy className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatFeed;
