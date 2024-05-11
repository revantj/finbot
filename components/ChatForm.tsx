/* eslint-disable tailwindcss/classnames-order */
"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Companion, Message } from "@prisma/client";
import { Icons } from "./Icons";

interface ChatFormProps {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatForm = ({
  handleInputChange,
  input,
  isLoading,
  onSubmit,
  companion,
}: ChatFormProps) => {
  return (
    <div className="bg-gray-200 w-full  fixed">
      <form
        onSubmit={onSubmit}
        className="fixed bottom-0 left-0 w-full rounded-t-lg border border-b-0 bg-white p-6 md:left-1/4 md:w-1/2"
      >
        <div className="relative">
          <Input
            disabled={isLoading}
            value={input}
            onChange={handleInputChange}
            placeholder="Send a message"
            className="px-6 py-8 text-base tracking-wide ring-offset-0  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {!isLoading ? (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3.5"
            >
              <Icons.send className="size-6" />
            </Button>
          ) : (
            <Button
              isLoading={isLoading}
              variant="ghost"
              size="lg"
              className="absolute right-3 top-3.5"
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
