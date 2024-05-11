import ChatClient from "@/components/ChatClient";
import { prisma } from "@/prisma/client";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const ChatPage = async ({ params }: { params: { chatId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/dashboard");
  }
  return <ChatClient companion={companion} />;
};

export default ChatPage;
