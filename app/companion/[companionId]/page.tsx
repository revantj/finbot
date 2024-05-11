import CompanionForm from "@/components/CompanionForm";
import { prisma } from "@/prisma/client";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

const CompanionPage = async ({
  params,
}: {
  params: { companionId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    />
  );
};

export default CompanionPage;
