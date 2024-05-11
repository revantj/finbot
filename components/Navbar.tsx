/* eslint-disable tailwindcss/classnames-order */
"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="h-20 backdrop-blur-md  flex  z-30 fixed top-0 left-0 w-full border-b">
      <div className="container flex items-center justify-between ">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Icons.logo className="size-8" />
          <h1 className="text-xl font-semibold antialiased">Finbot</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/companion/create"
            className={buttonVariants({ variant: "outline" })}
          >
            <Icons.create className="size-4 mr-2" />
            <span className="text-sm font-medium">Create</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
