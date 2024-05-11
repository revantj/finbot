/* eslint-disable tailwindcss/classnames-order */
"use client";

import React from "react";
import { Icons } from "../Icons";
import Link from "next/link";
import { UserButton, useSession } from "@clerk/nextjs";
import ChatbotAnimation from "../ChatbotAnimation";
import { buttonVariants } from "../ui/button";

const Hero = () => {
  const { session } = useSession();
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Icons.logo className="size-8" />
          <h1 className="font-semibold text-xl antialiased">Finbot</h1>
        </Link>
        {!session ? (
          <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-20 md:grid-cols-2">
          <div className="max-w-[720px] lg:max-w-[842px]">
            <h1 className="mb-4 text-4xl font-semibold md:text-6xl">
              Your Personalized Guide to Financial{" "}
              <span className="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce1c70c97aeb755c8a_Rectangle%2010%20(1).svg')] bg-cover bg-center px-4 text-white">
                Success!
              </span>
            </h1>
            <p className="mb-6 max-w-[528px] text-base text-[#636262] md:mb-10 lg:mb-12">
              Our investment advisor chatbot is your digital partner in
              financial growth. With advanced algorithms and real-time market
              analysis, it provides tailored investment strategies to suit your
              goals and risk appetite.
            </p>
            {!session ? (
              <Link
                href="/sign-up"
                className="mb-6 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px] md:mb-10 lg:mb-12"
              >
                Get Started
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="mb-6 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px] md:mb-10 lg:mb-12"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="relative left-4 h-full max-h-[562px] w-[85%] overflow-visible md:left-0 md:w-[95%] lg:w-full">
            <ChatbotAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
