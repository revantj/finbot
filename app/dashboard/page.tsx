import CompanionFeed from "@/components/CompanionFeed";
import { prisma } from "@/prisma/client";
import React from "react";

interface DashboardProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const DashboardPage = async ({ searchParams }: DashboardProps) => {
  const data = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return (
    <>
      <CompanionFeed data={data} />
    </>
  );
};

export default DashboardPage;
