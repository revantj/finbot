/* eslint-disable tailwindcss/classnames-order */
"use client";

import React from "react";
import { Companion } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import EmptyAnimation from "./EmptyAnimation";

interface CompanionFeedProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

const CompanionFeed = ({ data }: CompanionFeedProps) => {
  return (
    <div className="z-20 mt-32 container">
      <div className="flex gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 ">
          {data.map((item) => (
            <div key={item.id}>
              <Link href={`/chat/${item.id}`}>
                <div className="space-y-2">
                  <div className="size-full">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={1280}
                      height={1480}
                      className="w-full h-80 rounded-xl object-cover object-center"
                    />
                  </div>
                  <h1 className="text-lg font-medium antialiased pt-4">
                    {item.name}
                  </h1>
                  <p className="text-sm font-normal text-muted-foreground antialiased line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium lowercase antialiased">
                      @{item.userName}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <MessageSquare className="size-4" />
                      <span>{item._count.messages}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {data.length === 0 && (
        <div className="h-[620px] bg-gray-50 flex  flex-col items-center justify-center border border-dashed rounded-xl">
          <EmptyAnimation />
          <p className="text-sm font-medium antialiased">
            Sorry no investment advisor found...
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanionFeed;
