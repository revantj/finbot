"use client";

import { Companion, Message } from "@prisma/client";
import React, { useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import { BotAvatar } from "./BotAvatar";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async () => {
    setIsPending(true);
    try {
      await axios.delete(`/api/companion/${companion.id}`);

      toast({
        description: "Your companion is deleted.",
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setIsPending(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="fixed inset-y-0 z-50  flex h-20 w-full border-b bg-white backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Button onClick={() => router.back()} variant="ghost" size="icon">
            <Icons.arrow_left className="size-6" />
          </Button>
          <BotAvatar src={companion.src} />
          <div className="flex flex-col">
            <h1 className="text-base font-medium antialiased">
              {companion.name}
            </h1>
            <p className="text-xs font-medium lowercase  text-muted-foreground">
              Created by @{companion.userName}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="size-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div
                onClick={() => router.push(`/companion/${companion.id}`)}
                className="flex items-center space-x-3"
              >
                <Icons.edit className="size-5" />
                <span className="text-sm font-normal">Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {isPending ? (
                <div onClick={onDelete} className="flex items-center space-x-3">
                  <Loader2 className="size-5 animate-spin" />
                  <span className="text-sm font-normal">Delete</span>
                </div>
              ) : (
                <div onClick={onDelete} className="flex items-center space-x-3">
                  <Icons.delete className="size-5" />
                  <span className="text-sm font-normal">Delete</span>
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
