"use client";
import { Companion, Message } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import { ChatFeedProps } from "./ChatFeed";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatFeedProps[]>(companion.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatFeedProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");
        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatFeedProps = {
      role: "user",
      content: input,
    };
    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };
  return (
    <>
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        messages={messages}
        isLoading={isLoading}
      />
      <ChatForm
        companion={companion}
        isLoading={isLoading}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
        input={input}
      />
    </>
  );
};

export default ChatClient;
