import Navbar from "@/components/Navbar";
import React from "react";

export default async function CompanionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
