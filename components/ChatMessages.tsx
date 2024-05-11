/* eslint-disable no-unneeded-ternary */
"use client";

import { Companion } from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatFeed, { ChatFeedProps } from "./ChatFeed";

interface ChatMessagesProps {
  companion: Companion;
  messages: ChatFeedProps[];
  isLoading: boolean;
}

const ChatMessages = ({
  companion,
  isLoading,
  messages = [],
}: ChatMessagesProps) => {
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div
      className="h-screen space-y-8 overflow-y-auto  pb-36 pt-28 md:mx-auto md:w-1/2 [&::-webkit-scrollbar-thumb]:bg-transparent
    dark:[&::-webkit-scrollbar-thumb]:bg-transparent
    [&::-webkit-scrollbar-track]:bg-transparent
    dark:[&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar]:w-2"
    >
      <ChatFeed
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />

      {messages.map((message) => (
        <ChatFeed
          role={message.role}
          key={message.content}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatFeed role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
